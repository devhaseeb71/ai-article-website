---
number: 6
title: The Transformer — The Architecture Behind Modern AI
description: Attention is all you need, and almost everything since has followed from it. A guided tour of the transformer, from the intuition behind self-attention to why it scaled and what that scaling bought.
category: Foundations
tags: [transformer, attention, architecture, gpt, deep learning]
date: 2024-02-19
slug: the-transformer-architecture
---

In 2017 a group of Google researchers published a paper with the least glamorous title in modern computing: *Attention Is All You Need*. It proposed replacing the recurrent networks that dominated sequence processing with a simpler mechanism, and within four years the mechanism was in essentially every frontier model in the industry. Text, images, audio, proteins, code: same idea.

Understanding the transformer is worth the effort, because once you have it, the rest of the field stops being a list of unrelated facts.

## The problem the old design had

Before 2017, sequences were processed one element at a time. A recurrent neural network read a word, updated an internal state, read the next word, and so on. It has one hard limitation: the state must carry everything relevant from earlier, and the path from any early word to any late word is long. Long-range dependencies are hard to learn, training cannot be parallelised across the sequence, and a sequence of ten thousand tokens means ten thousand sequential steps.

Transformers threw that away. Instead of maintaining a running state, every element of the sequence looks directly at every other element and decides how much to care. There is no recurrence, so training parallelises across the whole sequence, and the distance between the first and last token is one step.

## Self-attention, carefully

Consider the sentence: "The trophy did not fit in the suitcase because it was too big." Which thing does *it* refer to — the trophy or the suitcase? Getting that right requires comparing two distant words and using what happened in between.

Self-attention is a mechanism for exactly that comparison. For each token, the model computes three vectors:

- a **query** — what am I looking for?
- a **key** — what do I offer?
- a **value** — what do I contribute if you want me?

Then, for every pair of tokens, it takes the dot product of one token's query with another's key, scales it, and turns the result into a weight through a softmax so the weights sum to one. Those weights become the mix used to combine the other tokens' values. The output is a summary of the whole sequence, weighted by relevance.

The famous phrase in the original paper describes the effect precisely: each position can attend to every other position, and the data decides the structure. In that sentence, the token *it* ends up attending heavily to *trophy*, because the learned geometry of the language says that is the likely antecedent. Nobody wrote that rule. It emerged from training.

The multi-head variation runs several attention mechanisms in parallel, each with its own projections, so the model can look for several kinds of relationship at once — one head plausibly tracking syntax, another coreference, another simple adjacency.

## The rest of the block

An attention mechanism on its own would be a strange thing to build. In practice it appears inside a standard block, repeated dozens or hundreds of times:

- **Residual connection.** The block's input is added back to its output, so each layer only has to learn a *correction*. This is what makes very deep stacks trainable at all.
- **Layer normalisation.** Inputs to each block are rescaled to a standard range, which keeps the error from exploding as depth increases.
- **Feed-forward network.** Two linear layers with a non-linearity between them, applied to each position independently. Attention moves information *between* positions; the feed-forward layer thinks about each position *on its own*. Both are needed.
- **Positional information.** Attention is order-blind by construction, so the order of the sequence has to be added. The original work used a fixed sinusoidal encoding; most systems now learn positional vectors or use relative offsets.

Also worth knowing because it shows up in every product: a small **vocabulary projection** at the end maps the final representation to a distribution over tokens, and the training objective is a cross-entropy loss against the actual next token. Everything the model can say is scored; the highest-scoring one is emitted; the context is updated; repeat.

## Why it scaled

The transformer was not a breakthrough because of elegance. It was a breakthrough because of **engineering leverage**.

Recurrent models are sequential, so training time grows with sequence length and cannot be spread across a chip. Transformers are massively parallel, so a training run is a very large matrix computation — precisely the workload that graphics processors and specialised accelerators are built for. The same property makes distributed training across hundreds of accelerators straightforward.

That creates a loop that turned out to be decisive: bigger models train more efficiently, larger datasets become affordable at all, and the result is a better model, which funds the next, larger run. Two decades of progress in chip design, interconnect and distributed systems were all waiting for an architecture that could absorb them. The architecture arrived in 2017.

## What scaling bought, and what it did not

The empirical finding, repeated across many labs and modalities, is unglamorous and robust: with enough data, enough parameters and enough compute, held-out error keeps falling along smooth power-law-ish curves, and the ordering of tasks by "learned" moves in a fairly predictable order. Models acquire the easier and more frequent patterns first, and the harder, rarer capabilities last.

Three cautions about reading that literature:

**Smooth curves invite bad science.** If performance improves predictably with scale, the temptation is to extrapolate the curve. The difficulty is that a smooth improvement in average error can coexist with a specific capability that never appears at all, and the curve will not tell you which is which.

**Smoothing is a choice, not physics.** Averaging over many runs hides variance. Per-task, per-language and per-demographic results are routinely better than the headline, and worse than the headline in the places that matter to a particular user.

**Capability and reliability are different things.** A model that can do a task occasionally is not the same as a system that can be relied upon to do it. Scaling reliably moves the first, and improving the second is a separate engineering and research problem. This gap is the reason for [Evaluating AI ](09-evaluating-ai.html) as a discipline and for the caution in [AI Safety and Alignment ](19-ai-safety-and-alignment.html).

## Where the architecture went next

The original block has been modified in a dozen ways, all following the same logic: reduce the cost of attention, which grows quadratically with sequence length.

- **Sparse and sliding-window attention** restrict which tokens can be seen, cutting cost for long contexts.
- **Multi-query and grouped-query variants** share key and value projections across heads, which shrinks the memory bandwidth that often dominates decoding.
- **Mixture-of-experts** layers route each token to a small number of specialised sub-networks, so total capacity grows without paying for it on every token.
- **Rotary and other positional schemes** improve how position is represented for long contexts.
- **State-space and recurrent hybrids** reintroduce a cheap memory mechanism, effectively a learned compression of the past, to handle very long sequences at a fraction of the cost.

And the same block, with the "sequence" reinterpreted as patches of an image, tokens of audio or residues of a protein, became the backbone for models well outside language. That transfer is the strongest evidence for the architecture's generality: it is not an architecture for text so much as an architecture for sequences of anything that has structure worth attending over.

## What to remember

The transformer is three ideas stacked: attention, so that every element can gather information from every other element; residual connections and normalisation, so that hundreds of those layers can be trained at once; and a next-element prediction objective, so that the whole thing can be trained on raw data without labels.

If you keep only one sentence, keep this: **the transformer converts a sequence problem into a matrix problem, which is why it scales the way it does.**
