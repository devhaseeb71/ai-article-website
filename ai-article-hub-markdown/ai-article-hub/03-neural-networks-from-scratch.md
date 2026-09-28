---
number: 3
title: Neural Networks from Scratch — Weights, Biases and Activation
description: A neural network is a multiplication and an addition, repeated ten billion times, plus a rule for learning by blame. Here is the whole idea with no mystification and one worked example you can follow by hand.
category: Foundations
tags: [neural networks, deep learning, weights, gradients, backpropagation]
date: 2024-01-29
slug: neural-networks-from-scratch
---

Every neural network in production, from a spam filter to a language model with a trillion parameters, is the same three-step machine: multiply some numbers, add some numbers, and adjust the multiplication results when the answer comes out wrong. The complications are entirely in scale, engineering and taste.

This article builds the machine from nothing. No prerequisites beyond arithmetic, and no code longer than a dozen lines.

## A single neuron

Take two inputs, `x` and `y`. A neuron holds two numbers of its own, a **weight** and a **bias**. It multiplies each input by its matching weight, adds the bias, and runs the result through a squashing function called the **activation function**:

```
output = activation(w1 * x + w2 * y + b)
```

That is the whole idea. If you change `w1`, that input matters more to the final answer. Change `b` and the neuron becomes more eager to fire regardless of input.

An activation function is usually something small and non-linear, such as the sigmoid, which squashes any number into the range zero to one, or the ReLU, which passes positive numbers through and clamps negative ones to zero. The squashing matters for a reason that is easy to miss: a stack of purely linear operations is still one big linear operation, and a linear map cannot express curves. Layers of linear functions collapse into a single linear function. The activation is what buys you the ability to represent non-linear shapes — the bends, edges and thresholds that make recognition possible at all.

## Where the weights come from

The remarkable fact is that nobody designs these numbers. They are initialised at random and then learned.

Imagine you want the network to predict house prices. You take a house, predict a price, compare it to the real price, and then work out which weight contributed most to the mistake. You nudge every weight slightly — the ones that made the prediction too high go down a bit, the ones that made it too low go up. Then you do it again, for the next house, and the next, tens of millions of times.

The weights are therefore not knowledge; they are a compressed record of a very long sequence of small corrections. This is why a model is a function of its training data in a much deeper sense than the phrase usually implies: delete some of the data and you get a genuinely different model, not a slightly worse copy.

## Working an example by hand

Build a tiny network to predict whether a student passes, from hours studied and hours slept.

- Input `x` = 5 hours studied, `y` = 6 hours slept.
- Hidden neuron: `w1 = 0.4`, `w2 = 0.1`, `b = -0.6`.
- Output neuron: `w3 = 2.0`, `b4 = 0.25`.
- Sigmoid as the activation.

Step one, hidden neuron:

```
z = 0.4*5 + 0.1*6 - 0.6 = 2.0 + 0.6 - 0.6 = 2.0
h = sigmoid(2.0) = 1 / (1 + e^-2) = 0.8808
```

Step two, output neuron, where the hidden value `h` is now one of the output layer's two inputs, alongside the raw hours studied:

```
z = 2.0 * 5 + 2.0 * 0.8808 + 0.25 = 10 + 1.76 + 0.25 = 12.01
p = sigmoid(12.01) = 0.9994
```

The network says: pass, with near certainty. Now suppose the real answer is a fail. The error is `0.9994 - 0 = 0.9994`, and the correction has to be pushed backwards through both layers.

Notice the shape of the computation. Forward: multiply, add, squash. Backward: measure the error, work out how much each number contributed, subtract a share of the error from it. Everything else in deep learning is engineering around this loop.

## Backpropagation is blame assignment

The step that made multi-layer networks trainable is called **backpropagation**, and it is a chain rule applied a thousand times.

Each weight's contribution to the final error is its *partial derivative* of that error with respect to that weight. A large derivative means "changing this number changes the answer a lot", so it deserves a large correction. A derivative near zero means the weight barely matters, so leave it alone.

The algorithm applies the chain rule from the output backwards through the hidden layers, multiplying gradients as it goes. This is why the method is sometimes described as blame assignment: after a wrong answer, the network works out which of its ten billion numbers are responsible, proportionally, and adjusts them.

Computing this efficiently has one important consequence: gradients are calculated for all weights at once, in matrix operations, on the graphics processors that were built for exactly this kind of arithmetic. A single training step on a large model touches trillions of floating-point numbers. The mathematics is thirty years old; the ability to run it is a hardware story.

## Why depth helps

A single layer can only carve the input space with straight lines. Two layers can carve with bent lines. Each additional layer composes the previous one's transformations, so the decision boundary gains another level of complexity. With enough layers the network can build simple features and then assemble those features into complicated ones: edges into textures, textures into parts, parts into objects.

This is the real meaning behind "deep" learning — not that the idea is profound, but that the composition is many layers deep, and each layer's simple operation combines with the last to represent something intricate.

> The expressive power comes from composition, and the engineering cost comes from the same place.

## Why networks need help to learn

Two problems show up immediately in practice.

**Vanishing and exploding gradients.** Backpropagation multiplies gradients as it travels. Through many layers they can shrink to nothing — a deep network then stops learning, because the early layers receive no useful signal. Or they can grow, and the weights explode into nonsense. Normalisation layers, careful initialisation and gradient clipping are the standard three defences. Residual connections, which let a layer pass its input straight through and add a learned correction on top, were the innovation that made very deep networks trainable at all.

**Overfitting.** A network with enough capacity can memorise its training examples perfectly, including their noise. Its training accuracy climbs to 100% while real-world performance gets worse. The countermeasures are the ordinary ones: hold data out, regularise weights, add noise, augment data, and stop early. Most of the practical art of machine learning is the judgement about how much to learn and when to stop.

## The compact summary

- A neuron multiplies inputs by weights, adds a bias, and squashes the result.
- Nothing is designed by hand; the weights are discovered by trial and correction.
- Backpropagation measures how much each weight contributed to the error and corrects it in proportion.
- Non-linear activation functions make layered composition expressive.
- Depth buys expressiveness, and pays for it in memory, compute and training difficulty.

With this in place, the next question is where the millions of these neurons get their raw material — which is the subject of [Data, the Raw Material of AI ](08-data-the-raw-material-of-ai.html) — and how the most successful layer arrangement of all is put together in [The Transformer Architecture ](06-the-transformer-architecture.html).
