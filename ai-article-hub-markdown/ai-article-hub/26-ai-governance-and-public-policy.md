---
number: 26
title: AI Governance and Public Policy — Who Actually Decides
description: The most consequential decisions about AI are being made in procurement offices, standards bodies and courtrooms rather than legislatures. A map of where power sits, and what follows from that.
category: Policy
tags: [governance, policy, standards, procurement, institutions, public sector]
date: 2024-07-08
slug: ai-governance-and-public-policy
---

The most important governance decisions about AI are not being made by legislatures. They are being made by procurement officers, standards committees, platform trust-and-safety teams, insurance underwriters and courts.

This is not a failure of democracy, exactly. It is a description of where power has settled, and it has consequences worth understanding.

## The institutions that actually decide

**Procurement.** A government that buys software can refuse to buy unsafe software. This is the fastest-moving governance lever in the field, and it moves faster than statute, because a procurement standard can be written and applied in months and carries no legislative process. Procurement requirements about impact assessments, audit rights, data residency, transparency reporting and incident notification are now spreading through the public sector and into large corporate buying.

The weakness is obvious: a government can only refuse to buy what it buys. Much of AI in critical infrastructure is embedded in systems government does not procure, and the leverage does not reach there.

**Standards bodies.** Technical standards are not binding law, but they determine what is buildable, and they tend to become de facto requirements because compliance is the cheapest defence in litigation and procurement. Voluntary frameworks for risk management, transparency, content provenance and AI management systems are being written now. Whoever writes them will shape what every subsequent audit checks.

**Courts.** Increasingly, and by accident of jurisdiction, courts are setting the terms. Questions about training data legality, output ownership, liability for autonomous action, discrimination in automated decisions and the sufficiency of disclosure are being decided in specific cases, and the reasoning generalises. Litigation is slow, uneven and jurisdiction-bound, but it is a real source of law.

**Platforms.** The operator of a large platform decides what is distributed on it, which in practice means deciding what speech about AI is visible. This is unelected, and the delegation is unstable — it varies with commercial incentives and with which jurisdiction is pressuring hardest.

**Insurers.** Underwriters are quietly setting the price of AI risk, and therefore the threshold at which deployment is economic. A sector that cannot be insured does not deploy, and a sector that can be insured cheaply will deploy faster than its governance allows. Insurance is a governance instrument nobody planned for it to be.

**National security and defence establishments.** The most capable systems are developed under state or defence funding, with secrecy that makes independent oversight structurally difficult. The export-control question — who may build and sell frontier capability across borders — is a hard-power question with global consequences.

**Technical community norms.** Open weight releases, evaluation practice, incident disclosure and the deprecation of dangerous capabilities are all governed by norms rather than rules, maintained by a small number of organisations. The norms are genuinely influential and genuinely fragile.

## The policy instruments, ranked by leverage

**Procurement and standards** act immediately, apply to real deployments, and are written by people who have read the technical material. Their weakness is coverage.

**Disclosure and labelling requirements** — telling people they are interacting with a machine, labelling synthetic media, disclosing AI assistance in professional contexts — are cheap, enforceable and effective at the margin. They do not prevent harm; they preserve the human decision point, which is the thing that makes harm recoverable.

**Sector-specific regulation** — for medicine, finance, employment, education, critical infrastructure — works better than horizontal rules because the harms, the metrics and the existing regulators are already domain-specific. The competent existing regulator usually already has the powers it needs and has not yet used them.

**Liability and professional standards of care** are underrated. Making a practitioner accountable for relying on an unverified output changes behaviour faster and more durably than any prohibition, because it puts the incentive exactly where the decision is made.

**Compute and capability reporting** — requiring disclosure of large training runs, and of serious incidents, to a regulator — is among the least developed and potentially most consequential instrument available. Much of what is argued about online cannot be regulated because nobody can see it. Reporting requirements create the visibility, and visibility is a precondition for everything else.

**Export and compute controls** are the sharpest instrument and the most dangerous to get wrong, because they are the mechanism by which capability can be concentrated into fewer hands by accident rather than by decision.

**Safety case requirements** — a structured argument, submitted before deployment in a high-risk domain, explaining why the system is safe enough and what would change that assessment — are emerging in several frameworks. They are more demanding than a checklist and more effective, because they require the deployer to think rather than tick.

## The recurring design errors

Most policy failures in this field come from one of four mistakes.

**Writing technology-neutral rules that specify nothing.** "Systems should be transparent" is satisfied by publishing a document nobody reads. Regulation has to name the artefact, the actor, the obligation and the consequence.

**Regulating the model rather than the deployment.** The same model is benign in one context and high-risk in another. Rules that attach to a model attach to the wrong thing, and create the perverse incentive to avoid triggering classification.

**Requiring disclosure without changing any incentive.** Notices that nobody reads and labels that are ignored change nothing. Disclosure works when it is paired with a liability or a duty that follows from the disclosure.

**Writing rules before understanding the failure modes.** Policy drafted by people who have not read the technical material produces either paralysis or unfalsifiable obligations. The reliable sequence is: evaluate, publish evaluations, standardise metrics, then regulate against the metrics.

## The questions that get argued about most

**How much compute is significant?** Almost every reporting threshold depends on a number that is a policy choice, not a technical fact, and the thresholds are set to catch the systems that are already visible. A system trained with modest compute in a university lab can be a serious research artefact and will not be reported.

**What counts as general purpose?** The category boundary in most frameworks is vague, and vagueness is exploited.

**Who counts as a deployer?** Organisations integrating someone else's model are frequently not clear whether they are providers, deployers or neither, and the answer determines who is liable.

**Is a threshold-based regime better than a capability-based one?** Thresholds are enforceable and blunt. Capability-based regimes are precise and unenforceable. Most workable schemes use both: a bright line that is easy to check, plus a catch-all for anything above it.

**What about jurisdictions?** Fragmentation is costly for developers and can be exploited, but a single global regulator does not exist and is unlikely to. The realistic mechanisms are mutual recognition of evaluations, and a shared set of technical standards that does the harmonising work that law cannot.

## What good governance looks like

The characteristics of systems that work, drawn from the parts of the world where any part of this has worked:

- **It is close to the deployment.** Generic horizontal rules underperform specific requirements written by a regulator that knows the domain.
- **It is enforceable by people who can see the system.** A rule that cannot be checked has no effect.
- **It creates a learning loop.** Incident reporting, mandatory evaluation and transparency requirements are only worth having if the reports are read and change something.
- **It preserves a human decision point** where consequences are irreversible, and gives that person information, time and authority.
- **It treats documentation as the primary intervention.** Most harm is prevented by an organisation knowing what it built, on what data, with what limitations. A requirement to know is worth more than a requirement to be safe.
- **It is written to be revised.** Capabilities change on a scale that no statute matches. Sunset clauses, periodic review and the ability to amend quickly are not a weakness in the design.

## The one-sentence version

AI governance is being conducted mostly through procurement, standards, courts and professional liability rather than through legislation — and the highest-leverage policy work available to a government right now is not banning a technology, it is requiring organisations to know, document, evaluate and disclose what they are deploying.

That is unglamorous. It is also the intervention that most reliably prevents harm, and it is compatible with innovation, jurisdictionally portable, and already the standard practice of the organisations that get this right.
