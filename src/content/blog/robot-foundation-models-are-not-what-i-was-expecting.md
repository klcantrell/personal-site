---
title: "Robot Foundation Models Are Not What I Was Expecting (I’m 5 Years Too Early)"
date: "2025-11-22T23:59:59.000Z"
slug: "robot-foundation-models-are-not-what-i-was-expecting"
img:
  src: ""
  alt: ""
  caption: ""
---

When Physical Intelligence [announced the π0 foundation model](https://www.physicalintelligence.company/blog/pi0), I thought a ChatGPT moment in robotics was near. Here was a model that could control different kinds of robots to perform a variety of dexterous tasks. It could fold clothes, make coffee, assemble cardboard boxes, and more. I thought we’d get another [post like swyx’s](https://www.latent.space/p/ai-engineer) signaling robotics as an emerging capability of the AI engineer. I thought “If I can build digital agents on top of language foundation models, those same skills will transfer to building physical agents on robot foundation models, right?”. Not quite.

Getting into AI for robotics still isn’t easy. The hardware is expensive, the tools are still maturing, and you need specialized knowledge in machine learning (data curation, debugging model training issues) and robotics (debugging/modifying robotics control code) to fill in the gaps. However, early signals point to robot models following the same trajectory as LLMs. I think in 5 years, working with robot models will be nearly as accessible as LLMs. For me, dealing with today’s rough edges is worth getting a taste of where AI for robotics—and potentially AI more broadly—is heading.

For the rest of this post, I will just say “robotics” instead of “AI for robotics” to save myself some keystrokes. I also don’t want this post to sound jargony, so I'll avoid terms like [embodied AI](https://www.nvidia.com/en-us/glossary/embodied-ai) and [physical AI](https://www.nvidia.com/en-us/glossary/generative-physical-ai).

## Robot foundation models (2025) == LLMs (2018)

There are many parallels between how LLMs have progressed and how robot models are starting to progress. As I see it, robotics today is roughly where LLMs were in 2018, about five years before their breakout moment.

Although my 5-year timeline takes its cue from the LLM trajectory, it lines up pretty well with estimates from leading researchers. Yann LeCun says the next generation of AI that will actually understand the physical world could come in [3-5 years](https://youtu.be/4__gg83s_Do?t=787). Sergey Levine says [single-digit years](https://youtu.be/48pxVdmkMIE?t=300) is realistic for autonomous, generalist robots to be widely deployed in the world. Fei-Fei Li says [5 years is a fair guesstimate](https://youtu.be/9VcXiyE40xw?t=2053) for when world models will be capable enough to enable large-scale robot learning.

Here’s how I’m seeing this story unfold in terms of 1) models, 2) developer tools, 3) hardware, and 4) community.

### Models

#### LLMs

BERT and GPT-1 were the first LLMs, both introduced in 2018. With the release of GPT-3 in 2020, OpenAI tried to commercialize with their first ever product, the OpenAI API. It wasn’t until November 2022, four and a half years after their first LLM, that OpenAI and AI as a whole got their big moment with ChatGPT. We know the rest of the story where we now have several model labs pushing forward the LLMs we all use and love today.

#### Robotics

