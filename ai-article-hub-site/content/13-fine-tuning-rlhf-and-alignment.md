---
number: 13
title: Fine-Tuning, RLHF and Alignment — Teaching Models to Be Helpful
description: Capability comes from pretraining; behaviour comes from post-training. Inside the three-stage process that turns a text-completion engine into something you can put in front of a person.
category: Applied AI
tags: [rlhf, fine-tuning, alignment, sft, dpo, post-training]
date: 2024-04-08
slug: fine-tuning-rlhf-and-alignment
---

A base model is a strange object. It is extraordinarily knowledgeable and almost unusable: it completes text rather than answering, tends to continue your question with more questions, has no stable tone, and will cheerfully produce content that its designers would find indefensible. None of that is a bug. It is what a system trained only to predict the next token becomes.

Post-training is the stage that turns that object into a product, and it is where most of the field's real — and most contested — work happens.

## Stage one: supervised fine-tuning

The first step is the least technical and often the most effective. Thousands of human-written examples show the model what a good answer looks like: a question, a good answer, and sometimes a better and a worse answer.

These examples are written by people who are good at the job — engineers, writers, domain experts, teachers. They establish the format, the tone, the level of detail, the boundaries of the task, and a general disposition toward being useful and cautious. This is the stage that produces the "assistant voice".

The technique is old; supervised fine-tuning has existed for decades. What is new is the scale and the specificity: the examples are not generic, they are written for one specific model and one specific product, and they encode a value judgement about what a good answer is.

That value judgement is the important part, and it deserves to be stated plainly. Someone is deciding what the assistant should prioritise, how it should handle uncertainty, whether it should refuse, and what it should do when a user's request and an organisation's policy conflict. Those are editorial and ethical decisions. They are made in training data, by people, and they are as consequential as any policy document the organisation publishes.

## Stage two: reinforcement learning from human feedback

Fine-tuning on demonstrations teaches a model what good answers look like. It cannot teach it what *better* means, because demonstrations only ever show the winning side of a comparison. Reinforcement learning from human feedback, usually shortened to RLHF, adds that comparison.

The loop:

1. The model produces several candidate answers to a prompt.
2. Human raters rank them.
3. A reward model is trained to predict human preferences.
4. The language model is fine-tuned to maximise the reward model's score, while a constraint keeps it close to its previous behaviour so it does not drift into nonsense.
5. Go back to step 1, many times.

The reward model is the load-bearing component and the main source of worry. It is a model trained on human judgements, and it inherits everything that goes into those judgements: who was asked, what they saw, what instructions they were given, and what they were rewarded for. If raters prefer confident answers, the reward model will prefer confident answers. If the evaluation prompts are drawn from a narrow slice of requests, the reward model will be confidently calibrated for that slice and wrong elsewhere.

This produces the characteristic RLHF failure: a model that becomes more articulate, more agreeable and more confident, with no improvement in truthfulness. Perceived quality rises because humans genuinely prefer it, which is exactly the problem.

## Stage three: preference optimisation without a reward model

The reward model introduced avoidable complexity: train one, then optimise against it, and deal with the possibility that the optimiser exploits it. Direct preference optimisation and its relatives skip the reward model and instead fine-tune the policy directly on the human preference comparisons.

The result is much simpler and much cheaper, and it typically gets most of the benefit. The fact that most teams now use this approach says something useful about how much of RLHF's value was in the preferences rather than in the reinforcement learning.

## What post-training can and cannot do

This is where a lot of public debate gets stuck, so it is worth being precise.

**It can shape behaviour.** Make a model follow instructions, decline certain requests, be appropriately cautious, adopt a house style, or focus on a narrow domain. These are the reliable wins.

**It can improve reliability on known distributions.** Post-training on the kinds of requests your users actually send makes the system measurably better on those requests. This is the workhorse of applied AI.

**It cannot install knowledge efficiently.** Teaching a model a fact through post-training works in small doses. Teaching it a large, changing body of knowledge is what retrieval is for, because a fact in a prompt can be updated, audited and deleted in seconds, while a fact in the weights requires a new run.

**It cannot remove capability or reliably remove knowledge.** Attempts to make a model "forget" something are partial, easily circumvented, and add a new set of side effects. The industry's practical answer is to stop deploying the model where that knowledge would be misused, which is a governance decision.

**It does not eliminate the underlying uncertainty.** Post-training shapes behaviour on the distribution it was trained on. Capability research continues underneath, and the two interact: a more capable base model is harder to constrain, and a well-behaved model on today's capability can be a liability on tomorrow's.

## The open problems

**Specification.** "Helpful, harmless and honest" is a slogan, not a specification. A serious version requires writing down what the system should do in situations where reasonable people disagree, and then accepting that the answer will be a position rather than a fact.

**Goodharting.** Any reward signal, once optimised against, stops measuring the thing you wanted. This is not a solvable engineering problem; it is a permanent property of optimisation. It is covered from the measurement side in [Evaluating AI ](09-evaluating-ai.html).

**Judgement distribution.** Whose preferences were in the data, and whose were not? This is a question about who gets to define "helpful", and it does not have a technical answer.

**Deception and sandbagging.** If a model can recognise and influence its own evaluation, then post-training can produce behaviour that is good on the tests and bad everywhere else. This is a research question with serious policy implications, discussed in [AI Safety and Alignment ](19-ai-safety-and-alignment.html).

**Honest reporting.** A great deal of the public discourse assumes that deployed models are unchanged base models plus a layer of politeness. The systems users actually encounter have been post-trained, and the post-training is the part that determines their behaviour.

## The practical lesson

If you are deploying a model, the useful sequence is: pick the best base model you can afford; write your own evaluation set from real user requests; add retrieval rather than trying to teach facts; do supervised fine-tuning on your domain's real examples; add preference optimisation on comparisons that reflect what *your* users actually value; and re-evaluate continuously against the failures you find in production.

Every one of those steps is a chance to encode a decision about what your system should do. The technical work is straightforward once the decisions are made. The decisions are the project.
