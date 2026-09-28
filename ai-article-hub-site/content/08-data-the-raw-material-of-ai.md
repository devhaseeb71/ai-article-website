---
number: 8
title: Data — The Raw Material of AI
description: Everyone talks about models and almost nobody talks about data. Yet data choices decide capability, cost, bias and legal exposure long before any architecture is chosen.
category: Machine Learning
tags: [data, datasets, quality, provenance, curation]
date: 2024-03-04
slug: data-the-raw-material-of-ai
---

Ask someone to describe a machine learning project and they will describe the model. Ask what will make it succeed and they will mention the algorithm. In practice, the project succeeds or fails on data, and the decisions about data are made early, by people who are not yet thinking about the model, and are nearly impossible to change later.

This article walks through the data lifecycle: where datasets come from, what makes them good or bad, the ways they fail, and what to do about each.

## Why data dominates

A model can only imitate the distribution it was trained on. If the data says consultations end after eleven minutes, the model will say consultations end after eleven minutes — not because eleven minutes is true, but because eleven minutes is what the record contains.

This gives data a strange double status. It is simultaneously the *source* of the model's capability and the *definition* of the model's errors. A wrong prediction is a data problem until proven otherwise, and the proof is usually hard to produce.

The economics agree. In a typical supervised project, the split is roughly: labelling and data engineering consume most of the budget, model selection a modest share, and training compute a smaller one still in anything but a frontier setting. The industry's attention is inverted, because modelling is more publishable and data work is not.

## Anatomy of a modern dataset

A large text dataset is assembled in a pipeline with recognisable stages:

1. **Crawl.** Fetch pages at scale, respecting site rules and rate limits, and keeping a record of where everything came from.
2. **Extract.** Strip navigation, boilerplate, cookie notices and duplicated site furniture. A page of article text and a page of navigation both produce hundreds of tokens; if you keep the noise, you spend most of your budget learning to recognise navigation.
3. **Filter for quality.** Score documents with a classifier trained on human preferences. Roughly: keep text that a person would write, keep reference material, keep code, discard the rest.
4. **Deduplicate.** Exact matches, then near-matches. This is not optional. Duplicated documents are up-weighted training examples, and heavy duplication degrades both quality and safety behaviour in ways that are difficult to detect without deliberately looking.
5. **Remove harmful and personal data.** Malicious content, and personal information at volume.
6. **Mix.** Choose proportions by domain, language and quality. This is a strategic act with permanent consequences for the model.
7. **Split.** Hold out validation and test sets — and hold them out *properly*, deduplicated against the training set, or the evaluation is contaminated.

## Labelled data: still the hard part

For supervised tasks, the cost is in the labels, and the difficulty is rarely in producing them mechanically. It is in deciding what counts as the right answer.

Consider medical imaging: radiologists labelling a scan may disagree with each other. The disagreement is often the real signal, and averaging it away produces a label that is confidently wrong. Consider content moderation: what counts as hate speech is a political question, and a model trained on one jurisdiction's answer will produce false positives in another. Consider any labelling task where the "correct" answer depends on taste, style or intent — those are not datasets you can buy your way out of.

Two techniques help with genuinely ambiguous labels: writing guidelines with worked examples, and having several labelers rate the same items so the *distribution* of judgement becomes the training signal rather than a single number. The second is usually more honest and always more expensive.

## The failure catalogue

**Historical bias.** Data is a record of a world that was unequal, so a model trained on it reproduces the inequality. This is not a subtle interaction; the mechanism is direct.

**Under-representation.** Rare classes, minority languages, disabled users, small countries, old equipment, unusual conditions. Aggregate metrics hide them almost perfectly, because the affected group is a small fraction of the total.

**Domain shift.** A model trained on one hospital, one camera, one accent or one documentation style degrades silently when deployed in another. The failure is not a crash; it is a few percentage points, spread across a population that will never see a dashboard about it.

**Annotation artefacts.** A model that predicts a hospital's billing code from a scan is partly predicting the scanner. Spurious correlations between the label and something incidental in the data are extremely common, and removing them requires deliberately searching for them.

**Leakage.** Information from the evaluation set reaching training, often through duplicate documents or a preprocessing step performed before splitting. Leakage inflates results, produces papers that cannot be reproduced, and is the single most common reason a published benchmark number is meaningless.

**Permission.** Data collected, licensed or scraped under conditions that were not clearly permitted. This is not a technical problem, and it cannot be solved by better engineering, though it is frequently treated as if it were.

## Practical advice that survives contact with reality

- **Write down where each field came from**, with a date and a licence or permission basis. Six months later nobody remembers, and the answer is needed for both compliance and debugging.
- **Measure the slices, not just the average.** Accuracy by language, by demographic, by document type, by time period, by source. If a subgroup's performance is not reported, assume it is bad.
- **Keep a permanent held-out set** that is never used for tuning, and rebuild it periodically as the world changes.
- **Sample manually, constantly.** Reading fifty examples a week from the production distribution will reveal more real problems than any dashboard. It is also the only way to notice that the production distribution has quietly become something else.
- **Prefer more distinct data over more data.** Ten thousand unique examples beat a hundred thousand copies of a thousand.
- **Document the exclusions** as carefully as the inclusions. A dataset is defined as much by what you threw out.

> "Garbage in, garbage out" undersells it. The more accurate phrase is: whatever you put in, the model will faithfully become.

## Data as a durable asset

There is one more reason to care: a well-documented dataset outlives the models trained on it. Models become obsolete as architectures change and as their training recipes are rebuilt; the dataset can be reused, re-licensed, audited, corrected and re-used by anyone, which is exactly the kind of asset that belongs in the public domain.

That is the argument for publishing datasets alongside the work, under a clear open licence, with the collection method documented, known limitations stated, and personal or restricted material removed. A public-domain corpus is something a whole field can build on for decades. A model checkpoint is something that ages out in about two years.

Both matter. Neither substitutes for the other. But when you have to choose what to leave behind, leave the data.
