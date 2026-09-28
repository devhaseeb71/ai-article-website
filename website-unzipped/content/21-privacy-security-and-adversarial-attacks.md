---
number: 21
title: Privacy, Security and Adversarial Attacks
description: These systems learn from data, which makes them a privacy risk and a target. A tour of memorisation, extraction, poisoning, prompt injection and the attacks that work because the technology is statistical.
category: Ethics
tags: [privacy, security, adversarial, prompt injection, poisoning, memorisation]
date: 2024-06-03
slug: privacy-security-and-adversarial-attacks
---

Two facts about modern AI create most of its security and privacy problems. It learns from large amounts of data, some of it personal. And it is statistical, not logical, so it has no notion of what it must never say.

Those two facts generate a long and specific list of vulnerabilities. Most of them are understood, and most of them have partial mitigations.

## Privacy: what models remember

**Training data memorisation.** A sufficiently large model, trained on data that contains an unusual string, can reproduce that string when prompted. This is demonstrated, reproducible, and the reason models have been found to emit phone numbers, addresses and passages of copyrighted text verbatim.

The severity depends on configuration. Smaller models and shorter training runs memorise less; heavy repetition in the data increases it; and deduplication is effective. Whether a given string is memorised is essentially untestable in advance, which is the practical problem: you cannot audit a model's memorisation without attempting extraction at scale.

**Membership inference.** If a specific record was in the training set, the model's behaviour on inputs related to it differs measurably from its behaviour on identical inputs that were not. This turns a model into an oracle that leaks the contents of a database it was never supposed to expose, and it is attackable even against well-regularised models.

**Information leakage through prompts.** Anything placed in a prompt is available to the model's processing and can, under the right conditions, be induced to come back out. Two implications follow directly: never put secrets in a prompt, and treat prompt contents as potentially exfiltratable by the model or by anything downstream of it.

**Training data provenance.** The privacy question is downstream of the collection question. [Data, the Raw Material of AI ](08-data-the-raw-material-of-ai.html) covers what is collected, from whom, on what basis — and the answer determines how much of this section applies to you.

## Extraction and inference attacks

**Model extraction** reproduces a commercial model by querying it systematically. If a provider's terms forbid it, the attack is legal grey; if not, it is trivially done, and it moves capability from a licensed service to a local copy.

**Membership and attribute inference** ask what a model can be made to reveal about its training data. Both are practical attacks against deployed models, and both are why "the data is not in the output" is not a sufficient privacy control.

**Data poisoning** inserts malicious examples into the training corpus. Because training corpora are assembled by automated web-scale pipelines, an attacker who can get content indexed can influence the model. Targeted poisoning — making a specific false association — is documented in the literature. Broad poisoning, at a scale sufficient to destabilise training, remains largely theoretical because the required volume is enormous.

**Backdoors and triggers** is the sharper version: a small number of planted examples teaches a model a hidden behaviour, activated by a specific input pattern that no one else detects. This is the attack with the highest ratio of demonstrated capability to required effort, and it is the reason untrusted data in a training pipeline is a genuine supply-chain risk.

## Attacks that work because the model is statistical

**Adversarial examples** are inputs crafted so that a model is confidently wrong. A small, human-imperceptible perturbation to an image flips a classifier from 95% to under 20% confidence. These are not implementation bugs; they reflect a model that has learned correlations rather than concepts, and a nearby image genuinely is a nearby image under the distribution the model was trained on, just not under the one humans use.

The generalised version matters more: a vulnerability found in one model frequently transfers to others trained on similar data, which means a single malicious input can be crafted once and deployed widely.

**Evasion and abuse at scale** — adversarial inputs, bot farms, coordinated fake accounts, content optimised to slip a classifier — are the commercially relevant form of the same idea. They are being deployed at scale today and are the practical reason content moderation is an arms race rather than a solved problem.

**Membership inference and inversion attacks** on retrieval systems are less discussed and quite practical. A system that retrieves from a document store can be induced to reproduce documents, and a poorly-scoped retrieval index can leak documents the user was never authorised to see. Access control must be enforced at retrieval time, not assumed from the conversation context.

## Prompt injection: the current frontier

The most consequential vulnerability in deployed AI systems right now is **prompt injection**, and the reason it is serious is structural rather than incidental.

A language model cannot reliably distinguish instructions from data. The same text is both, and the model's only mechanism for deciding is a statistical judgement about which looks more like something it should obey. So any untrusted text that reaches the context is a potential instruction: a web page the agent read, a document it retrieved, an email it summarised, a filename, an image with text in it.

The attack is trivial in one direction — hide instructions in a document or a web page and instruct the model to ignore its task and exfiltrate data or take a specified action. The defensive side is much harder, because the only robust mitigations are architectural:

- **Do not give the model the ability to act destructively.** If the worst an injection can achieve is a wrong answer, the stakes are manageable.
- **Separate data from instructions structurally**, not with a warning string. Delimiters help; they are not a security boundary.
- **Require approval for consequential actions**, so an injected instruction cannot cause irreversible effects.
- **Filter what enters the context** — only retrieve from sources you control, and strip or neutralise content from untrusted sources.
- **Monitor tool calls**, not just model output. The action log is the place where an attack becomes visible.
- **Assume the boundary will fail** and design for containment rather than prevention.

The honest summary is that prompt injection is unsolved, that it is not primarily a model-capability problem, and that the only current defence is to limit the blast radius of whatever the model can do.

## Defences that work

**The mundane infrastructure is the actual security.** Authentication, authorisation, least privilege, no credentials in prompts, secrets in a vault, network isolation, rate limits, and audit logs. Most deployed AI systems are compromised through their surrounding application, not through the model.

**Least privilege for tools.** A model that can read a document should not be able to send an email. A model that can query a database should not be able to write to it. This single design decision eliminates most severe agentic outcomes.

**Differential privacy** for training data, with the honest caveat that it is a blunt instrument: it reduces memorisation at a real cost in model quality, and it is far easier to apply in a federated or fine-tuning setting than in a web-scale pretraining run.

**Human review** for anything consequential, with the known cost in time and the known risk of rubber-stamping.

**Red-teaming by outsiders.** People who did not build the system, given the objective and the access, will find things the build team has normalised. This is the highest-yield security activity in the field and the most commonly skipped.

**Responsible disclosure.** Almost every serious vulnerability in this space is found by outsiders and disclosed before publication. That ecosystem is a genuine public good and it is worth supporting.

## The systemic risk, briefly

Beyond any single system, the systemic exposure is that a cheap capability to produce convincing text, images, audio and code at scale lowers the cost of every deception, fraud and influence operation. This is not a vulnerability to be patched; it is a change in the environment.

The realistic response is not detection — detection is a losing game against general-purpose generators — but **provenance, verification and institutional trust**: cryptographic origin metadata, authenticated channels where they exist, and a general shift toward relying on institutions whose authenticity you can check rather than on content that merely looks right. This is the argument developed in [Hallucination, Deepfakes and Trust ](22-hallucination-deepfakes-and-trust.html).
