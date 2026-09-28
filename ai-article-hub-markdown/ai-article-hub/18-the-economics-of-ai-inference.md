---
number: 18
title: The Economics of AI Inference — Costs, Latency and What Actually Drives Them
description: Training gets the headlines and the enormous cheques. Inference is where every business actually lives, and its cost structure determines which applications are viable and who can afford them.
category: Engineering
tags: [inference, cost, latency, serving, economics, infrastructure]
date: 2024-05-13
slug: the-economics-of-ai-inference
---

Training is a one-time capital expenditure measured in hundreds of millions. Inference is the ongoing operating cost, incurred on every request, forever, and it is the number that determines whether a product is viable.

It is also the number almost nobody outside the industry thinks about. This article is an attempt to make it legible.

## What you are buying

When a model generates a response, the cost has two components that behave very differently.

**Prefill** processes your entire input at once — the system prompt, the retrieved documents, the conversation history. It is compute-bound and runs in parallel on the accelerator, so it is fast and scales predictably with input length.

**Decode** generates tokens one at a time, each one requiring the full model to run again. It is memory-bound: the accelerator has to read every weight from memory for every token, and then waits. Time per token is bounded by memory bandwidth, not arithmetic.

This asymmetry has practical consequences that are frequently misunderstood:

- **Output tokens cost roughly an order of magnitude more than input tokens.** A system that writes a long answer is expensive in a way that a system with a huge prompt is not.
- **The cost of a request is not proportional to the task.** A 5,000-token document and a 100-token document cost about the same if the answer is the same length.
- **Adding a large document to every prompt is a decision with a permanent price**, repeated on every single request.

## The pricing logic

Providers price in a simple currency: tokens. In practice the number is a bundle of several components, and it is worth knowing which is which.

**Input tokens** are cheapest. Often a small fraction of the cost of output.

**Cached input** is much cheaper, because a large fraction of a system prompt or a shared document is processed once and reused. This is why prompt design has a cost dimension and why providers publish cached-input pricing prominently.

**Output tokens** dominate. This is the number to model carefully, and the number that determines whether a verbose assistant-style product is viable at scale.

**Reasoning tokens** — models that think before answering — are billed as output tokens and often account for a large share of the bill. If your application does not need them, turn them off. This is the single largest avoidable cost in many deployments.

Model prices have fallen by large factors, but the effect on bills has been muted, because demand for longer outputs and more reasoning has grown faster than per-token prices have dropped. The Jevons paradox is not a hypothetical in this industry.

## Latency is a separate product

Latency and cost are different axes, and products that optimise one often hurt the other. Four numbers matter:

- **Time to first token.** What a user actually perceives as responsiveness. This is set by prefill time and system overhead, and it is the number to optimise for chat.
- **Inter-token latency.** The gap between tokens as the answer streams. Noticeable if it exceeds roughly 100ms; this is the memory-bandwidth-bound decode phase.
- **Total time.** Matters for batch, not for interaction.
- **Tail latency.** The 99th percentile, not the average. This is the number that determines whether your service feels reliable, and it is where the real engineering is.

The techniques for improving all of them are the same ones described in [Making Models Smaller and Faster ](10-making-models-smaller-and-faster.html): smaller models, quantisation, speculative decoding, prefix caching, routing by difficulty, and batching. They trade against each other, which is why architecture decisions are business decisions.

## Batching and the utilisation trade

Serving many requests concurrently is enormously more efficient than serving them one at a time, because an accelerator sitting at low utilisation is wasting hardware. Batching requests fills it.

That creates a genuine tension. Batching improves throughput and cost per request, and it worsens the latency of every individual request, because it must wait for a batch to fill. Some products — high-volume, non-interactive, latency-insensitive work such as classification, extraction, moderation and batch document processing — should be batched aggressively. Interactive products should not.

Getting this wrong is expensive in both directions: a chat system batched too aggressively feels broken, and a batch system run unbatched costs multiples more than it should.

## Routing and cascade

The most effective cost strategy is not a smaller model. It is **using the smallest model that can do each job**.

A **cascade** sends a request to the small model first, checks whether the answer meets a threshold, and escalates to the large model only when it does not. For a large share of real traffic — routine classification, simple extraction, common questions — the small model is sufficient, and the economics improve substantially. The threshold is the engineering problem, and it must be set on calibration, not on optimism.

**Routing by difficulty** generalises this: classify the request, send it to the right tier. It requires knowing which requests are hard, which is a problem in itself, and it fails badly on the requests that are misclassified as easy.

## The batch opportunities nobody owns

Most of the industry's attention is on interactive chat, and it is where the least machine-friendly application is. The genuinely large cost savings are in the workloads nobody optimises for:

- Classification and routing at volume — support tickets, content moderation, document triage, fraud screening.
- Bulk data work — enrichment, extraction, translation, indexing, deduplication over millions of records.
- Nightly batch jobs where latency is irrelevant and the accelerator is otherwise idle.
- Evaluation and simulation at scale.

These have clear unit economics, predictable demand, and enormous leverage, and they are where a competent engineering team gets several times more than they get from making chat slightly better.

## What this means for who gets AI

The cost structure is not neutral with respect to scale. Systems with large, steady, well-defined workloads can be made cheap. Systems with small, irregular, unpredictable workloads cannot, because the fixed costs — engineering, evaluation, integration, review — dominate.

This produces an uncomfortable pattern: the organisations that benefit most are the ones best able to afford it, and the organisations serving the public good are often the ones with the least predictable volume. The three variables that change this are open weights and commodity hardware, described in [The Open Weights Movement ](25-the-open-weights-movement.html); caching and shared infrastructure; and procurement frameworks that let smaller buyers purchase inference at a price based on actual cost rather than on list price.

## The practical model to build before you build

Before choosing a model, write down a spreadsheet with:

1. Expected requests per day, and the growth curve.
2. Input tokens and output tokens per request, from real data, not from the demo.
3. Reasoning tokens on and off.
4. Cache hit rate for your actual prompt pattern.
5. The model tiers you will route between, and the fraction of traffic each handles.
6. A human-review cost per request, which is often larger than every line above and is the one teams forget.
7. The performance metrics you will actually track, which come straight from [Evaluating AI ](09-evaluating-ai.html).

Then measure the real bill for two weeks and compare. Almost every organisation discovers that their model choice is wrong in an obvious direction, and almost none of them discover it from the pricing page.
