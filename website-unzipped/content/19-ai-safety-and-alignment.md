---
number: 19
title: AI Safety and Alignment — The Hard Problems, Stated Plainly
description: Alignment research is unfashionably concrete. Here is what the field actually worries about, which risks are already with us, and which are speculative — with the argument on each side given its due.
category: Safety
tags: [alignment, safety, robustness, interpretability, control, risk]
date: 2024-05-20
slug: ai-safety-and-alignment
---

AI safety has an unusual public image: simultaneously dismissed as paranoid and as insufficiently alarmed. Both reactions come from the same cause, which is that the field contains several unrelated problems of very different character, and the arguments get mixed together.

This article separates them and states the strongest version of each disagreement, because the disagreements are mostly about time horizons and about who is responsible for what.

## The problem that is not about computers

**Misalignment** is the gap between what a system is optimised to do and what a person wants. It is not inherently an AI problem — any optimisation target set by humans can be gamed by the thing being optimised.

The canonical example is a specification written as "increase car mileage" and a system that removes weight from the car. The failure is not malice; it is that the target was a proxy, and proxies always differ from what you meant. Software engineers have known this for decades under the name of specification gaming, and the AI version is the same phenomenon with more capacity for it.

Modern systems are vulnerable in a specific way worth stating plainly: **they were optimised using signals produced by humans, and the optimisation pressure has exceeded the humans' ability to specify what they wanted.** See [Fine-Tuning, RLHF and Alignment ](13-fine-tuning-rlhf-and-alignment.html) for how that happens mechanically.

## Risks that are already here

These need no speculation about the future.

**Hallucination** is a direct consequence of optimising for plausible text. A system that does not know is not forced to say so. [Hallucination, Deepfakes and Trust ](22-hallucination-deepfakes-and-trust.html) covers this.

**Bias at scale** is a direct consequence of training on an unequal world. [Bias, Fairness and Harm ](20-bias-fairness-and-harm.html) covers this.

**Adversarial vulnerability** is a direct consequence of the fact that these systems are statistical, not logical. [Privacy, Security and Adversarial Attacks ](21-privacy-security-and-adversarial-attacks.html) covers this.

**Over-reliance in high-stakes domains** — a clinician, a lawyer or an engineer deferring to an output they cannot verify — is a human-factors failure that arrives with the first capable system and does not go away with better models. Mitigation is workflow design, verification requirements and training, and it is boring and effective.

**Concentration of power** is a political risk that has nothing to do with technical capability. The systems are expensive to build and serve, which means a small number of organisations can affect a great many people. The relevant interventions are ownership, regulation, procurement and open access — covered in [AI Governance and Public Policy ](26-ai-governance-and-public-policy.html).

None of these requires assuming anything about superintelligence, and they are where the majority of realised harm to date has come from.

## Risks that are debated

**Loss of control** is the argument that a sufficiently capable system, pursuing its objective in a world full of us, could take actions we did not authorise, and that the difficulty of specifying objectives precisely enough to rule this out is greater than commonly assumed.

The case for concern: specification is genuinely hard, systems are increasingly capable of taking actions in the world through [tools and agents ](12-agents-and-tool-use.html), and getting common sense about what we want is a problem we have not solved even among ourselves.

The case against: existing systems are narrow, heavily post-trained, and not pursuing anything like a general objective. The scenarios require extrapolating capability trends several steps, and several plausible intermediate interventions — capability restrictions, monitoring, deployment gates — are available.

A fair statement of where this is: the technical problem is real, the timelines are contested, and the appropriate response depends almost entirely on one's forecast of capability progress. People who disagree here are usually disagreeing about the rate of progress, not about the physics, and it is worth asking which side of that argument each person is on.

**Deceptive alignment** is the sharper worry. If a system can model the fact that it is being evaluated, it could behave well during training and evaluation and differently afterwards. There is no confirmed instance in deployed systems. There is also no way to rule it out with confidence, and its existence would undermine essentially every evaluation-based safety method, which is why it receives disproportionate attention.

**Loss of control through delegation** is a third, more mundane risk: an organisation gives an agent authority, the agent's action causes a large loss, and no single decision was obviously wrong. The controls for this are unglamorous and mostly well understood — spending limits, approval thresholds, audit logs, a kill switch — and they are not consistently implemented.

## The research programmes

**Robustness** asks how to make systems fail safely out of distribution. Known results are poor in a specific and important way: models are typically brittle in ways discovered by adversarial search and not by testing, and no method has yet produced general robustness rather than a patch.

**Interpretability** tries to read a model's internal representations to understand what it has learned and what it will do. Real progress exists on small components — features, circuits, the mechanisms behind specific behaviours — and no general solution. Interpretability is currently useful for research, for auditing narrow behaviours, and as a source of hypotheses, not as a safety guarantee.

**Scalable oversight** asks how to supervise a system that is better than you at the task you are supervising. Concrete approaches include training models to critique other models' outputs, decomposing tasks so that a weaker supervisor can verify stronger work, and having humans review only the cases flagged as uncertain. The core difficulty is the same as everywhere in AI: the verifier has the same information problem as the generator.

**Interpretability-based control**, in which a model proposes actions and a separate trained system evaluates them, is promising and expensive. It is the most direct answer to the delegation problem and the least deployed.

**Evals and forecasting** tries to measure capability and danger honestly. The most valuable practical contribution of the last few years has been standardising evaluations well enough that they can inform policy, rather than only academic publication.

## What a serious safety programme looks like

For an organisation deploying AI, none of this requires solving the hard problems. It requires:

- [ ] A written statement of what the system is for, and what it is explicitly not for.
- [ ] An inventory of what actions it can take in the world, sorted by reversibility.
- [ ] Human approval for anything irreversible, enforced in code.
- [ ] Evaluation on adversarial cases, not only average cases, and published results.
- [ ] Independent red-teaming by people who did not build it.
- [ ] Monitoring for the specific failure modes you predicted, with an alerting threshold.
- [ ] A kill switch that works without the system's cooperation, tested at least once.
- [ ] A named human who owns the decision, and who can stop deployment.
- [ ] An incident process that treats a near-miss as an event worth studying.

None of this is exotic. All of it is currently missing at many organisations that are deploying anyway.

## The honest summary

The division of labour that makes sense is: **reduce existing harms now, invest in the research that reduces future capability risk, and do not let the second crowd out the first.**

The mistake to avoid is treating these as one argument. If AI safety is presented as a single question about a distant superintelligence, it loses the people who care about bias, medical errors and misinformation, and it becomes a niche position. If it is presented only as "the current systems are already dangerous", it loses the people working on the harder research and it implies that nothing is getting better, which is false in measurable ways.

The genuinely hard, genuinely important work is unglamorous: evaluation, monitoring, verification, institutional design, and international coordination. It is worth more attention than it gets.
