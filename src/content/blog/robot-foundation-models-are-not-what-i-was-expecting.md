---
title: "Robot Foundation Models Are Not What I Was Expecting (I’m 5 Years Too Early)"
date: "2025-12-08T23:59:59.000Z"
slug: "robot-foundation-models-are-not-what-i-was-expecting"
description: "When Physical Intelligence announced the π0 foundation model, I thought a ChatGPT moment in robotics was near. Here was a model that could control..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1765243686/robot-hiking-kalen-emsley-unsplash-photo_smjnmo.png"
  alt: "Robot on hike at a scenic lookout"
  caption: "Original photo by Kalen Emsley on Unsplash"
---

When Physical Intelligence <a href="https://www.physicalintelligence.company/blog/pi0" target="_blank" rel="noopener">announced the π0 foundation model</a>, I thought a ChatGPT moment in robotics was near. Here was a model that could control different kinds of robots to perform a variety of dexterous tasks. It could fold clothes, make coffee, assemble cardboard boxes, and more. I thought we’d get another <a href="https://www.latent.space/p/ai-engineer" target="_blank" rel="noopener">post like swyx’s</a> signaling robotics as an emerging capability of the AI engineer. I thought “If I can build digital agents on top of language foundation models, those same skills will transfer to building physical agents on robot foundation models, right?”. Not quite.

Getting into AI for robotics still isn’t easy. The hardware is expensive, the tools are still maturing, and you need specialized knowledge in machine learning (<a href="https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset" target="_blank" rel="noopener">data curation</a>, <a href="https://github.com/huggingface/lerobot/issues/2393" target="_blank" rel="noopener">debugging model training issues</a>) and robotics (<a href="https://github.com/huggingface/lerobot/issues/678" target="_blank" rel="noopener">knowledge of kinematics</a>) to fill in the gaps. However, early signals point to robot models following the same trajectory as LLMs. I think in 5 years, working with robot models will be nearly as accessible as LLMs. For me, dealing with today’s rough edges is worth getting a taste of where AI for robotics—and potentially AI more broadly—is heading.

## Robot foundation models (2025) == LLMs (2018)

There are many parallels between how LLMs have progressed and how robot models are starting to progress. As I see it, robot models today are roughly where LLMs were in 2018, about 5 years before their breakout moment.

### Background

BERT and GPT-1 were the first LLMs, both introduced in 2018. With the release of GPT-3 in 2020, OpenAI tried to commercialize with their first ever product, the OpenAI API. It wasn’t until November 2022, 4.5 years after their first LLM, that OpenAI and AI as a whole got their big moment with ChatGPT. We know the rest of the story: we now have several model labs pushing forward the LLMs we all use and love today.

And now robot foundation models are starting to appear. Google DeepMind released RT-2 in 2023, the first vision-language-action model (VLA). In short, VLAs are LLMs that have been adapted into vision-language models (VLMs) that have been further adapted to output robot action tokens. You can read more about VLAs in the <a href="https://arxiv.org/pdf/2307.15818" target="_blank" rel="noopener">RT-2 paper</a> or listen to <a href="https://youtu.be/48pxVdmkMIE?t=1649" target="_blank" rel="noopener">Sergey Levine explain it to Dwarkesh</a>.

Since RT-2, Physical Intelligence has released multiple VLA models with each one more general and robust than the last. Their <a href="https://www.axios.com/2025/11/21/robots-physical-intelligence-ai" target="_blank" rel="noopener">recent funding round</a> with a $5.6 billion valuation suggests that they may be early on the path toward becoming the "OpenAI of robotics". Google DeepMind, NVIDIA, and Hugging Face have also released VLAs in 2025.

### Where VLAs fall short

