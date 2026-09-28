---
number: 16
title: AI and Discovery — Medicine, Biology, Energy and Materials
description: The most consequential applications of AI may not be chatbots at all. In several scientific domains the progress is real, measured and already in use — with a specific and predictable failure mode of overstating results.
category: Applications
tags: [science, medicine, biology, drug discovery, materials, energy]
date: 2024-04-29
slug: ai-in-medicine-and-science
---

Chatbots dominate public attention, but the most defensible return on AI so far is in places where there is a measurable target, a costly experiment, and a real budget: biology, medicine, materials, and parts of the physical world.

The pattern of progress is remarkably consistent across all of them, and it is not the pattern in the demos.

## The shape of scientific AI

Three distinct uses, often conflated:

- **Prediction.** Estimate a property cheaply that is otherwise expensive to measure: whether a molecule binds, how a protein folds, whether a subsurface is porous, how much load a component will take. Fast, and enormously useful as a filter before the expensive experiment.
- **Search.** Narrow an enormous space to a handful of candidates worth testing. This is where the value concentrates, because the space — millions of molecules, billions of possible materials, an intractable number of configurations — is the actual bottleneck.
- **Generation.** Produce a candidate outright: a new structure, a sequence, a design. Real and increasingly useful, but almost always a proposal that still has to be made, tested and failed at least sometimes.

Predictions that save 90% of the experiments is already transformative in a field where each experiment costs money and months. That is why the biomedical results arrived first: the validation loop was already fast and expensive, which made the savings enormous.

## Biology and drug discovery

The clearest established result is protein structure prediction. For decades the practical route to a structure was experimental — years and a specialised facility. A deep learning system predicting structures from sequence with near-experimental accuracy, and a companion tool that designs novel proteins to order, removed that bottleneck for a large class of work.

The important caveat: these systems predict structure. They do not predict function, and the mapping from structure to biological effect is where most of the difficulty lives. A beautifully predicted structure for a protein whose role in the cell is unknown is a real scientific result and a long way from a therapy.

The broader application is in candidate selection. Instead of testing ten thousand molecules, test the hundred that computation ranks highest. This is real, it is being done, and it has not yet produced a corresponding increase in approved drugs — a gap that reflects biology rather than computing. The biology of disease is the bottleneck now.

## Medicine in practice

The clinical picture is more cautious than the laboratory one, for structural reasons.

**Diagnostic imaging** is the most mature application. Narrow tasks — flagging a possible abnormality for review — have well-demonstrated value, and the workflow is naturally suited: a model as a second reader that does not replace the clinician.

The failure modes are known and consistent. Models are sensitive to the specific scanner, hospital and protocol that produced their training data, and performance frequently degrades at a new site without any signal that it has. Performance can differ across patient groups, and the groups with the worst representation in the training data are usually the groups already worst served. A model validated as a whole-population tool can be worse than the existing process for a specific population, which is a distributional harm, not a rounding error.

**Note generation** shows measured time savings and a persistent risk: a plausible note that omits a finding. Clinicians compensate by re-reading everything, which erodes the time saving, or by accepting the note, which is a safety problem. Both outcomes are reported. Neither is a solved problem.

**Ambiguity is the core difficulty.** A model that identifies pneumonia in a chest image has solved a different problem from deciding whether to treat. Delegating the second to the first, in a domain where the two come apart, is where the harm lives.

## Materials, chemistry and energy

This is the area with the least attention and possibly the clearest economics, because the measurement is cheap and the payoff is industrial.

Battery cathodes, catalysts, alloys and polymers all have enormous search spaces and expensive physical testing. Machine-learned interatomic potentials — approximations of the energy between atoms, trained on high-quality quantum calculations — let researchers simulate far more configurations than DFT alone allows, and have produced candidate materials that were then synthesised and tested.

The value proposition is industrial rather than dramatic: fewer lab experiments per promising candidate, and better performance in existing materials with no new chemistry required. Grid optimisation, where a utility balances intermittent generation against demand and storage, is the same structure — a hard combinatorial scheduling problem with a measurable objective and a large budget attached.

Energy and materials are where the boring deployments are. They are also where the value most reliably lands, because the feedback loop is fast and the answer is a physical measurement.

## The recurring failure: overstatement

Scientific AI has a specific, well-documented pathology: **results are reported in units of prediction, but interpreted in units of reality.**

Published protein structure predictions did not become therapeutic discoveries. Generated drug candidates are not drugs. A material with a predicted property of 9 does not have a property of 9. A model predicting sepsis risk has not been shown to save lives, and trials are needed to establish that.

This is not fraud and mostly not carelessness. Prediction metrics are available immediately; outcome metrics take years and money; and the career incentives reward the former. The result is a literature that reliably runs ahead of the evidence by a few years.

The practical defences are known and simple:

- **Report the decision-relevant metric**, not the loss: not "0.92 accuracy" but "identifies 60% of the failures that matter at a 5% false-alarm rate".
- **Separate the model's contribution from the search it enables.** A model that finds 100 candidates for a chemist to test has created value even if none of them works, and that should be stated.
- **Run prospective validation** — real, forward-looking, on data the model has never seen in any form.
- **Publish the failure cases.** A domain where only successes circulate produces systematically overoptimistic practice.
- **Insist on the physical check.** The prediction exists to make an experiment cheaper, not to replace it.

## Why this matters more than the chatbots

The strategic asymmetry is worth naming. Conversational AI changes how people interact with information, which is diffuse and hard to measure. Scientific AI changes the cost of a laboratory experiment, which is concrete, immediate, and shows up in someone's budget.

If the most valuable applications turn out to be the unglamorous ones — designing a better electrolyte, triaging a screening list, scheduling a grid, triaging a scan — then the right policy, funding and evaluation posture is oriented at deploying them carefully and honestly rather than at regulating the parts that generate headlines.

> In science, the metric that matters is not how well the model predicted. It is how many expensive experiments you no longer had to run.
