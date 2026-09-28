---
number: 25
title: The Open Weights Movement — Models You Can Run Yourself
description: Making a model's weights available is not the same as making it open source, and the difference is substantive. An account of the open weights ecosystem, what it enables, and what it does not solve.
category: Open Source
tags: [open source, open weights, self-hosting, community, reproducibility]
date: 2024-07-01
slug: the-open-weights-movement
---

For most of the history of computing, the interesting thing about a piece of software is that you can run it yourself. That property is currently unusual at the frontier of AI, and the movement working to restore it is one of the most consequential developments in the field.

This article is about what open weights actually is, what it is good for, and — as importantly — what it does not solve.

## The distinction that matters

**Open source** has a settled meaning in software, and it is mostly about rights: you may use, study, modify and redistribute the software under conditions that protect the commons. Nothing in it requires you to publish your work.

**Open weights** means a trained model's parameters are published and may be downloaded. The licence may or may not grant modification and redistribution rights; many do not.

This is a real distinction, not pedantry. A model published under a licence that permits use and redistribution but forbids commercial deployment is not open source. A model published with a full open-source licence is. The term most people mean when they say "open source AI" is usually open weights, and the vocabulary gap causes a surprising amount of unproductive argument.

The practical point is the one made in [Making Models Smaller and Faster ](10-making-models-smaller-and-faster.html): a published weight set can be **quantised, compressed and run on hardware the publisher never intended**. A 4-bit version of a 70-billion-parameter model runs on a single consumer GPU. That is the capability that matters, and it is available to anyone who downloads the file.

## Why the ecosystem emerged

The argument for open weights is not primarily ideological. It is mostly about concentration.

- **Research independence.** Academic groups and small companies can build on frontier-adjacent capability without a dependency on a commercial API that can change price, rate-limit, or deprecate.
- **Reproducibility.** A result that requires a proprietary API cannot be reproduced if the API changes. A great deal of published research has become unreproducible for exactly this reason, and it is a serious problem for a field that prides itself on empiricism.
- **Sovereignty and privacy.** Data that never leaves your infrastructure is a genuinely different category for healthcare, government, defence and legal work.
- **Customisation.** Fine-tuning, quantisation, distillation and domain adaptation all require weights, not an endpoint.
- **Competitive pressure.** Open availability caps the pricing power of closed providers and pushes the whole market toward lower cost. The price declines of recent years are partly attributable to the existence of good open models, which makes the answer to "what happens if nobody releases weights" — a world of proprietary, expensive, concentrated capability — economically unattractive.
- **Inspection.** Weights can be studied. Whether this yields much safety benefit is contested, and it is covered in [AI Safety and Alignment ](19-ai-safety-and-alignment.html).

## What it actually enables

**Local capability.** A capable model on hardware you own, with no per-token cost, no rate limits, no data leaving the machine. This is already the normal configuration for a large and growing community of developers, researchers, and organisations with data they cannot send to a third party.

**Real fine-tuning.** Domain adaptation, instruction tuning for a specific workflow, and stylisation. The organisations that have done the best work in a niche domain have mostly done it this way, on top of an open base.

**Distillation at scale.** A capable open model is a teacher. Students trained from it inherit a meaningful fraction of the capability at a fraction of the cost, which is the core mechanism by which good capability becomes cheap and widespread. See [Fine-Tuning and Alignment ](13-fine-tuning-rlhf-and-alignment.html).

**Research that could not otherwise happen.** Mechanistic interpretability, safety evaluation, bias analysis, and adversarial research all require being able to run a model and change it. An ecosystem with weight access is an ecosystem where this research exists.

**A defence against dependency.** If a provider raises prices or changes terms, the fallback is running your own. This is a real option value, and its existence is worth something even to people who never use it.

## What it does not solve

This is where the advocacy gets ahead of the reality.

**Capability and safety are not the same axis.** An open model can be just as capable as a closed one and much less safe, and the actual published safety work on open models is a small fraction of what has been done on closed ones. A weight release with no evaluation, no red-teaming and no documented limitations is a capability release, and treating it as an open-science release is a category error.

**Weights are not a research programme.** Open weights let you *use and modify* a model. They do not tell you why it works, what it will do in an unfamiliar situation, or what capability is dormant. The understanding deficit is unaffected by parameter access, and it is the deeper scientific problem.

**Open models are not the same as open everything.** Training data, training code, environment and evaluation are frequently not released, and the training run itself is unreproducible even when the weights are available. A model is a result, not a method. Reproducibility at the level of "we got these weights" is not reproducibility at the level of "we know how this capability arises".

**Availability does not equal accessibility.** A 70-billion-parameter model needs hardware that a hospital or a school does not have. The community that can run open models is heavily weighted toward well-funded individuals and companies — though this gap is closing fast as quantisation improves and smaller models get better.

**Governance problems do not disappear.** A harmful use that is hard to attribute to a closed provider is easier to attribute when a specific model was downloaded by a specific person. This cuts both ways: accountability improves, and so does the ability to cause harm at scale.

**The best models are not open.** The frontier is not where open models are, and the gap is a matter of deliberate policy by the organisations that can afford to train them. Open availability historically follows capability by a few years, with a lag that has been narrowing.

## Licensing, and the argument that decides it

The practical tension is between the licence that maximises adoption and the licence that protects against harmful uses. Use-based restrictions are difficult to enforce and easy to circumvent; weight-level restrictions require distributing a different artefact, which defeats the purpose; and a licence that is too restrictive is simply not open.

The emerging pattern, unsatisfactory to everyone, is that major open releases use permissive licences with use-based exceptions for a narrow set of clearly harmful applications, accepting that enforcement is nominal. Whether that is enough is a genuinely open question, and it is being answered by practice rather than by argument.

## Where it is going

Three trends are worth watching, and each has a clear policy implication.

**Small models get genuinely good.** The most important development for access is not that open models match the frontier — it is that a 7-billion-parameter model running on a laptop is now competent for real work. The gap between frontier and accessible has narrowed more than the discourse suggests.

**Capability concentrates at the top while deployment spreads.** Training is a capital-intensive activity with increasing returns; inference is becoming a commodity. The likely steady state is a few organisations training frontier models and a very long tail of capable models in the middle, with the value migrating to application, distribution and data.

**Provenance and standards emerge as the real problem.** When many capable models exist, the coordination question is not "should this model be released" but "what do we require of whoever deploys one". Content credentials, incident reporting for serious harm, and disclosure duties in specific high-risk domains are policy ideas that are increasingly on the table, and they are more tractable than arguments about model releases.

## The recommendation

For an organisation deciding what to do: **treat open weights as an option to be exercised, not a movement to be joined.** Download a capable model, run it locally for the workloads where data sensitivity or cost justify it, keep a closed API in the mix for the hardest problems, and never put yourself in a position where the provider's next pricing announcement is a strategic emergency.

And for anyone arguing about this: the interesting questions are not whether open or closed is right in the abstract. They are which capabilities to hold back, on what evidence, decided by whom, reviewed how often. Every position in the debate is really a position on that question.
