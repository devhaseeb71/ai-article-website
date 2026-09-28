---
number: 20
title: Bias, Fairness and Harm — How Models Reproduce Society's Flaws
description: A model trained on the world learns the world's patterns, including its inequalities. A clear account of where algorithmic bias comes from, why removing it is harder than it looks, and what actually works.
category: Ethics
tags: [bias, fairness, discrimination, equity, harms, accountability]
date: 2024-05-27
slug: bias-fairness-and-harm
---

The most common objection to using AI in decisions about people is that it is biased. This is correct, and it is also incomplete in a way that leads to bad policy.

The more accurate statement is: **a model learns the statistical patterns of the world it is shown, and the world it is shown contains inequality.** The bias is not noise added to a neutral process. It is the process working exactly as designed on data that records a biased world.

## Where bias enters

**Historical data.** The clearest case. If past hiring, lending, policing or medical decisions contained discrimination, a model trained on those outcomes will reproduce it — and will do so with the speed, scale and apparent objectivity of a piece of software.

The important refinement: reproducing past discrimination is not a modelling error. The system is optimising the objective it was given, accurately, against the data provided. The defect is upstream, in the choice of objective, and that is where the fix has to go.

**Representation.** Under-representation produces uneven performance, and the groups that are under-represented are systematically those already disadvantaged. Under [Data, the Raw Material of AI ](08-data-the-raw-material-of-ai.html), this is measured by slicing results by group rather than trusting the average.

**Measurement proxies.** Systems are often trained on whatever is available: arrest records, credit bureau entries, prior claims, clinical codes. Each is a proxy for behaviour or need, and each encodes who is more likely to be recorded. A model predicting "risk of reoffending" from criminal history is partly predicting "likelihood of being arrested again", which depends on where police are deployed.

**Deployment context.** A model validated in one hospital, one country or one population can be systematically wrong in another, and the mismatch is invisible without measurement in the new setting.

**Feedback loops.** This is the mechanism that turns a small bias into a large one. A predictive system allocates attention, attention generates labels, the labels train the next version of the system. Predicted crime produces more policing, which produces more recorded crime, which trains the system to predict more crime in that area. The loop is not a bug; it is what happens when a prediction is used as a target.

## Why fairness is technically hard

The uncomfortable fact is that the intuitive definitions of fairness are mathematically incompatible. One widely cited result shows that you generally cannot simultaneously achieve:

- **Equal error rates** — the false-positive rate is the same for every group.
- **Equal false-negative rates** — the false-negative rate is the same for every group.
- **Equal predictive values** — the base rate of the condition is the same for every group.

They are incompatible whenever the underlying base rates differ — which is to say, whenever the world is unequal. If a condition is genuinely more common in one group, matching overall accuracy across groups necessarily means different error rates for each.

There is no technical resolution here, because the conflict is not technical. It is a question about which kind of error is more harmful in a given context, and that is a moral and legal judgement. A health screening programme and a fraud investigation have different appropriate answers, and no amount of modelling will tell you which one you are building.

**The honest position:** fairness is a set of choices, not an objective function. The technical work is to make the choices visible, quantify each one, and let the decision be made explicitly by the people accountable for it.

## What actually works

The interventions that have demonstrably reduced harm share a shape: they operate on the decision process, not only on the model.

- **Fix the objective, not the model.** If the training target is a biased historical decision, the model is doing its job. Changing what "success" means is a policy act, and it is the highest-leverage change available.
- **Use a better outcome variable.** Predicting what actually happened to a patient is different from predicting which patients got flagged. Where a causal question can be identified — what would have happened without intervention — it beats a correlation, even with a worse apparent fit.
- **Measure every slice, always.** Accuracy, false-positive rate and false-negative rate by group, by site, by time, and published internally. An unmeasured disparity is an unmanaged one.
- **Use the model as a decision aid, not a decision.** Human review reduces harm, at a known cost in time and at a well-documented risk: automation bias, where people defer too readily. Aid-plus-review is a compromise with a specific failure mode, and it has to be monitored for that failure mode.
- **Involve the affected groups in the decision.** Not as a courtesy and not as a checkbox, but because the groups being scored know which outputs are absurd, and that knowledge is data. Community oversight bodies have surfaced harms no audit found.
- **Test after deployment, on real traffic.** Pre-deployment tests will not find the distribution shift that matters. The first weeks of production are where the real failures appear.
- **Design for refusal.** A system that can say "this case is outside what I can assess" is safer than one that always produces a number.
- **Give people a route to contest.** An automated decision a person cannot challenge is a different institution, whatever its accuracy.

## Where it goes wrong in practice

**Proxies recede.** Organizations that remove an explicit protected attribute rarely remove the disparity, because the information is present in postcode, name, education history, purchase patterns and device type. This is well documented across sectors. It is why a fairness review that asks only about the model card's feature list is not a fairness review.

**The most oppressed group is the loudest proxy.** There is a documented pattern where a system's protected-attribute handling effectively elevates one marginalised group over another. Any fairness intervention must ask which groups it is prioritising, not only whether it is prioritising anyone.

**Benchmarks reward demographic parity over impact.** A system that is equally inaccurate for everyone is arguably fair by the standard metric and useless in practice. Equal failure is not a good outcome; it is a symmetric one.

**Deployed and forgotten.** Many governance failures are not failures of design but of maintenance. A model that passed review three years ago, whose data distribution has since shifted, is still in production and nobody is watching it.

**The model was never the problem.** Sometimes the discriminating process was fully manual and the model simply codified it, making the discrimination faster and harder to see. This is not a reason to avoid automation. It is a reason to be clear about what automation is for.

## The responsibility question

The most consequential thing about deploying an AI decision system in a domain that affects people's lives is that responsibility can diffuse. The developer wrote the model. The data team prepared the inputs. The vendor supplies the software. The manager approved deployment. The frontline staff follow the output. Everyone did their job and no one is accountable for the outcome.

That is a governance failure, not a technical one, and it is why the most useful requirements are procedural: name the accountable person, require a documented reason for every decision that affects an individual, keep the decision log, and give the affected person the information and the appeal.

## The summary

Algorithmic bias is not a mysterious property of models. It is the expected output of optimising a chosen objective on data that records an unequal world, deployed in a context that may not resemble the training data, inside a process with diffused responsibility.

The interventions that work are mostly not technical. They are: choosing better objectives, measuring every subgroup, keeping humans accountable for decisions, involving affected communities, and monitoring after deployment. None of these is expensive compared to the harm they prevent, and all of them are harder than training a model.
