---
number: 9
title: Evaluating AI — Benchmarks, Hallucinations and How to Measure Quality
description: Accuracy is easy to compute and easy to game. A practical guide to what actually goes wrong in AI measurement, and what to measure instead.
category: Machine Learning
tags: [evaluation, benchmarks, metrics, hallucination, llm-as-judge]
date: 2024-03-11
slug: evaluating-ai
---

Every AI project eventually faces the same disappointment. The prototype works. The demo impresses. Then somebody asks how well it works, and the honest answer turns out to be a number with an enormous and mostly invisible error bar.

Measurement is where AI maturity shows. Here is what actually goes wrong, and what to do instead.

## The metric trap

A benchmark is a proxy. The moment it is used for comparison, it becomes a target, and the moment it becomes a target it stops measuring the thing you care about. This is Goodhart's law, and it is not a theoretical concern in AI — it is a repeating historical pattern.

The canonical example, described in [How Machines See ](04-how-machines-see.html), is image classification. For years the headline number climbed from roughly 74% to above 90%, then it turned out that a large fraction of the test images were mislabelled, and that a well-tuned conventional method trained on clean labels could already match the best deep networks. The field had spent a decade optimising a test set.

Other ways measurement goes wrong:

- **Contamination.** Test questions that leaked into training data, so the model has effectively memorised the answer. For a benchmark that was public years before a model's release, this is the default assumption, not a suspicion.
- **Narrow slices.** A single average hides a model that is excellent in English and poor in most other languages, accurate on common code and unreliable on the code your users actually write. Both facts can be true, and only one is quoted.
- **Format sensitivity.** A model's score on a multiple-choice benchmark can move by several points because the prompts were reformatted, the options reordered, or a "think step by step" hint added. That variance is larger than the year-on-year improvements being reported.
- **Judging by another model.** Using a large language model to grade outputs is convenient and has become standard practice, but it introduces its own biases: preference for verbosity, for confident phrasing, for answers resembling its own style. Agreement between a judge and humans is a measurement that itself needs validating.
- **Human ratings that drift.** Small panels, few examples, unclear criteria, and no inter-rater agreement check. A rising score can mean the rubric became lenient.

## Metrics that are worth trusting more

**Task completion against a real reference, not a real person.** For summarisation, translation or code, score against multiple acceptable answers rather than one. Single-reference scores punish correct outputs that differ from the reference.

**Calibration.** Ask a model how confident it is and check whether its confidence predicts its accuracy. A system that says it is 40% sure and is right 40% of the time is usable; one that is confidently wrong is a liability. Confidence that is meaningless is worse than absent, because people trust it.

**Robustness and variance.** Run the same evaluation several times with different seeds, prompts and orderings. Report a range. If a result does not survive re-running, it was noise.

**Slice reporting.** Mandatory, not optional: accuracy by language, by demographic group where people are affected, by document type, by input length, by source system. Averages are for dashboards; decisions should be made on the worst slice you are responsible for.

**Human evaluation done properly.** Enough items to matter — dozens to hundreds, not ten — explicit criteria, multiple raters, and reported agreement between them. It is expensive and it remains the only way to evaluate qualities that have no formula: helpfulness, tone, appropriateness, whether a refusal was correct.

**End-to-end task metrics.** "The model is 92% accurate" is not a business result. "Median handle time fell 34% and the escalation rate is unchanged" is. Systems should be measured where they sit in a process, including the work created downstream by their mistakes.

## Evaluating generation, specifically

Open-ended output is where the interesting problems are. The most useful decomposition separates several different things that all get called "quality":

- **Correctness.** Is the claim true? Measured against sources, not against style.
- **Completeness.** Does it cover what was asked?
- **Grounding.** Is every claim supported by the provided material, and does it avoid importing outside facts that were not asked for?
- **Instruction adherence.** Did it do what was actually requested — format, length, audience, constraints?
- **Harmfulness.** Does it produce content that causes foreseeable harm, given the context and audience?
- **Style.** Is it readable and consistent? Important, and the last thing to optimise.

A system can score beautifully on the last three and fail catastrophically on the first, and the fixes for the first are entirely different from the fixes for the rest.

## When the model grades itself

Using a model to evaluate a model is here to stay, so it is worth knowing how to use it responsibly.

Do: use it for cheap, high-volume screening of clearly-scored dimensions; use several judges and average; calibrate the judge against human labels on a sample you actually read yourself; rotate which model judges which; and always disclose that a model was the grader.

Do not: treat its verdict as ground truth; let it grade its own outputs; use it to score open-ended quality with no human anchor; or assume improvements in judge scores mean improvements in quality.

> A judge is a measurement instrument, and instruments need calibration before they are trusted. This one is cheaper than a lab technician and it will still lie to you with a straight face.

## The evaluation that actually matters

The last and most important test is a real deployment with a real user, because almost every serious failure mode only appears there:

- The system works on the cases in the demo and fails on the tenth-percentile case that generates a third of the complaints.
- Users learn to work around it, and the workaround is worse than the original problem.
- Output quality degrades because the input distribution drifted and nothing in the pipeline noticed.
- Nobody downstream knows that an error was machine-made, and trust in the whole system collapses when the first one becomes public.

The defensible practice is a small, permanent, human-reviewed sample of real traffic, reviewed by people who can change things when they see a problem. Dashboards tell you about the average. Reading the errors tells you what to build next.

## A minimum viable evaluation plan

If you are starting from nothing, this is enough to begin and cheap enough to sustain:

1. **A held-out set** built from real data, deduplicated, never used for tuning.
2. **Three metrics** — one task metric, one calibration metric, one human-rated quality metric.
3. **Slice reporting** on the two or three dimensions that matter to your users.
4. **A fixed set of adversarial probes**: edge cases, known failure modes, and inputs designed to break it.
5. **An error log** that is read weekly by someone with authority to change the system.
6. **A pre-registered decision rule**: what result would make you ship, and what would make you stop. Written before you see the numbers.