Even though state-of-the-art VLAs show a lot of promise, they still don’t have zero-shot capabilities with many kinds of robots across many kinds of tasks. In other words, they still require some amount of fine-tuning to be useful. This is in stark contrast to LLMs that can perform a wide variety of language tasks out-of-the-box and can easily adapt to new tasks with prompting. <a href="https://youtu.be/8dZUOo5xWFw?t=1008" target="_blank" rel="noopener">This video</a> goes deeper on what to expect from VLAs vs. LLMs.

And then there’s the question of whether VLAs are actually the breakthrough we need to make robots generally useful and accessible. Fei-Fei Li <a href="https://drfeifei.substack.com/p/from-words-to-worlds-spatial-intelligence" target="_blank" rel="noopener">published a manifesto</a> stating we need to go beyond today’s generative models to unlock general robotics and other use cases. Her company, World Labs, works on world models toward this end. Time will tell whether world models will help scale robotics to the point of democratization.

### Predictions

Considering how new VLAs and world models are, considering how difficult the physical world is to work with, and considering how much time it took LLMs to go from conception to widespread adoption, it’ll be years—five in my estimation—before we see enough progress here that would bring robotics to the broader developer community.

Although my timeline takes its cue from the LLM trajectory, it lines up pretty well with estimates from leading researchers. Yann LeCun says the next generation of AI that will actually understand the physical world could come in <a href="https://youtu.be/4__gg83s_Do?t=787" target="_blank" rel="noopener">3-5 years</a>. Sergey Levine says <a href="https://youtu.be/48pxVdmkMIE?t=300" target="_blank" rel="noopener">single-digit years</a> is realistic for autonomous, generalist robots to be widely deployed in the world. Fei-Fei Li says <a href="https://youtu.be/9VcXiyE40xw?t=2053" target="_blank" rel="noopener">5 years is a fair guesstimate</a> for when world models will be capable enough to enable large-scale robot learning.

## Why now?

So why would I write about something that’s still 5 years away? Three things come to mind:

* It’s a great time to experiment with a technology that is clearly on its way. I have to think that at one point in time, people experimenting with GPT-2 or GPT-3 were thinking the same thing. The hardware is cheap enough, the tools mature enough, the models capable enough, and the community big enough to support developers interested in experimenting with AI for robotics now. More on the hardware, tools, and community in future posts.
* There are several companies already building products with this technology, showing its potential. 1X’s <a href="https://www.1x.tech/discover/redwood-ai" target="_blank" rel="noopener">Redwood model</a> is a VLA that controls NEO, their humanoid home robot. Cloud Chef is working on <a href="https://www.youtube.com/watch?v=t_MQ1Ms_Zp8&t=422s" target="_blank" rel="noopener">building robot line cooks with robot foundation models</a>. Sunday Robotics’ <a href="https://www.sunday.ai/journal/no-robot-data" target="_blank" rel="noopener">ACT-1 model</a> is a foundation model that controls Memo, a wheeled home robot. Waymo is building what they call the Waymo Foundation Model, which <a href="https://practicalai.fm/336/transcript#t=24m26s" target="_blank" rel="noopener">incorporates VLA-like features</a>.
* Multiple leading researchers think today’s generative models are very limited since they don’t understand the real world. Sergey Levine says <a href="https://sergeylevine.substack.com/p/language-models-in-platos-cave" target="_blank" rel="noopener">today’s AI systems live in Plato’s Cave</a>. Yann LeCun is well known for criticizing LLMs saying <a href="https://youtu.be/1lHFUR-yD6I?t=330" target="_blank" rel="noopener">even cats understand the world better</a>. Fei-Fei Li and Justin Johnson of World Labs say that <a href="https://youtu.be/60iW8FZ7MJU?t=2816" target="_blank" rel="noopener">LLMs lost something</a> by jumping straight to the highest level of abstraction (i.e. language). The point they all seem to have in common is we need to bring AI into the physical world. For me, this means that experimenting with AI for robotics today is like getting a glimpse into where AI will go next.

Stay tuned for future posts where I’ll explore the hardware, developer tools, and community springing up in the AI for robotics space.
