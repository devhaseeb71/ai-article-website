---
number: 22
title: Hallucination, Deepfakes and Trust
description: Two things erode trust in information: systems that state falsehoods confidently, and media that can no longer be authenticated. The technical realities of both, and what actually works against them.
category: Society
tags: [hallucination, deepfakes, misinformation, trust, provenance, media]
date: 2024-06-10
slug: hallucination-deepfakes-and-trust
---

A surprising number of AI conversations collapse into the same exchange. Someone says a chatbot gave them a false fact, and someone else says it cannot hallucinate. Both are describing the same mechanism, and both are partly right.

## Why models make things up

A language model is trained to produce text that is typical. It is never trained to be true. Truth is an emergent property of predicting typical text accurately, not an objective in the training function.

When the model does not know, the training signal does not tell it to say so. It tells it to produce what usually follows. In domains where the training data is full of confident claims, the typical continuation is a confident claim. So a system produces a fluent, specific, well-formatted, false statement with exactly the same internal state as when it is right.

This is not a bug and no amount of training eliminates it. It is the direct consequence of the objective described in [How Machines Read and Write ](05-how-machines-read-and-write.html).

Three aggravating factors make it worse:

- **Confidence is not calibrated.** A model's stated certainty is close to uncorrelated with its accuracy, so the reader gets no signal.
- **Erroneous information is reinforced.** RAG and fine-tuning with human feedback both make models *more* confident, which increases the rate at which they assert things they cannot support. The same change that makes a system useful makes it more willing to be wrong.
- **The topic sounds like the others.** Answers are generated from surface structure, so whether a model invents a citation depends far more on what the question looks like than on whether the source exists.

**Retrieval helps, and only partly.** Grounding a model in supplied documents reduces invention substantially, because now it is working from material rather than recall. It does not eliminate it: passage selection errors, questions spanning multiple passages, and questions with no answer in the corpus all remain failure modes. And the most dangerous form is the *citation* hallucination — a real-looking reference to a paper, statute or person that does not exist, attached to a summary that sounds like a real one.

## What actually reduces hallucination

- **Retrieval with good chunking and reranking.** The most effective single intervention. [Prompt Engineering and Retrieval ](11-prompt-engineering-and-retrieval.html) covers the mechanics.
- **Requiring verbatim quotes.** Forcing the model to quote the span it relied on makes fabrication mechanically detectable, because the span will not be there.
- **Making "not in the sources" a normal answer**, in the output schema rather than in a plea.
- **Structured outputs with validation.** A response that must parse as a schema with enumerated fields is far easier to check than prose.
- **Using code execution for anything numerical or lookup-based.** Models approximate arithmetic; tools do not. The single most effective fix for a wrong number is to stop asking for a number.
- **Verifying against a second source** in high-stakes contexts — which is not a new idea, and the reason it works is that it is an old one.

None of these make hallucination disappear, and any vendor claiming otherwise is describing a narrower version of the problem than the one you have.

## Deepfakes: a different problem

Deepfakes are not a model problem. They are a **verification** problem, and conflating the two leads to bad policy.

For roughly thirty years, the answer to "can I trust this media?" was *provenance*: a photograph is evidence because it came from a camera, a document is evidence because it came from a notary. That answer held because producing a convincing forgery required expensive equipment, skill and time.

Generative media broke the cost assumption. The production cost of convincing synthetic media has fallen by orders of magnitude. The effect is not primarily a flood of perfect fakes — convincing video of arbitrary people remains technically difficult — but a flood of *plausible* synthetic media, which is more damaging, because the goal is rarely to fool a careful viewer. It is to make a plausible claim inexpensively, so that plausible claims become common and the cost of checking every one exceeds the value of any individual check.

The conclusion is uncomfortable: **in a world where any content can be produced, detection cannot be the primary defence.** Detection is a losing game against general-purpose generators, and the second-generation deepfake is detected by a first-generation detector, which is then itself an AI-generated artefact.

## What works instead

**Provenance and cryptographic origin.** Camera and platform systems that cryptographically sign the origin and edit history of an image. This is the strongest general answer available, because it does not require guessing whether an artefact is fake. It requires the absence of a signature to mean something.

The obvious objection is capture: anyone can generate a perfectly signed fake. The response is that the system is not binary. It establishes a class of content with verifiable origin, and the practical effect is to make the signed class preferred by institutions — insurers, courts, publishers, platforms, courts and registrars.

**Authenticated channels and institutions.** Wherever communication can be end-to-end authenticated, the content problem largely disappears. The strong version of this claim is that the long-run defence against synthetic media is a shift toward *who* you are talking to rather than *what* the content looks like.

**Verification at the point of consequence.** The places where media actually causes harm — a court, a newsroom, an election authority, an insurer — are few in number, and they can afford verification procedures. Concentrate verification where consequences concentrate.

**Plausible deniability is the real weapon.** The most damaging capability is not a perfect fake of a public figure. It is a mediocre fake that is deniable — a synthetic voice of an ordinary person, a plausible document, an anonymous allegation with a synthetic narrator. Organised crime, fraud and harassment all benefit from this, and it is where law enforcement capacity is thinnest.

**Do not let the debate become "does AI make it possible".** It does. The question is which specific applications you are defending against, at what cost, and with which residual risk you can live with. The counterfactual — no synthetic media at all — has not existed since about 2022.

## Trust, more broadly

The deepest effect is not that people believe fakes. It is the **liar's dividend**: once a convincing fabrication is cheap, genuine evidence can be dismissed as synthetic. This is the real mechanism of erosion, and it is a society-wide effect on the epistemology of public argument. It is entirely independent of whether a given video is fake or real.

The countermeasures run through institutions rather than artefacts:

- **Slow, verifiable, procedural trust.** Court evidence, signed records, auditable chains of custody.
- **Media literacy at scale** — understanding provenance, editing and generation, taught as a general skill.
- **Platforms that act on provenance** rather than on reported content, and that move faster on demonstrably inauthentic coordinated behaviour.
- **Regulation with narrow, precise targets**: non-consensual intimate imagery, impersonation for fraud, fabricated evidence in legal proceedings, election interference. These are harms with identifiable victims, and targeted law is both more effective and more constitutionally defensible than general content regulation.
- **Restoring the economic value of provenance.** If a verified origin earns money and an unverifiable one does not, the market does the work.

## What to do as an individual and as an organisation

- **Ask what a claim costs to make.** A document that costs nothing to produce is worth nothing until corroborated.
- **Check the source, not the artefact.** A video from a wire service with a named journalist is a different evidentiary object from the same video on a feed.
- **Be especially sceptical when the content is exactly what you want to believe.** Fabrication and confirmation are correlated, and the correlation is structural.
- **For organisations:** require provenance evidence in anything you act on, keep an evidence standard for external claims, and train people to spot the specific tactics used against your organisation rather than generic "AI awareness".

## The summary

Hallucination is a property of optimising plausibility rather than truth, and it is managed rather than eliminated: retrieval, quotation, tool use, structure and verification. Deepfakes are a property of cheap production, and they are not solved by detection.

Both point at the same conclusion. In a world where producing content is nearly free, the scarce capability is **establishing that something is true**, and that capability is going to be built out of provenance, institutional process and verification at the points where consequences are decided — not out of better content forensics.
