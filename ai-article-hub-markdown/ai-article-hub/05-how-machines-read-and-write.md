---
number: 5
title: How Machines Read and Write — Language, Tokens and Meaning
description: A language model does not read words; it reads numbers that stand in for pieces of words. Everything interesting about modern text AI follows from that one design decision.
category: Foundations
tags: [language models, tokens, nlp, embeddings, text]
date: 2024-02-12
slug: how-machines-read-and-write
---

Ask a large language model what the last letter of "elephant" is and it will usually answer "t" without complaint. Ask it to count the letter "r" in "strawberry" and it will frequently get it wrong. Both facts trace back to the same place: a model does not see letters at all.

## Words become numbers

Text reaches a model as a sequence of **tokens**. A token is a chunk of text, usually a word, part of a word, or a common byte sequence. Common words are single tokens; rare words are split into pieces; unusual characters, emoji and code fragments fall back to raw bytes.

This is a deliberate engineering compromise. Reading raw characters wastes capacity on a huge, mostly-ignored vocabulary of common short strings. Reading whole words explodes the vocabulary and leaves the model unable to handle words it has never seen. Sub-word tokenisation sits in the middle: a vocabulary of a few hundred thousand entries covers ordinary text efficiently, and every possible input can still be spelled.

The consequences of tokenisation are not incidental. They explain the model's fluency and its blind spots in the same breath.

**Fluency, because chunks carry meaning.** Common English words are often single tokens, and word endings like "-ing" and "-tion" are common tokens too. This is why models handle grammar better than character-level systems do, and why non-English languages tend to cost more tokens for the same meaning.

**Blind spots, because counting is hard.** Asking a model to count letters within a word asks it to reason about the internal structure of tokens, which is not what they encode. Ask it about tokens and it answers cleanly; ask it about letters and it guesses. This is not a reasoning failure so much as an interface mismatch.

**Uneven languages.** Scripts that tokenise inefficiently cost proportionally more to process. For a language that needs three tokens where English needs one, the same job costs roughly three times as much. This is a documented driver of the price and quality gap between language families, and it is a design decision that can be changed — the same corpus, tokenised with a different scheme, behaves differently on every downstream task.

> Tokens are not words. They are accounting units, and every surprising behaviour usually traces back to the accounting.

## From tokens to meaning

The second transformation turns a sequence of token numbers into something a network can reason about. Each token is mapped to a long vector of numbers called an **embedding** — a point in a high-dimensional space where distance encodes similarity.

The intuition is spatial: a well-trained embedding space places related concepts near each other. "Cat" and "kitten" land close; "cat" and "policy" land far apart. Directions in the space turn out to be meaningful too, so that arithmetic on embeddings corresponds to relationships in the world. These relationships are not designed; they are a side effect of the training objective, and the fact that they are interpretable at all is one of the more interesting results in the field.

Embeddings are not just for input. A text-generation model works with a sequence of embeddings, one per token, each combining information about the token itself with information about the surrounding context. The same token in two places in a sentence gets two different vectors. "Bank" as a financial institution and "bank" as a river edge are not distinguished by the token; they are distinguished by context, and the model computes that distinction.

## The objective

Most of what a text model does follows from a deceptively simple training task: **predict the next token**.

Given a sequence of tokens, the model produces a probability for every token in the vocabulary as the next one. The error between its guess and reality is measured, and the weights are adjusted slightly. Then the window slides forward and it happens again, hundreds of billions of times.

Nothing in that process mentions facts, reasoning, or truth. What emerges is a system that has been optimised to produce text that is typical of the data, which — because the data is a record of human writing — requires an enormous amount of implicit knowledge about the world in order to be typical. A model that continues "the capital of France is" well has internalised a great deal of geography, not because it was taught geography, but because geography is expensive to get wrong in text.

The same objective produces the field's signature failure. Text that is *typical* is not the same as text that is *true*. A confident, fluent, plausible-sounding falsehood is exactly what a system optimising for likelihood will produce when it does not know the answer, because plausible-sounding falsehoods are common in the training data and a hedge would be atypical. [Hallucination, Deepfakes and Trust ](22-hallucination-deepfakes-and-trust.html) examines this in detail.

## What the model has and has not got

Older, smaller approaches made this explicit. Word embeddings were a lookup table, so a model had no way to reason about word order at all. Recurrent networks processed text one token at a time, which made long-range structure difficult and slow to train. Attention mechanisms allowed every token to look at every other token at once.

The result is a model with an unusual profile: broad, shallow capability. It can write a plausible essay on a subject it has never seen, translate between languages, summarise a document, and produce working code, all without any of that being a designed feature. It is simultaneously unreliable in ways that reveal it learned surface pattern rather than checking facts, and it forgets and invents with a fluency that makes its errors hard to spot by eye.

## The four jobs, one engine

Underneath the product categories that dominate the industry, the same engine does four distinct things:

- **Language modelling** predicts the next token. This is the raw capability and the training objective.
- **Classification and ranking** uses the model's internal state to sort or label — sentiment, spam, relevance, duplicate detection. Often cheaper and more accurate than fine-tuning.
- **Representation** uses embeddings to compare, cluster, search or match texts semantically, which is what powers retrieval systems.
- **Generation** produces text by sampling from the next-token distribution repeatedly, with a rule that decides how much randomness to allow.

The last one is where the design choices become product decisions. Temperature controls randomness: near zero, a model takes the most likely token every time, which is repetitive and predictable; higher values produce variety and more errors. So a factual question and a creative prompt are served optimally by different settings of the same machinery, which is why a single "creativity" slider changes a system's accuracy as well as its liveliness.

## The practical upshot

Three habits make working with language models noticeably less frustrating.

1. **Ask for structure, not vibes.** Specifying format, length, audience and constraints produces far better output than describing the tone you want.
2. **Give it something to work from.** Retrieval — putting relevant documents into the input — beats both a bigger memory and a more confident tone. See [Prompt Engineering and Retrieval ](11-prompt-engineering-and-retrieval.html).
3. **Verify anything that matters.** The model is a plausible generator, not an oracle. Anything load-bearing should be checked against a source, a calculation, or a person.

That last point is not scepticism about the technology. It is the correct way to use a system that was optimised to be typical, and is as true of the technology as it is of any other kind of source.