Foundation models are starting to appear. Google DeepMind released RT-2 in 2023, the first vision-language-action model (VLA). In short, VLAs are LLMs that have been adapted into vision-language models (VLMs) that have been further adapted to output robot action tokens. You can read more about VLAs in the [RT-2 paper](https://arxiv.org/pdf/2307.15818) or listen to [Sergey Levine explain it to Dwarkesh](https://www.youtube.com/watch?v=48pxVdmkMIE&t=1685s). Since then, Physical Intelligence has released multiple VLA models with each one more general and robust than the last. Google DeepMind, NVIDIA, and Hugging Face have also released VLAs in 2025.

#### Gaps

Even though state-of-the-art VLAs show a lot of promise, they still haven’t generalized to where they have zero-shot capabilities with many kinds of robots across many kinds of tasks. In other words, they still require some amount of fine-tuning to be useful. This is in stark contrast to LLMs that can perform a wide variety of language tasks out-of-the-box and can easily adapt to new tasks with prompting.

And then there’s the question of whether VLAs are actually the breakthrough we need to make robots generally useful and accessible. Fei-Fei Li [published a manifesto](https://drfeifei.substack.com/p/from-words-to-worlds-spatial-intelligence) stating we need to go beyond today’s generative models to unlock general robotics and other use cases. Her company, World Labs, works on world models toward this end. Time will tell whether world models will help scale robotics to the point of democratization.

Considering how new VLAs and world models are, considering how difficult the physical world is to work with, and considering how much time it took LLMs to go from conception to widespread adoption, it’ll be years before we see enough progress here that would bring robotics to the broader developer community.

### Developer tools

#### LLMS

There is a staggering number of tools out there to support developers building on LLMs. A non-exhaustive sample:

* APIs: OpenAI, Anthropic, Gemini, Groq.
* Frameworks & Libraries: LangChain/LangGraph, Crew AI, OpenAI Agents SDK, AutoGen, HuggingFace Transformers.
* Services: AWS Bedrock, Modal, Replicate, Hugging Face, LangSmith.

#### Robotics

Tools are starting to appear.

[LeRobot](https://github.com/huggingface/lerobot) is a library from Hugging Face for working with pretrained robot models and shared datasets. It reminds me of the Hugging Face Transformers library with its goal of making AI and, in LeRobot’s case, robotics more accessible.

[Isaac](https://developer.nvidia.com/isaac) is a platform for AI robot development from NVIDIA that provides foundation models, simulators, and libraries for training and inference on NVIDIA GPUs. And there’s also [Cosmos](https://www.nvidia.com/en-us/ai/cosmos) from NVIDIA for generating synthetic data for robot learning and more.

#### Gaps

Although the tools are available, you need to be willing to do things like [debug and modify library code](https://github.com/huggingface/lerobot/issues/2431) or [implement your own inverse kinematics](https://github.com/huggingface/lerobot/issues/678) depending on what you’re trying to do. You also need access to a powerful workstation to run the tools (see the hardware section below).

And then there’s the issue of not having a clear "OpenAI of robotics" yet. Having this would accelerate developers and startups interested in robotics by giving them a platform to rally around. Physical Intelligence’s [recent funding round](https://www.therobotreport.com/physical-intelligence-raises-600m-advance-robot-foundation-models) with a 5.6 billion valuation is a sign that they may be on the path toward this end. But it’ll take years for this to play out.

### Hardware

#### LLMS

There’s not much to say here (and that’s the point). Do you have a laptop, an internet connection, and a few minutes to figure out how to call an API? Or if you prefer to run models locally, then a laptop with a bit more GPU power?

#### Robotics

Hardware is becoming more accessible. The [SO-100](https://github.com/TheRobotStudio/SO-ARM100) is an open-source robotic arm developed in partnership with Hugging Face that costs between $100 and $200 USD depending on how you source the parts. Before it came out in October 2024, you’d have to spend at least thousands to get anything like it or be a robot designer. More options are appearing like the [k-scale kbot](https://github.com/kscalelabs/kbot), an open-source humanoid robot for just over $10,000.

To use the software tools I mentioned in the previous section, you need access to a workstation with a powerful GPU. You can either purchase something like the RTX 5090 for running locally or use a cloud solution like NVIDIA Brev.

#### Gaps

Hardware costs are going down, but there aren’t many options yet outside of the Hugging Face ecosystem. Considering where we are today even with a prominent player like Hugging Face working to make the technology more accessible, I think it will take years for general-purpose robots like humanoids or mobile manipulators to become capable enough and affordable enough for people outside of manufacturing and research to consider them.

### Community

#### LLMS

The developer community in LLMs became real big, real fast. At OpenAI DevDay 2023, only a year after ChatGPT was released, OpenAI [reported 2 million developers](https://www.youtube.com/live/U9mJuUkhUzk?t=103) building on their API. At DevDay 2025, the number reported was [4 million](https://www.youtube.com/live/hS1YqcewH0c?t=63). And that’s just OpenAI’s numbers.

#### Robotics

The community is still relatively tiny. It’s difficult to quantify the size, but I’d put it in the low tens of thousands at most. Here are some interesting although imperfect signals:
* PyPi downloads: LeRobot (a fast growing AI for robotics library) at 9,000 weekly downloads vs. OpenAI API library at 32,000,000.
* Members in Discord server: LeRobot at 14,671 vs. OpenAI at 833,510.
* Followers on Twitter/X: LeRobot (@LeRobotHF) at 12,600 vs. OpenAI (@OpenAIDevs) at 245,800

Although tiny, the community seems quite active and poised for growth. Check out [LycheeAI](https://www.youtube.com/@LycheeAI/videos), [Ilia Larchenko](https://www.youtube.com/@ilialarchenko/videos), [NVIDIA Omniverse livestreams](https://www.youtube.com/@NVIDIAOmniverse/streams), and [Nikodem Bartnik](https://www.youtube.com/@nikodembartnik/videos) (to name a few) for content on how VLAs work, experimenting with the SO-100 arm, and getting started with tools like NVIDIA Isaac Sim and NVIDIA Cosmos. Also, join the Discord servers for [LeRobot](https://discord.com/invite/s3KuuzsPFb), [NVIDIA Omniverse](https://discord.gg/nvidiaomniverse), and [Hugging Face](https://hf.co/join/discord) to stay in the loop. Over the next few years, I expect these communities to grow a ton.

#### Gaps

Not many developers are following AI for robotics the way they’re following LLMs yet. But there was a point in time when LLMs and OpenAI were not household names either. As more developers become aware and able to try things out, I think that will help push this technology forward.

## Why now?

So why would I write about something that’s still 5 years away? Three things come to mind:

* It’s a great time to experiment with a technology that is clearly on its way. I have to think that at one point in time, people experimenting with GPT-2 or GPT-3 were thinking the same thing. The hardware is cheap enough, the tools mature enough, the models capable enough, and the community big enough to support developers interested in experimenting with AI for robotics now.
* There are several companies already building products with this technology, showing its potential. 1X’s [Redwood model](https://www.1x.tech/discover/redwood-ai) is a VLA that controls NEO, their humanoid home robot. Cloud Chef is working on [building robot line cooks with robot foundation models](https://www.youtube.com/watch?v=t_MQ1Ms_Zp8&t=422s). Sunday Robotics’ [ACT-1 model](https://www.sunday.ai/journal/no-robot-data) is a foundation model that controls Memo, a wheeled home robot. Waymo is building a Waymo Foundation Model which [incorporates VLA-like features](https://practicalai.fm/336/transcript#t=24m26s).
* Multiple leading researchers think today’s generative models are very limited since they don’t understand the real world. Sergey Levine says [today’s AI systems live in Plato’s Cave](https://sergeylevine.substack.com/p/language-models-in-platos-cave). Yann LeCun is well known for criticizing LLMs saying [even cats understand the world better](https://youtu.be/1lHFUR-yD6I?t=330). Fei-Fei Li and Justin Johnson of World Labs say that [LLMs missed something](https://youtu.be/60iW8FZ7MJU?t=2816) by jumping straight to the highest level of abstraction (i.e. language). The point they all seem to have in common is we need to bring AI into the physical world. For me, this means that experimenting with AI for robotics today is like getting a glimpse into where AI will go next.

Stay tuned for future posts where I’ll go into what I do with an SO-100 arm and LeRobot. Succeed or fail, I’ll have follow-up posts to further explore how robot foundation models are coming along.
