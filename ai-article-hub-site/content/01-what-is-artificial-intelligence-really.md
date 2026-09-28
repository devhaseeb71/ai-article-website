---
number: 1
title: What Is Artificial Intelligence, Really?
description: The field has no agreed definition of intelligence, so it built one anyway. A plain-language tour of what counts as AI, what emphatically does not, and how to tell a useful system from an impressive demo.
category: Foundations
tags: [definition, history, intelligence, overview, myth]
date: 2024-01-15
slug: what-is-artificial-intelligence-really
---

There is a running joke among researchers that artificial intelligence is the study of making computers do things that we cannot specify how to do. It is only half a joke. After seventy years, nobody can give you a definition of intelligence that all working AI researchers accept — and yet the field has produced systems that write software, translate languages, generate images and drive cars.

That gap between the missing definition and the working results is where most public confusion lives. This article sorts out what is actually meant by "AI", why the vagueness is not a scandal, and how to look at any new system without being fooled by it.

## The word problem

"Artificial intelligence" entered public life through a 1956 proposal for a summer workshop at Dartmouth. The proposal argued that every aspect of learning, or any other feature of intelligence, could in principle be so precisely described that a machine could be made to simulate it. The plan was optimistic in a way that is now easy to see, but the ambition stuck: AI has always been a bet that a general description of a capability will eventually be cheaper than a specific one.

Three different questions hide inside the phrase, and confusing them causes most bad arguments:

- **Can it do the task?** A question about capability. Spam filters, search ranking, chess engines and protein structure prediction all answer yes.
- **Does it do the task the way a person would?** A question about process. Optical character recognition reads a page without knowing what a page is.
- **Does it understand what it is doing?** A question about mind. Here the field is genuinely uncertain, and has been since 1956.

Every public debate about AI is really a debate about which of these three questions is being answered, and the parties rarely notice the switch.

## The working definition

If you want a definition you can use, the most honest one is short: **AI is a program that performs a task which normally requires a pattern of perception, reasoning or decision-making that nobody could write down as a set of rules.**

That last clause is the load-bearing part. A lookup table is not AI. A rule engine that says "if the customer is over 70 and the claim is over 2000, flag for review" is not AI, even though the phrase "automated decision" appears on the invoice. A calculator is not AI, however large the numbers.

The clause also explains why the definition is unstable. As machines get better at a task, the task stops looking like AI. Handwriting recognition was the flagship demonstration of neural networks in the 1980s; today it is a solved utility buried inside scanners. Chess was the canonical hard problem; a mediocre phone chess app is now a solved utility. AI does not advance by getting better at a fixed list. It advances by moving the list.

> The interesting question is never "is this AI?" It is "what was hard about this last year, and what is hard about it now?"

## What AI is not

Four claims come up constantly and are worth dismantling directly.

**It is not consciousness.** No system in production today has any accepted account of subjective experience, and no architecture we know of includes a plausible mechanism for it. Models can produce strikingly self-referential text about feelings, which is a fact about the training distribution, not about the model having any.

**It is not understanding, in the strong sense.** Whether a large language model internally represents meaning is an open and active research question. The honest position is that we do not know, that the answer changes what we should expect from these systems, and that the uncertainty is itself a reason to design around behaviour rather than around inner life.

**It is not one technology.** "AI" covers decision trees, convolutional networks, transformers, reinforcement learning, Bayesian optimisation, and a lot of classical statistics wearing a new badge. Most of what works in industry today is not deep learning at all.

**It is not magic.** Every system has an architecture, a training process, a data distribution, a serving budget and a failure mode. When a demo seems to defy explanation, the explanation is usually that the demo omitted the scaffolding that makes the real system work.

## Narrow, general and the vocabulary of hype

The field's standard internal distinction is between **narrow** systems, built for a bounded task, and **general** systems, expected to transfer to unfamiliar tasks. Every deployed system today is narrow, including the ones marketed as general-purpose assistants. "General purpose" describes the *interface* — text in, text out, a wide range of requests — not the underlying generality of competence.

Two more labels need care:

- **Strong versus weak AI** is a distinction between systems that claim to replicate human cognition and systems that imitate specific behaviours. Almost all commercial AI is weak, in the neutral sense that it is good at tasks and has no theory of itself.
- **Supervised, unsupervised, self-supervised and reinforcement learning** describe *how* a system learns, and each makes different demands on data and evaluation. This vocabulary is covered properly in [How Machines Learn](02-how-machines-learn-the-three-families-of-machine-learning.html).

Neither label is a compliment or an insult. They are coordinates.

## Why the field ships without a definition

The absence of a settled definition is often presented as evidence that AI is not real science. It is closer to the situation in economics, where "value" remains philosophically contested while the discipline is empirically one of the most productive ever built.

Working without a definition is possible because AI is, in practice, a research programme constrained by something that definitions are usually supposed to supply: measurement. You do not need to know what intelligence *is* to know that a system beats a human at 19 categories of image classification, halves the error rate on protein structure prediction, or fails 40% of the time on a task a ten-year-old child would ace. Benchmarks, however imperfect, provide the ground truth that a definition would have supplied.

The failure mode of measurement-driven fields is well known: optimise the metric, watch the metric stop meaning anything. Papers on benchmarks describe "state of the art" results that turn out to be artefacts of the benchmark. This is a normal, recurring tax on empirical work, not a crisis of legitimacy.

## How to look at a new system

When an AI product is announced, four questions will tell you most of what you need.

1. **What exactly is the task, and how is success measured?** A concrete metric with a baseline is a claim. "Revolutionary" is not.
2. **What happens on the hard inputs?** Every system has an input distribution it was built for. Ask what happens a little outside it.
3. **What does it cost at the volume I care about?** Capability demos are usually measured at a scale nobody deploys.
4. **Who absorbs the errors?** A system that is wrong in a way a person can catch is a tool. A system that is wrong in a way a person cannot catch is a hazard, regardless of its average accuracy.

> Average accuracy is a marketing number. The shape of the error distribution is the engineering problem.

## Where you are in the story

AI is roughly where the internet was in 1994, with two differences. First, the infrastructure is already in place, so adoption is faster than it was for the web. Second, the electricity bill is real: training and serving large models costs money that has to come from somewhere, which disciplines deployment in a way that pure research does not.

The most useful thing a non-specialist can do is stop asking whether machines are intelligent, and start asking what particular systems are good at, what they cost, and who is accountable when they are wrong. Those questions have answers. The others are still being argued over, and will be for a while.

## Further reading in this collection

- [How Machines Learn](02-how-machines-learn-the-three-families-of-machine-learning.html) — supervised, unsupervised and reinforcement learning, without the jargon fog.
- [Neural Networks from Scratch](03-neural-networks-from-scratch.html) — what a weight and a bias actually do.
- [The Transformer](06-the-transformer-architecture.html) — the architecture behind almost everything shipping today.
- [What Comes Next](27-what-comes-next-agi-or-not.html) — where the arguments about general intelligence actually stand.
