---
number: 11
title: Prompt Engineering and Retrieval — Practical Patterns
description: Prompting is not magic and retrieval is not an excuse for a bad prompt. The patterns that actually work in production, the ones that only appear to, and how to combine them.
category: Applied AI
tags: [prompting, retrieval, rag, context, engineering, patterns]
date: 2024-03-25
slug: prompt-engineering-and-retrieval
---

Prompting advice ranges from "ask nicely" to pages of incantations. Most of it is folklore. This article covers the small number of techniques that reliably change behaviour, the failure modes that survive all of them, and how to structure a system so that the prompt is the least interesting part.

## The one thing that matters: context

A language model knows only what is in its context window at the moment of generating, plus whatever was compressed into its weights during training. Everything else is inaccessible. This single fact explains most prompting outcomes.

So the practical hierarchy is not "clever wording first". It is:

1. **Put the right information in the context.** This dominates everything else.
2. **Remove the wrong information.** Irrelevant text actively hurts.
3. **Then shape the behaviour** with instructions, format and examples.

Most disappointing prompting results are retrieval problems wearing a prompting costume. If the model cannot answer a question about your data, check first whether the relevant passage was in the prompt at all.

## Patterns that work

**Specify the output contract.** Say exactly what the output should look like: sections, fields, length, whether to include reasoning, what to do when information is missing. Vague requests produce varied formats, and varied formats are expensive to parse and impossible to evaluate.

```
Return JSON with keys: "answer" (string), "confidence" (one of low/medium/high),
"sources" (array of quoted spans copied verbatim from the provided documents).
If the documents do not contain the answer, set "answer" to null and explain in "confidence".
```

**Give examples.** Two or three well-chosen examples beat a paragraph of description. They are also the only reliable way to convey style, tone and edge-case behaviour, because examples demonstrate the boundary cases that rules miss. The cost is tokens per request, which matters at volume.

**Ask for the evidence.** Instructing a model to quote the span it is relying on — and to return nothing if there is no such span — reduces confident invention more effectively than any amount of asking it to be careful. Grounding the output in retrieved text is the mechanism; politeness is not.

**Let it think when thinking helps.** Asking for reasoning before an answer improves accuracy on multi-step problems, at the cost of latency and tokens. It is worth it for analysis and not worth it for classification or extraction, where it adds variability rather than accuracy.

**Make refusal a first-class option.** Any system answering from documents must be able to say "the documents do not say". Prompting for it explicitly is worth more than any post-hoc filter, because a filter sees the confident answer while the model can see the missing evidence.

**Put the instruction where it will be read.** Instructions buried in the middle of a long document are followed less reliably than the same instruction at the start and repeated at the end. This is well documented and routinely ignored.

**Give it a way out.** A prompt that says "if the request is ambiguous, ask a clarifying question instead of guessing" produces better outcomes on real traffic, where ambiguity is the norm.

## Retrieval-augmented generation

**Retrieval-augmented generation**, usually shortened to RAG, is the standard answer to "the model needs to know things it was not trained on". The pipeline is: embed the question, search a document store for the most relevant passages, put them in the context, generate an answer grounded in them.

It works well, and the reason is worth stating plainly: it moves the answer from the model's weights — where it cannot be checked, updated or deleted — into the prompt, where you can.

The parts that determine whether it works are almost all in the retrieval half:

- **Chunking.** Documents are split into passages. Too small and the answer loses its context; too large and the passage fills the window with noise. This is the single most consequential and most neglected decision in the pipeline.
- **Embedding choice.** Different embedding models behave very differently by domain and by language. This is benchmarkable in an afternoon and routinely guessed at.
- **Hybrid search.** Combining keyword matching with vector search usually beats either alone, because keyword search is good at exact identifiers — error codes, part numbers, names — and vector search is good at paraphrase.
- **Reranking.** Retrieving a hundred candidates and reranking to the best ten with a specialised model consistently improves answer quality, at a cost in latency.
- **Metadata filters.** Restricting retrieval by date, product, region or permission is how you get both accuracy and access control in the same step.
- **Citations in the output.** Insisting that every claim carries a reference to a retrieved passage makes the system's grounding auditable, and exposes retrieval failures directly.

> RAG is not a database. It is a search problem with a generator attached, and the search is where the quality is won or lost.

## What prompting cannot fix

Some limits are architectural, and no amount of phrasing gets past them:

- **Knowledge the system does not have and was not given.** Retrieve it or accept the failure.
- **Arithmetic and exact lookup.** Models approximate these. Use a tool.
- **Long, precise structure.** Exact JSON schemas, exact counts, exact IDs. Constrain with a grammar or a schema rather than hoping.
- **Consistency across runs at high stakes.** A prompt can reduce variance; it cannot eliminate sampling. Use lower temperature, fixed seeds, or deterministic decoding where the stakes justify it.
- **Tasks requiring information the system cannot see.** A model cannot check what it was not given, which is the whole reason retrieval exists.

## Production hygiene

- **Version your prompts.** They are code. Store them, diff them, test them, roll them back. Most teams version everything else and edit prompts directly in a console, which is a slow-motion outage waiting to be noticed.
- **Test them.** A small suite of real cases with expected properties catches most regressions. The suite does not need to be large to be useful.
- **Log inputs, outputs and metadata.** You cannot debug a system you cannot see. Log enough to reconstruct a bad answer.
- **Separate system instruction from user data.** Anything that came from a user should be delimited and treated as data, not as instructions. This is the practical defence against prompt injection.
- **Do not put secrets in the prompt.** Anything in the context can be echoed back. Credentials belong in a tool call, never in instructions.
- **Watch the token bill.** Long contexts cost money and latency on every single request, forever.

## The honest summary

Prompting is a specification problem. You are writing a contract for a capable, fast, literal-minded contractor who has never met your organisation and will not ask for clarification. The strongest prompts specify the output, supply the facts, show two examples, and define what to do when the request cannot be answered.

That is a genuinely useful skill, and it is not the interesting part. The interesting parts are retrieval quality, tool design, evaluation and review — everything around the prompt that determines whether a system is dependable once traffic arrives.
