---
number: 12
title: Agents and Tool Use — When AI Takes Action
description: A model that can call functions, read files, run code and browse the web can change things in the world. That capability changes the engineering, the economics and the risk profile at once.
category: Applied AI
tags: [agents, tool use, function calling, autonomy, code execution]
date: 2024-04-01
slug: agents-and-tool-use
---

The jump from "answers questions" to "does things" is the most consequential change in applied AI since the model itself. A chat assistant produces text. An agent decides on a sequence of actions, executes them against real systems, observes the results and decides what to do next. One produces information. The other produces effects.

That is a categorically different thing to be responsible for.

## What an agent is

An agent is a loop. It is worth drawing explicitly, because most of the difficulty is visible in the diagram:

```
goal -> model decides next action -> system executes action
     -> result returned to model -> model decides next action
     -> ... repeat until done, stuck, or out of budget
```

The model is the decision-maker. The surrounding system is responsible for everything else: which tools exist, what they are allowed to do, what they cost, what they see, when the loop stops, and who can stop it first.

**The crucial architectural point is that the loop is engineered, not emergent.** A dependable agent is not a clever prompt plus a loop. It is a harness with a decision-maker inside it, and almost all of the reliability comes from the harness.

## The tool layer

Tools are the agent's hands. Modern systems expose them as structured function definitions — a name, a description, and a parameter schema — that the model can choose to call.

Design decisions here dominate everything:

- **Few, coarse tools beat many, fine ones.** Twenty overlapping tools produce inconsistent selection. Ten well-separated ones do not.
- **Names and descriptions are documentation, and they are read by a model.** "search_orders(customer_id, status, since)" is a better tool than "query" with a paragraph of instructions inside it. This is documented, consistent across model families, and routinely ignored.
- **Return structured data, not prose.** An agent that gets a JSON object can branch on it. An agent that gets a sentence has to parse it.
- **Errors should be informative.** "Permission denied" is useless. "Permission denied — this account can read orders but not refunds; request access from the refunds team" lets the model recover or ask a human. A well-designed error is a recovery mechanism.
- **Every tool needs a blast radius.** A read-only tool and a tool that sends an email should not have the same approval level, and the difference should be enforced in code rather than in instructions.

## Where the reliability comes from

Agent demonstrations are impressive and hard to reproduce, because the same setup that works on a scripted path fails on a real one. The techniques that make agents dependable are mostly unglamorous:

- **Verify each step's output against its input expectation.** Not "did the tool return something" but "did it return the shape and the record count we needed".
- **Make state visible.** Agents fail by losing track. Explicitly pass a summary of what has been done, what is pending, and what the goal is, and update it every iteration.
- **Budget every resource.** Max steps, max tool calls, max tokens, max wall-clock time, maximum spend. An unbounded agent is an unbounded bill, and an agent that cannot stop is an incident.
- **Escalate early and cheaply.** When two attempts produce the same error, stop and ask a person. Continuing to retry a failing path burns money and produces confident nonsense.
- **Sandbox execution.** Code should run in a container or a locked-down environment with no credentials, a read-only filesystem by default, and no network unless the task needs one.
- **Require approval for irreversible actions.** Sending, publishing, deleting, spending, committing to an external system. The threshold should be about reversibility, not about confidence in the model.

> The most dangerous property of an agent is not that it is often wrong. It is that it is often wrong *and* that the wrongness is expressed as a series of individually reasonable steps.

## Coding agents are the strongest case

The reason agents have gone mainstream is that software development has an unusually good property: **it has a verifier**.

Code either compiles, passes its tests, or does not. The feedback arrives in seconds, is unambiguous, and is available without a human. An agent that writes a function, runs the test suite, reads the error and tries again is doing something close to a tight learning loop against ground truth.

This is why agents work well in development and less well in, say, customer support. In customer support, the correct action is a judgement about a person's situation, and there is no test suite for that. Wherever a domain has cheap, fast, objective feedback, agents improve. Wherever verification is slow, expensive or subjective, they stall.

The lesson generalises further than software: **the quality of an agent is bounded by the quality of the verification available in its environment.**

## Cost and latency

An agent multiplies cost by iteration count. A task that takes five model calls becomes fifty, and a failure that burns fifty calls burns them again on the retry. Three practical responses:

- **Cache aggressively.** Identical or near-identical steps are common, and caching turns a repeated failure into a fast failure.
- **Use the smallest model that works per step.** Routing simple decisions to a small model and reserving the frontier model for hard steps is the single biggest cost lever, and it changes the economics of long-horizon tasks by an order of magnitude.
- **Make the task smaller.** Many successful agent systems are not agents at all. If a prompt plus one tool call solves the problem, build that.

## Multi-agent systems

Letting several agents coordinate — a researcher, an implementer, a reviewer — is appealing and reliably harder than it sounds. The coordination protocol becomes the system, and it introduces new failure modes: duplicated work, contradictory conclusions, agents that agree because they share a model and a blind spot, and context loss at every hand-off.

The honest summary is that multi-agent architectures help when the sub-tasks are genuinely independent and the merge is mechanical. When the sub-tasks require shared context or judgement, one agent with good tools is usually better, and much easier to debug.

## A responsible deployment checklist

- [ ] Every action the system can take is enumerated, and the irreversible ones require human approval.
- [ ] Credentials are scoped to the minimum and held in a tool, never in a prompt.
- [ ] There is a hard kill switch that works without the model's cooperation.
- [ ] Loops are bounded in steps, time and money.
- [ ] Every action is logged with its inputs, outputs and the model state that caused it.
- [ ] The system has been tested against the ways it will be misused, by people who did not build it.
- [ ] The failure message to a human says what the system was trying to do, not just that it failed.

## The deeper shift

Tools and agents are what convert a language model from a *generating* system into a *acting* one. The safety consequences follow directly, and are covered in detail in [AI Safety and Alignment ](19-ai-safety-and-alignment.html) and [Privacy, Security and Adversarial Attacks ](21-privacy-security-and-adversarial-attacks.html). The governance consequences — liability for autonomous actions, disclosure duties, and who answers for a bad outcome — are covered in [AI and the Law ](23-ai-and-the-law.html).

The technical question of how to make agents reliable is being solved steadily. The harder question is what a society wants to delegate to systems that can act, and on what terms. That one is not technical at all.
