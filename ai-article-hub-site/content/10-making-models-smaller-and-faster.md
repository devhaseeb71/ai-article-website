---
number: 10
title: Making Models Smaller and Faster — Quantisation, Distillation and Pruning
description: A frontier model and a model that runs on a laptop are made of the same ideas, compressed. The three compression techniques that matter, how they work, and the trade-offs each one makes.
category: Applied AI
tags: [efficiency, quantisation, distillation, pruning, inference, edge ai]
date: 2024-03-18
slug: making-models-smaller-and-faster
---

A frontier model runs in a datacentre. A phone cannot. The gap between them is not a mystery or a matter of engineering taste; it is arithmetic, and it is why compression is one of the most valuable skills in the field.

The good news is that models are almost always much larger than they need to be. Three techniques account for most of the useful work.

## Where the money goes

Serving a model costs money in two ways, and they scale differently.

**Compute cost** grows with the number of parameters involved in each token — the number of arithmetic operations, and therefore the electricity, the accelerator time and the latency.

**Memory cost** grows with the total parameter count, because every weight must live somewhere. At long context lengths and high request volumes, memory is often the real constraint: the accelerator's memory bandwidth, not its arithmetic, decides how many requests per second you can serve.

The distinction matters because the three techniques attack it differently, and a technique that halves arithmetic while leaving memory untouched can save less than expected.

## Quantisation: fewer bits per number

Neural networks store every weight as a floating-point number, typically 16 bits. A model with 70 billion parameters needs roughly 140 gigabytes just to hold the weights in memory — four high-end accelerators before you store anything else.

**Quantisation** stores those numbers at lower precision: 8 bits, 4 bits, or occasionally 2. The 4-bit format, which is standard for local deployment, uses about a third of the memory of 16-bit. Because memory is the binding constraint, that translates directly into more concurrent requests, longer contexts, and hardware that was previously out of reach.

The technique works because the distribution of trained weights is smooth and forgiving: most weights cluster near zero, and a small rounding error in each one barely changes the computation. The gain also comes with a real cost. Quantisation introduces error, and error accumulates differently across tasks. A model that handles general chat acceptably at 4 bits may produce noticeably worse code, worse structured output and worse reasoning, because those tasks depend on precise coordination across many weights.

The nuance that matters in practice: **error is not evenly distributed**. Some layers and some dimensions are far more sensitive than others, and a good quantisation scheme spends bits where sensitivity is high. Per-channel scaling, mixed precision across layer types, and formats that keep sensitive values at higher precision are all refinements of that one idea. Naive round-to-nearest is the version that gives quantisation its bad reputation.

> "The model is 4-bit" is not a fact about quality. It is a fact about a trade-off that varies enormously by task.

## Distillation: teach a small model to imitate a big one

**Distillation** trains a small model to reproduce the behaviour of a large one. Instead of being shown raw data, the student is shown the large model's outputs — probabilities across the whole vocabulary, not just the chosen token — and is trained to match them.

The extra information in those probability distributions is the whole trick. A probability of 0.4 versus 0.35 tells the student something about how the teacher understood the question, and that soft signal carries far more information per example than a hard label. It also tells the student when the teacher was uncertain, which is a genuinely useful thing to learn.

Distilled models of a few billion parameters routinely match models an order of magnitude larger on focused tasks — a particular domain, a particular style, a particular output format. The catch is that they inherit the teacher's ceiling. A student cannot reliably exceed its teacher, so for genuinely frontier capability the approach has a limit, and the practical pattern is to distil from the best available model into something that fits your hardware.

There is a second, cheaper form of the same idea: distil a large model's *answers* on your own data, so the student learns your task rather than the general one. This is how most organisation-specific "small model" systems are actually built.

## Pruning: remove what does not matter

**Pruning** deletes weights, whole neurons, attention heads, or entire blocks. A well-trained network typically contains far more structure than it uses, and removing the least useful part often changes accuracy very little.

Structured pruning — removing whole blocks so the remaining model is a genuinely smaller network — matters far more than unstructured pruning for real deployments, because hardware runs dense blocks quickly and sparse structures slowly. A model that is 20% smaller but must be evaluated as a sparse matrix is usually *slower*, not faster. This is one of the recurring disappointments in the literature.

Pruning also has a memory cost: a sparse representation needs an index structure, and the index can be larger than the values saved. Modern schemes mitigate this with block-structured sparsity that hardware can exploit, but the basic asymmetry holds.

## What else helps

Three more levers routinely matter as much as the three above:

- **Sparse mixture-of-experts** models hold huge total capacity but activate only a fraction of it per token, which raises quality without a proportional rise in compute. They are the most common way a production model is simultaneously large and affordable.
- **Caching** exploits the fact that prompts share prefixes. Storing the intermediate states for a common prefix — as a system prompt, a large document, or a shared conversation — removes most of the cost of reprocessing it. This is why prompt design has a real cost dimension.
- **Speculative decoding** uses a small draft model to propose several tokens at once, which a larger model then verifies in a single batched pass. For a small model that agrees with the large one most of the time, this delivers a substantial speed-up at essentially unchanged output quality.

## Choosing what to do

- **Cost per token is dominated by arithmetic?** Quantise aggressively, and check quality on structured output.
- **You cannot fit the model in memory at all?** Quantise hard, then distil to a smaller architecture. These are the two techniques that actually move the memory wall.
- **A specific narrow task?** Distil. Nothing else comes close.
- **Latency is the constraint?** Speculative decoding and caching, before anything that reduces quality.
- **You own the training loop?** Structured pruning as a final step, validated carefully, because it is the technique most likely to produce a benchmark win and a production regression.

## The larger point

Efficiency work is what turns capability into a product. A capability that runs only in a datacentre is available to whoever can afford the datacentre. A compressed model that runs on a laptop, a phone or an offline workstation is available to everyone, including the people and institutions the technology was supposed to help.

That is why the field's efficiency research is not merely cost reduction. Combined with open weights, discussed in [The Open Weights Movement ](25-the-open-weights-movement.html), it is the mechanism by which capability spreads rather than concentrates. And that is a governance question as much as an engineering one.
