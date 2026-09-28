---
number: 23
title: AI and the Law — Regulation, Liability and Intellectual Property
description: The law is responding to AI in three places at once: new statutes, existing liability regimes applied to new facts, and a copyright framework that was not built for generated material. A survey of how unsettled all of it is.
category: Society
tags: [law, regulation, liability, copyright, policy, compliance]
date: 2024-06-17
slug: ai-and-the-law
---

Legal systems are responding to AI in three distinct ways at once, and confusing them produces bad analysis.

**New rules are being written** — the EU AI Act, various national statutes, sectoral regulation, procurement requirements, and a growing body of administrative guidance.

**Existing rules are being applied to new facts** — consumer protection, product liability, employment discrimination, professional negligence, data protection and contract law all already have answers that apply whether or not a model was involved.

**The intellectual property framework is genuinely broken**, because it was designed for human authors and human authorship is what a copyright grant requires.

This article surveys all three, without pretending the answers are settled where they are not.

## The regulatory approach that is winning

The most influential new frameworks share a structure: **risk-tiered obligations**.

The core design is remarkably consistent. Systems are placed in tiers by what they do, and obligations scale with the consequence of failure.

- **Unacceptable risk** — banned. Social scoring by governments, untargeted facial image scraping, certain manipulative techniques, emotion recognition in the workplace and in schools.
- **High risk** — permitted subject to heavy obligations: risk management, data governance, technical documentation, logging, human oversight, accuracy and robustness requirements, conformity assessment, and in some cases registration.
- **Limited risk** — transparency only: tell people they are interacting with a machine, and label synthetic content.
- **Minimal risk** — unregulated, which is most of the economy.

What matters for anyone building or deploying a system is that the trigger is usually the **intended purpose**, not the technology. The same model is unregulated in one deployment and high-risk in another. The practical consequence is that compliance is a property of a deployment, and the question "is this model compliant" is almost always the wrong question.

Three further design choices are worth tracking because they are likely to propagate:

- **Product regulation over process regulation.** The trend is away from rules about how a model was built toward rules about what a deployed system must do. The EU's approach is to regulate the provider and, in some cases, the deployer.
- **General-purpose model obligations at the layer of capability** — documentation, copyright policy, training content summaries — rather than at the application layer.
- **Procurement as a regulatory tool.** Governments do not need to regulate every application if they cannot buy the bad ones. Procurement standards travel faster than statute, and this is currently the highest-leverage lever available to a regulator.

## Liability: mostly existing law, applied

The most consequential thing about AI liability is that it mostly *already exists*. A firm that uses a model to make a credit decision and produces a discriminatory outcome is subject to the same anti-discrimination law that applied before. A hospital whose diagnostic system misses a finding is subject to medical negligence law. A consumer misled by a generated description is subject to consumer protection law.

The genuinely new questions are narrower than the headlines suggest:

- **Which party is responsible** — model provider, system integrator, deployer, or the professional who relied on the output? The emerging answer is a chain, with the party best placed to prevent the harm bearing it. That is the test: who could have known, and who could have done something?
- **Is this a product or a service?** Product liability regimes generally require a defect, and the question of whether a statistical system can be defective is unresolved. Most existing claims are likely to be brought in negligence, which does not require the product framing.
- **What about output as a cause of downstream harm** — a generated message that defames someone, an answer that misstates a deadline, generated code with a security hole? These are handled by ordinary tort and contract principles, applied to a new kind of fact.
- **Do the professional's duties change?** In medicine, law, accounting and engineering, the standard of care is not "never use AI" — it is a duty of competence, verification and disclosure that now includes these tools. Regulators in several jurisdictions have begun saying this explicitly, and it is the most consequential change for practitioners.

**A recurring theme:** most frameworks impose a duty of *human oversight* that is trivially satisfied by a human clicking approve and substantially undermined by it. Oversight that is a formality is worse than no oversight, because it generates a paper trail of accountability for a process with none. Oversight has to mean the human has the information, the time, the authority and the competence to override the system.

## Intellectual property: the hardest part

Three separate questions, routinely conflated.

**Is training on copyrighted works infringement or fair use?** In the United States, the argument for fair use rests on the transformative nature of training, the non-substitutive nature of the resulting model, and the public benefit of the technology. The argument against rests on market harm and on the fact that enormous commercial value was derived from unlicensed copying. Courts are only beginning to address this, and outcomes are jurisdiction-specific. In much of Europe and East Asia the analysis is a text-and-data-mining exception with conditions rather than a general doctrine, which is a different and more settled question.

**Who owns the output?** In the United States, the Copyright Office's position is that purely AI-generated material without sufficient human authorship is not protectable, and that the question is whether a human contributed enough expressive control. A prompt is generally not enough; a human who selects, arranges and materially modifies output may have a claim in the result. This creates a real and immediate business risk: a company generating brand assets with minimal human direction may find that competitors can copy them, and the company that used the tool has no protection at all. Nothing in the technical product warns you about this.

**Can AI-generated material infringe?** Yes, and this is the most concrete of the three questions. If an output reproduces a protected work or a recognisable protected character, the creator of the output is exposed regardless of how the output was made. "The computer did it" is not a defence. The practical implication is that brands, publishers and anyone with distinctive stylised assets have a real reason to care about provenance in generation.

There is also a small, stable and legitimate market here: rights holders licensing material for training, and generated material whose ownership terms are explicitly settled in advance. Both depend on contracts rather than on the statute.

## Data protection

The familiar regimes apply with little modification. Personal data in a training set raises lawful-basis questions; a subject access request raises hard questions about what was in a model's weights; automated decision-making rules require a real human role and sometimes contestability; and a cross-border transfer analysis is required if inference happens elsewhere.

The pattern worth noting: privacy law is *not* lagging AI law. It is being applied competently, and the binding constraint on many deployments is data protection rather than the AI-specific statute. Organisations that read the AI Act carefully and the data protection act casually will get it wrong.

## Compliance that works

For anyone building or buying a system, a defensible practice is:

- [ ] **Classify the deployment by intended purpose**, not by model. Document the classification and the reasoning.
- [ ] **Map the data**: what is collected, on what basis, from whom, with what retention and deletion story.
- [ ] **Run a discrimination review** on the actual decision outputs, by slice, and keep the results.
- [ ] **Define human oversight operationally**: who reviews what, with what information, on what timescale, and with what authority to override.
- [ ] **Disclose AI use** to affected people in a way they can act on.
- [ ] **Log everything** — inputs, outputs, versions, decisions — for a period that exceeds the limitation period for any likely claim.
- [ ] **Write the vendor terms carefully**: who indemnifies what, who is liable for which harm, what disclosure obligations each party has, and what happens to your data and your logs on termination.
- [ ] **Test prompt injection and data exfiltration** as part of acceptance, with an external party.
- [ ] **Check the jurisdiction of every user**, not just the location of the deployment.

## The more interesting point

Legal regimes are lagging on capabilities, roughly, by two to three years. But on **process and documentation** they are arguably ahead, and the pattern is consistent: what is regulated is not the algorithm, it is the *deployment* — its intended use, its data, its oversight, its transparency and its records.

That is why the organisations that will handle this well are the ones that were already doing disciplined change management for other compliance regimes. AI regulation is mostly demanding that you do what good practice already required, earlier, with more specificity, and while it still matters.
