---
number: 4
title: How Machines See — Computer Vision and the Rise of Deep Features
description: A camera produces a grid of numbers. Turning that grid into "a cat" took seventy years of hand-written rules, then about eight years of learning. This is the story of how computer vision crossed that line, and where it still fails.
category: Foundations
tags: [computer vision, image recognition, convolutional networks, object detection, transformers]
date: 2024-02-05
slug: how-machines-see
---

A modern phone takes a photograph and, within a few milliseconds, knows there are three faces, that one of them is smiling, that a bicycle is behind them, and roughly where each object is in space. None of that comes from a camera. It comes from a stack of statistical ideas that arrived surprisingly recently.

## The long, rule-based failure

For decades, computer vision worked the way software always works: a programmer specifies what to look for. The recipe for finding an edge was written down by hand — compute brightness gradients across the image, threshold them, connect neighbouring edge pixels into contours, and look for shapes with eight sides and a certain ratio of corner to edge.

This worked impressively for a narrow world of clean, frontal, well-lit objects. It failed on the messy parts of the real world: a cat in shadow, a car seen from behind, a face at an angle. Each new case needed a new rule, and the rules interacted in ways nobody could predict. By the late 2000s, hand-written vision systems were widely regarded as a dead end for anything but controlled environments.

The insight that broke the deadlock came from an unexpected direction: instead of specifying *what* an edge is, learn *what is useful*, and let the useful things emerge.

## Feature learning

A **feature** is a small pattern a system can detect. Early systems used features like "has an edge here" and "has a corner there". Deep learning replaced the designer's guesswork with a search: train a network on labelled images and let it discover which features reduce error. The result is that useful features appear in a consistent order, and the order turns out to be close to universal across vision problems:

- Early layers respond to edges and colour blobs.
- Middle layers respond to textures, corners, simple curves.
- Deeper layers respond to combinations: eyes, wheels, windows, letters.
- The final layers respond to whole objects and to categories.

Because those middle features are learned rather than designed, they transfer. A network trained to classify photographs on a large public dataset can be reused almost directly for detecting objects, estimating depth, or generating captions, even though it was never told to do any of those things.

> The core trick of deep learning is not that the network is deep. It is that nobody had to say what to look for.

## Convolution and why it works

Image networks use an operation called **convolution**: a small window slides across the image, and at each position the same few numbers are multiplied and summed. Then a squashing function is applied, exactly as in [Neural Networks from Scratch ](03-neural-networks-from-scratch.html).

Two properties of convolution explain why it works so well on images:

- **Parameter sharing.** The same filter is reused at every position, so detecting a horizontal edge costs one set of numbers regardless of image size, and a layer has very few parameters.
- **Translation structure.** Because the filter slides, a feature detected on the left of the image is detected on the right too. The network starts out with a built-in assumption that the world does not change meaning when you move the camera slightly.

Stacking convolutions composes these local operations into a receptive field that can span the whole image, which is how a network ends up recognising a face from pixels.

## What modern vision systems actually do

Convolutional networks made the field work, but they have largely been joined or replaced by the transformer, described in [The Transformer Architecture ](06-the-transformer-architecture.html). The change is about what a layer attends to. A convolution looks at a fixed small neighbourhood. An attention layer can look anywhere in the image at once, and weighs how much each position matters for the position being decided. That is a much better fit for images, where the relationship between two pixels can be global and semantic: the part of the image that is a dog's nose matters because of what is near it, and "near" can be anywhere in the frame.

Modern vision systems fall into recognisable categories:

- **Classification** assigns one label to an image. Still used, less often than it was.
- **Object detection** finds and boxes multiple objects. This is what runs on your phone.
- **Segmentation** labels every pixel — the shape of a road, a tumour boundary, a field boundary on a satellite image.
- **Depth and 3D** infer geometry from one or more images.
- **Generation** synthesises images from text or from other images, which is where the last few years of visible progress have happened.
- **Video** extends every one of the above across time, adding motion and continuity as new sources of evidence.

## The benchmark trap

Image classification research ran on a famous dataset of labelled photographs, and for years the headline number improved steadily, inching from roughly 74% to above 90%. Then someone looked more carefully and found a substantial fraction of the images were mislabelled, and that a well-tuned conventional method trained on the corrected labels could already beat the best deep networks.

The lesson generalises well beyond vision: as a benchmark saturates, the measurement becomes the thing being optimised rather than the thing being measured. Progress continues to be real, but reported progress becomes unreliable first, and the community's best defence is building better tests rather than better models. [Evaluating AI ](09-evaluating-ai.html) takes this apart in detail.

## Where it still goes wrong

Vision systems are unusually confident and unusually wrong, and the reasons are structural rather than accidental.

**Lighting and material.** Cameras struggle with reflective surfaces, transparent objects, fine repeating patterns such as chain-link fences and grass, and extremes of brightness. Depth sensors struggle with dark textures and sunlit surfaces in the same scene.

**Unusual viewpoints.** Systems trained on photographs generalise poorly to drawings, paintings, thermal images, or an object seen from below.

**Rare classes.** Detection improves steadily for common objects and barely moves for the long tail — a traffic cone for cyclists, a specific aircraft model, a rare bird species. Under-represented categories stay under-represented because there was never enough data.

**Weak supervision.** Videos of people sorting objects into boxes are treated as free labels, and they are subtly wrong: the person moves the object most they handle last, but the label may be applied to everything they touched. Small systematic label errors, trained at scale, produce systems that are confidently and consistently slightly wrong.

**Physical and social context.** A medical imaging model trained on one hospital's scanner will often not transfer to another. A pedestrian detector trained on daytime street footage often misses night-time footage, and a system used for surveillance that performs badly on a demographic group is a fairness problem, not a curiosity. See [Bias, Fairness and Harm ](20-bias-fairness-and-harm.html).

## What to take away

Computer vision progressed when the field stopped specifying features and started learning them. That change is general — it happened in speech, in text, in protein structure and in code — and it is the single most important structural fact about modern AI.

It is also the reason to distrust a confidence score. A vision system that is 95% accurate on average can be 40% accurate on the slice of inputs that matters to you, and no part of the system knows which slice that is. That is not a bug awaiting a fix; it is a property of a system that learned from a distribution of examples rather than from an understanding of the thing.
