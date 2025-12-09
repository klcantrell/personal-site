---
title: "Robot Foundation Models Are Not What I Was Expecting (I’m 5 Years Too Early)"
date: "2025-12-08T23:59:59.000Z"
slug: "robot-foundation-models-are-not-what-i-was-expecting"
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1765243686/robot-hiking-kalen-emsley-unsplash-photo_smjnmo.png"
  alt: "Robot on hike at a scenic lookout"
  caption: "Original photo by Kalen Emsley on Unsplash"
---

When Physical Intelligence [announced the π0 foundation model](https://www.physicalintelligence.company/blog/pi0), I thought a ChatGPT moment in robotics was near. Here was a model that could control different kinds of robots to perform a variety of dexterous tasks. It could fold clothes, make coffee, assemble cardboard boxes, and more. I thought we’d get another [post like swyx’s](https://www.latent.space/p/ai-engineer) signaling robotics as an emerging capability of the AI engineer. I thought “If I can build digital agents on top of language foundation models, those same skills will transfer to building physical agents on robot foundation models, right?”. Not quite.

Getting into AI for robotics still isn’t easy. The hardware is expensive, the tools are still maturing, and you need specialized knowledge in machine learning ([data curation](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset), [debugging model training issues](https://github.com/huggingface/lerobot/issues/2393)) and robotics ([knowledge of kinematics](https://github.com/huggingface/lerobot/issues/678)) to fill in the gaps. However, early signals point to robot models following the same trajectory as LLMs. I think in 5 years, working with robot models will be nearly as accessible as LLMs. For me, dealing with today’s rough edges is worth getting a taste of where AI for robotics—and potentially AI more broadly—is heading.

## Robot foundation models (2025) == LLMs (2018)

There are many parallels between how LLMs have progressed and how robot models are starting to progress. As I see it, robot models today are roughly where LLMs were in 2018, about 5 years before their breakout moment.

### Background

BERT and GPT-1 were the first LLMs, both introduced in 2018. With the release of GPT-3 in 2020, OpenAI tried to commercialize with their first ever product, the OpenAI API. It wasn’t until November 2022, 4.5 years after their first LLM, that OpenAI and AI as a whole got their big moment with ChatGPT. We know the rest of the story: we now have several model labs pushing forward the LLMs we all use and love today.

And now robot foundation models are starting to appear. Google DeepMind released RT-2 in 2023, the first vision-language-action model (VLA). In short, VLAs are LLMs that have been adapted into vision-language models (VLMs) that have been further adapted to output robot action tokens. You can read more about VLAs in the [RT-2 paper](https://arxiv.org/pdf/2307.15818) or listen to [Sergey Levine explain it to Dwarkesh](https://youtu.be/48pxVdmkMIE?t=1649).

Since RT-2, Physical Intelligence has released multiple VLA models with each one more general and robust than the last. Their [recent funding round](https://www.axios.com/2025/11/21/robots-physical-intelligence-ai) with a $5.6 billion valuation suggests that they may be early on the path toward becoming the "OpenAI of robotics". Google DeepMind, NVIDIA, and Hugging Face have also released VLAs in 2025.

### Where VLAs fall short

Even though state-of-the-art VLAs show a lot of promise, they still don’t have zero-shot capabilities with many kinds of robots across many kinds of tasks. In other words, they still require some amount of fine-tuning to be useful. This is in stark contrast to LLMs that can perform a wide variety of language tasks out-of-the-box and can easily adapt to new tasks with prompting. [This video](https://youtu.be/8dZUOo5xWFw?t=1008) goes deeper on what to expect from VLAs vs. LLMs.

And then there’s the question of whether VLAs are actually the breakthrough we need to make robots generally useful and accessible. Fei-Fei Li [published a manifesto](https://drfeifei.substack.com/p/from-words-to-worlds-spatial-intelligence) stating we need to go beyond today’s generative models to unlock general robotics and other use cases. Her company, World Labs, works on world models toward this end. Time will tell whether world models will help scale robotics to the point of democratization.

### Predictions

Considering how new VLAs and world models are, considering how difficult the physical world is to work with, and considering how much time it took LLMs to go from conception to widespread adoption, it’ll be years—five in my estimation—before we see enough progress here that would bring robotics to the broader developer community.

Although my timeline takes its cue from the LLM trajectory, it lines up pretty well with estimates from leading researchers. Yann LeCun says the next generation of AI that will actually understand the physical world could come in [3-5 years](https://youtu.be/4__gg83s_Do?t=787). Sergey Levine says [single-digit years](https://youtu.be/48pxVdmkMIE?t=300) is realistic for autonomous, generalist robots to be widely deployed in the world. Fei-Fei Li says [5 years is a fair guesstimate](https://youtu.be/9VcXiyE40xw?t=2053) for when world models will be capable enough to enable large-scale robot learning.

## Why now?

So why would I write about something that’s still 5 years away? Three things come to mind:

* It’s a great time to experiment with a technology that is clearly on its way. I have to think that at one point in time, people experimenting with GPT-2 or GPT-3 were thinking the same thing. The hardware is cheap enough, the tools mature enough, the models capable enough, and the community big enough to support developers interested in experimenting with AI for robotics now. More on the hardware, tools, and community in future posts.
* There are several companies already building products with this technology, showing its potential. 1X’s [Redwood model](https://www.1x.tech/discover/redwood-ai) is a VLA that controls NEO, their humanoid home robot. Cloud Chef is working on [building robot line cooks with robot foundation models](https://www.youtube.com/watch?v=t_MQ1Ms_Zp8&t=422s). Sunday Robotics’ [ACT-1 model](https://www.sunday.ai/journal/no-robot-data) is a foundation model that controls Memo, a wheeled home robot. Waymo is building what they call the Waymo Foundation Model, which [incorporates VLA-like features](https://practicalai.fm/336/transcript#t=24m26s).
* Multiple leading researchers think today’s generative models are very limited since they don’t understand the real world. Sergey Levine says [today’s AI systems live in Plato’s Cave](https://sergeylevine.substack.com/p/language-models-in-platos-cave). Yann LeCun is well known for criticizing LLMs saying [even cats understand the world better](https://youtu.be/1lHFUR-yD6I?t=330). Fei-Fei Li and Justin Johnson of World Labs say that [LLMs lost something](https://youtu.be/60iW8FZ7MJU?t=2816) by jumping straight to the highest level of abstraction (i.e. language). The point they all seem to have in common is we need to bring AI into the physical world. For me, this means that experimenting with AI for robotics today is like getting a glimpse into where AI will go next.

Stay tuned for future posts where I’ll explore the hardware, developer tools, and community springing up in the AI for robotics space.
