---
number: 7
title: What Actually Happens During Training
description: A training run has a shape: initialise, predict, measure, adjust, repeat, then do it all again with a bigger batch. A walk through the whole loop, including the parts that are unglamorous and expensive.
category: Machine Learning
tags: [training, optimisation, gradient descent, backpropagation, pretraining]
date: 2024-02-26
slug: what-happens-during-training
---

The popular image of AI training is a machine absorbing the internet. The real image is less romantic and more interesting: a very large, very ordinary optimisation loop, run for weeks, on hardware that costs a small country's annual budget, while engineers worry about the loss curve.

Here is what a large training run actually consists of.

## Before the first step: data curation

A modern project begins months before any compute is used, and most of the quality problems are created here.

The internet is too large, too noisy and too legally tangled to train on directly. In practice the pipeline is: fetch web text at scale, filter it, deduplicate it, and score it. Deduplication matters more than teams expect — repeated text is effectively up-weighting, and models trained on heavily duplicated data show measurable degradation. Quality filtering usually involves both automated classifiers and human-labelled examples to train those classifiers.

Then there are the filters that are not about quality at all. Personal information is removed, in quantity large enough to matter. Copyrighted and licensed material is handled according to the project's legal position, and there is real disagreement about how well that works in practice. Content that is deliberately poisoned — material inserted to change a model's behaviour — is partly detectable and mostly an arms race.

**The mixing stage** decides the proportions: how much code, how much academic text, how much conversational data, how many languages, and at what level of quality for each. This is a strategic decision with lasting consequences. A model trained heavily on code reasons differently about structured problems. A model trained heavily on one language will be markedly better in it and notably worse in the rest. Adjusting the mixture after the fact is not really possible; it means another run.

## The loop

Now the optimisation. The model is initialised with random weights. Then, for each batch of text, four things happen:

1. **Forward pass.** The batch is pushed through the network. Every layer computes its activations, and the final layer produces a probability distribution over the next token for every position.
2. **Loss.** The loss measures how wrong that distribution was, using cross-entropy against the actual next tokens. Low is good.
3. **Backward pass.** Backpropagation computes, for every parameter in the network, how much it contributed to the loss. See [Neural Networks from Scratch ](03-neural-networks-from-scratch.html).
4. **Update.** An optimiser — almost always some variant of gradient descent with adaptive step sizes — nudges every parameter against the gradient. Typically by a small fraction of a percent of the parameter's own magnitude.

A large model has hundreds of billions of parameters, so one update touches an incomprehensible number of numbers. The learning rate is chosen so that thousands of updates in the same direction are still stable, which is why these numbers are so absurdly small.

## The awkward middle of training

The most important phase is neither the beginning nor the end. For the first portion of a run, the model is learning form: basic statistics, vocabulary, spelling, the shape of the language. Loss falls quickly and steadily.

The long middle phase is where capability emerges, and it is the least well understood. The loss curve is smooth; the behaviours are not. A model will, at some point during training, start solving problems that it could not solve a thousand steps earlier and will not solve reliably a hundred thousand steps later. Measuring a capability at the wrong point in training gives you a number that is simply wrong, and this is a recurring source of irreproducible results in the literature.

Near the end, the model begins to sharpen: it becomes more confident, more stylistically consistent, and more prone to repeating patterns present in its data. Post-training work exists to repair the specific things that sharpening tends to break.

## What it costs, and what that buys

The compute for a large run is usually reported in floating-point operations. The bill is the interesting part. Renting a large cluster of accelerators at typical cloud rates puts a frontier run in the tens to low hundreds of millions of dollars, and the energy alone is measured in the tens of gigawatt-hours.

A rough mental model for the trade-off: performance tends to improve smoothly with compute, so the decision of how much to spend is a business decision, not a scientific threshold. There is usually no cliff where doubling compute doubles capability. Spending is justified by a valuation of the resulting capability, which is why the economics have come to dominate the research agenda more than the methods have. [The Economics of AI Inference ](18-the-economics-of-ai-inference.html) covers where that money goes once training is finished.

## The three-stage recipe

A frontier model is almost never trained once. It is trained in phases, each with different data and a different objective:

- **Pretraining.** Billions to trillions of tokens, one objective — predict the next token — and the result is a general-purpose system with broad capability and no particular personality or instruction-following behaviour. This is the expensive stage.
- **Post-training.** Far smaller in compute, but far more consequential for how the model behaves. This is where the model learns to answer questions rather than continue them, and where human preferences are folded in. [Fine-Tuning, RLHF and Alignment ](13-fine-tuning-rlhf-and-alignment.html) covers this in full.
- **Specialisation.** Optional and increasingly common: domain-specific continued training, long-context extension, or adaptation to a single organisation's documents and tone.

The asymmetry is the story worth remembering. Pretraining determines what a model is capable of; post-training determines what it is willing to do. Almost every public argument about modern AI is really an argument about the second stage.

## The practical summary

- Data curation, not compute, is where quality is won and lost.
- The training loop is simple and runs for weeks; the difficulty is in monitoring it and knowing when something has gone subtly wrong.
- Capability appears in the middle of training and is easy to mismeasure.
- The loss curve is smooth; behaviour is not. Anyone quoting a single number from a run is quoting one point on a curve they did not show you.
- Cost is a first-class constraint, and it shapes what gets built far more than elegance does.

A run that is going well still looks exactly like a run that is going badly if you only watch the loss. That is why evaluation is a discipline of its own, and why the next article in this collection exists.
