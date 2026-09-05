---
title: "Getting Physical with AI (2): A System 1 Brain for My Musubi-Making Agent"
date: "2026-09-05T23:59:59.000Z"
slug: "getting-physical-with-ai-2-a-system-1-brain-for-my-musubi-making-agent"
description: "My musubi agent already has a body, the SO-101 robotic arm. Now the challenge is to build the brain that will bring it..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1788629801/SO-101_Duotone_with_LeRobot_and_GR00T_logos_vammck.webp"
  alt: "Duo tone styled image of SO-101 reaching to make spam musubi with LeRobot and GR00T logos"
  caption: ""
---

*I made a YouTube video covering most of what’s in this post, complete with clips of the robot in action. If you’d rather watch than read, **check out the video here:**.*

<div class="w-full aspect-16/9">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/L6YW8lz4XN0?si=e13G1ED6VmgFBzN7&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

<div class="py-2"></div>

My musubi agent already has a body, the SO-101 robotic arm I built in <a href="https://kalalau-cantrell.com/blog/getting-physical-with-ai-1-a-body-for-my-musubi-making-agent" target="_blank">my last post</a>. Now the challenge is to build the brain that will bring it to life so it can assemble my favorite snack.

Before we get into the details of data collection and training, let's talk about the title of this post and what **System 1** refers to.

Daniel Kahneman’s <a class="italic" href="https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow" target="_blank">Thinking, Fast and Slow</a> popularized a nice framework for how we think, breaking it down into two modes. "System 1" is our fast, instinctive, reflex-like thinking. "System 2" is our slower, deliberate, logical reasoning. For a robotics agent, generating the continuous, low-level motor commands to physically move an arm is the equivalent of System 1. Later on in this project, I’ll be running experiments on giving my agent a System 2 brain for higher-level planning and reasoning.

## Teleoperation and Building the Dataset

To teach the robot its System 1 reflexes, I needed to show it some examples of how to move. I used <a href="https://github.com/huggingface/lerobot" target="_blank">LeRobot</a>, an open-source robot learning library by Hugging Face, to record my teleoperation data.

The specific task I’m covering today is picking up a slice of Spam and placing it on a bed of rice. Future videos and posts will cover the other steps.

Using LeRobot, I recorded 50 episodes of me teleoperating the arm to perform the task. For each episode, LeRobot records the following in an open format called <a href="https://huggingface.co/docs/lerobot/lerobot-dataset-v3" target="_blank">LeRobotDataset</a>:
* **Image data** from all 3 of my cameras (a base camera, a wrist camera, and an overhead camera).
* The current motor positions.
* The commanded motor positions.
* The text instruction for the task.

Besides teleop and data collection, LeRobot comes with other <a href="https://huggingface.co/docs/lerobot/using_dataset_tools" target="_blank">handy features</a>. I also used it to visualize the dataset and replay the episodes on the actual robot to make sure the data was good for training.

## Picking a Model and Training the Brain

After collecting the episodes, I needed a base model to post-train. There are <a href="https://github.com/huggingface/lerobot/blob/main/docs/source/pi05.mdx" target="_blank">plenty</a>. <a href="https://arxiv.org/pdf/2506.01844" target="_blank">of</a>. <a href="https://github.com/huggingface/lerobot/blob/main/docs/source/molmoact2.mdx" target="_blank">options</a>. out there, but I ultimately went with <a href="https://research.nvidia.com/labs/gear/gr00t-n1_6" target="_blank">GR00T N1.6</a>, an open model designed specifically for robotics by NVIDIA. 

GR00T is what’s known as a Vision-Language-Action (VLA) model. Think of VLAs as cousins to the LLMs we use every day. They are pre-trained models packed with general knowledge, but instead of chatting with you, VLAs are trained to take in multi-modal instructions (text and images) and directly generate the motor controls needed to carry out those instructions.

<figure>
  <img src="https://res.cloudinary.com/kalalau/image/upload/v1788572346/vla-architecture_adr0l9.jpg" alt="architecture diagram for vision-language-action models">
  <figcaption>Figure 1 – Vision-Language-Action model architecture</figcaption>
</figure>

To post-train the model, I used the <a href="https://github.com/NVIDIA/Isaac-GR00T/blob/4e62473d5226c55784697944a5c9606a51927bfc/gr00t/experiment/launch_finetune.py" target="_blank">fine-tuning scripts</a> provided in the GR00T GitHub repo. Because I don’t have a powerful GPU of my own, I used <a href="https://brev.nvidia.com" target="_blank">NVIDIA Brev</a> to rent one in the cloud. It took about 30 hours of training on my 50 episodes to get the model dialed in.

*I probably could have gone with fewer episodes and less post-training overall, but I stuck with what the GR00T team recommended in <a href="https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/10-groot.html" target="_blank">this article</a>.*

## Inference: Did It Actually Work?

To run inference and test the robot policy, I once again used <a href="https://github.com/NVIDIA/Isaac-GR00T/blob/4e62473d5226c55784697944a5c9606a51927bfc/gr00t/eval/run_gr00t_server.py" target="_blank">scripts</a> from the GR00T GitHub on a GPU from NVIDIA Brev.

So... without further ado, was I able to get GR00T to control the SO-101 to make me Spam musubi? 

Well, you’ll have to stick around for future updates to see if I ever get *all* the way there. But as for picking up a slice of Spam and placing it on a bed of rice? **It worked!** 

*If you watch the video clip of this first inference, you'll notice the movement is a bit slow and jerky. I suspect this has something to do with my rented inference server being remotely located in France.*

Even with the slight stutters from latency, seeing the robot autonomously manipulate the Spam was incredible. We’ve officially taken our first real step toward a fully autonomous Spam musubi-making robot.

## What’s Next?

So far, I’ve used the SO-101, Hugging Face LeRobot, NVIDIA GR00T N1.6, and NVIDIA Brev to build (a piece of) a System 1 brain. And we successfully placed some Spam!

If you’re feeling inspired to get an SO-101 of your own, check out <a href="https://kalalau-cantrell.com/blog/getting-physical-with-ai-1-a-body-for-my-musubi-making-agent" target="_blank">my previous post</a> for recommendations on getting started.

Now what about all the other tasks that go into making musubi? I’ll be exploring a few different directions. I’ll try providing tools to general purpose LLMs to act as a System 2 planner. Alternatively, I might switch from VLAs to a newer generation of robot foundation models that are more promptable (if models like <a href="https://www.pi.website/blog/pi07" target="_blank">π0.7</a>, <a href="https://skild.ai/blogs/s1" target="_blank">S1</a>, or <a href="https://generalistai.com/blog/gen-1.5" target="_blank">GEN-1.5</a> ever get released for general use).
