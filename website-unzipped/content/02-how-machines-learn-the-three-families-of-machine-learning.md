---
number: 2
title: How Machines Learn — The Three Families of Machine Learning
description: Supervised, unsupervised and reinforcement learning are three different ways a machine can improve at a task, with different data needs, different failure modes and different economics. Here is how to tell them apart.
category: Foundations
tags: [supervised learning, unsupervised learning, reinforcement learning, training, basics]
date: 2024-01-22
slug: how-machines-learn-the-three-families-of-machine-learning
---

Ask someone how AI learns and you will usually hear "it studies data". That is true of every system, but it hides the decision that determines almost everything else: what signal tells the system it was wrong?

A machine can only adjust itself by comparing what it did to something it was aiming at. That "something" is where the three great families of machine learning separate. Supervised learning aims at known answers. Unsupervised learning looks for structure with no answers at all. Reinforcement learning aims at accumulated reward, with the answer only revealed by consequences.

## Supervised learning: learning from labelled examples

Supervised learning is the classic recipe. You collect inputs, you collect correct outputs, you train a model to reproduce the outputs, and you check whether it generalises to examples it has never seen.

Spam classification, credit scoring, medical image triage, demand forecasting, price estimation, machine translation from parallel corpora — all supervised. The defining characteristic is not the sophistication of the model but the existence of a target.

The economics are important. Labelling is usually the largest cost in the project, and often the bottleneck that determines what gets built. A dataset of 50,000 images labelled by radiologists takes months and real money. Whatever the model architecture does afterwards, it is downstream of a data-collection problem solved by people.

Three supervised paradigms show up constantly:

- **Classification** picks one of a fixed set of labels. "Is this email spam?" "Which of 1,000 categories is this product?"
- **Regression** predicts a continuous number. "How many units will sell next Tuesday?" "What will this house be worth?"
- **Ranking and sequence prediction** order or generate sequences. Search results, next-word prediction, protein folding.

**Where it fails.** Supervised systems inherit every quirk of their labels. If historical hiring data encodes past discrimination, a classifier trained on it will reproduce that discrimination with a very convincing interface attached. If labels are systematically wrong for a subgroup, accuracy on the majority group will hide it completely. This is not a subtle failure; it is the direct consequence of the objective. It is covered in detail in [Bias, Fairness and Harm ](20-bias-fairness-and-harm.html).

**The three-way split.** Practitioners divide labelled data into training, validation and test sets. The training set fits the model. The validation set tunes the settings that do not get learned directly, such as regularisation strength or the number of gradient steps. The test set is touched exactly once, at the end, to estimate generalisation. Touch it repeatedly and the estimate quietly becomes a validation estimate — a small methodological slip with a long history of producing overstated results.

> If your reported accuracy was measured on a set you iterated against, you do not know your model's accuracy.

## Unsupervised learning: finding structure without answers

Unsupervised learning gets no labels. You hand the system a pile of data and ask it to organise it, compress it or find what varies.

The most famous example is clustering: given a million customers with no categories assigned, discover groups with similar purchasing behaviour. Marketing teams use this to build segments they did not know to ask for. Dimensionality reduction is the other workhorse — compressing thousands of correlated features into a few axes that preserve most of the variance, which both speeds up downstream models and makes data visible to human eyes.

Two modern cases blur the boundary:

- **Self-supervised learning** hides labels inside the data. Mask a word and predict it; mask parts of an image and reconstruct them; predict the next sentence given earlier ones. No human labels required, enormous datasets allowed. Nearly everything large in modern AI is trained this way, and the technique is what made scaling data-driven systems practical.
- **Generative modelling** learns the distribution of the data, not a mapping from input to output. Train on millions of cat images and the model learns what a cat plausibly looks like — so it can produce a new one. Variational autoencoders, Gaussian mixtures and diffusion models all live here.

**Where it fails.** Because there is no definition of correct, success is judged by proxies: reconstruction quality, cluster compactness, human impression of whether a generated image looks right. These proxies are easy to optimise and easy to game. A clustering that separates the dataset by a feature you did not care about can be internally perfect and commercially useless. Discovering structure is not the same as discovering *useful* structure.

## Reinforcement learning: learning from consequences

Reinforcement learning is learning by doing. An agent takes actions in an environment, receives rewards and penalties, and gradually shapes its behaviour to accumulate more reward over time.

The formal vocabulary is small: a *state* (what the world looks like now), an *action* (what the agent can do), a *reward* (a number that is better if higher), and a *policy* (the strategy mapping states to actions). The learning signal is not a label for the right answer but the accumulated score of the consequences. This is why it can master things nobody can describe a rule for — walking, driving, playing a game, routing a packet.

It is also why it is expensive. Data has to be generated by trial, and exploration has to be permitted, which means the agent must be allowed to fail a great deal before it succeeds. AlphaGo played hundreds of millions of self-play games; a physical robot needs a physical world that can be reset thousands of times. The economics work in simulation and are brutal in reality.

Deep reinforcement learning took off in 2013 with a result that is now folklore: a system learned to play Atari games from raw pixels, using nothing but the score. The result was simplified over time into "reinforcement learning learns anything", which is not what happened. It learned games where the rules were stable, feedback was immediate and a full episode lasted seconds.

**Where it fails.** Specify the reward wrongly and you get competent behaviour that is exactly wrong. If a hospital is rewarded for reducing readmissions, it will reduce readmissions. A system rewarded for clicks will find the click. A system rewarded for apparent accuracy will defer to the person who marks the work. This failure is called reward hacking, and it is not an edge case; it is the predictable result of optimising a proxy. [Alignment ](13-fine-tuning-rlhf-and-alignment.html) and [agents ](12-agents-and-tool-use.html) are largely about how to keep it from happening.

## Choosing between them

In practice, projects combine all three, and the order of operations is a design decision rather than a discovery.

| Question | If yes, start with |
| --- | --- |
| Do you have labelled examples of the exact task? | Supervised |
| Do you have raw data and need structure or generation? | Unsupervised |
| Can you simulate the situation and measure success numerically? | Reinforcement |
| Is the correct answer ambiguous or unknown to humans? | Unsupervised, then human preference |
| Is the system taking real-world actions? | Reinforcement, with heavy safety constraints |

The overwhelmingly common production pattern today is: pretrain on raw data without labels (self-supervised), adapt to a specific task with labels (supervised), then align the output behaviour with human preferences (reinforcement plus human feedback). That three-stage story is the subject of [What Actually Happens During Training ](07-what-happens-during-training.html).

## The idea worth keeping

All three families share one underlying mechanism. The system holds a large set of adjustable numbers, measures how far its output was from its aim, and nudges the numbers in the direction that reduces the error. The families differ only in where the aim comes from: a human-provided label, a discovered structure, or a number the world hands back after the fact.

Every subsequent article in this collection is a detail of that one loop — what the numbers mean, what the aim should be, and what happens when it is wrong.
