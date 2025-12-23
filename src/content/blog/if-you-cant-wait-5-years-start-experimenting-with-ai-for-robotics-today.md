---
title: "If You Can’t Wait 5 Years: Start Experimenting with AI for Robotics Today"
date: "2025-12-23T23:59:59.000Z"
slug: "if-you-cant-wait-5-years-start-experimenting-with-ai-for-robotics-today"
description: "In my last post, I discussed why the ChatGPT moment for robotics is likely still 5 years away. But if you can’t wait that long..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1766498882/ghost-laptop-editing-code_jfvvqd.png"
  alt: "Ghost laptop editing code"
  caption: "Original photo by Oskar Yildiz on Unsplash"
---

In my <a href="https://kalalau-cantrell.com/blog/robot-foundation-models-are-not-what-i-was-expecting" target="_blank" rel="noopener">last post</a>, I discussed why the ChatGPT moment for robotics is likely still 5 years away. But if you can’t wait that long, this post has practical advice on how to start experimenting today.

Be warned: the ecosystem is fragmented, the learning curve is steep, and `(AI + hardware) == quirky`. If you thought LLMs were weird, building a system that gives AI a body takes that up a notch. But the struggle is worth it to get a sense of where the field is headed next. I previously mentioned several researchers who believe physical-world understanding is the missing link for true machine intelligence. That sentiment was recently echoed by <a href="https://youtu.be/PqVbypvxDto?t=1073" target="_blank" rel="noopener">Demis Hassabis</a>.

So, where to begin? Here’s what I’m doing, and I hope it gives you a good starting place.

## Hardware

I don’t have thousands to spend on <a href="https://www.trossenrobotics.com/solo-ai" target="_blank" rel="noopener">a research-grade robot arm</a>, but I wanted something more serious than a project kit. I also wanted real hardware. Simulation would have been fine, but I wanted to see something I made working in the real world.

Enter the <a href="https://github.com/TheRobotStudio/SO-ARM100" target="_blank" rel="noopener">SO-100</a>: a 3D-printable, low-cost robot arm that is well supported and loved in the Hugging Face and NVIDIA developer communities. Depending on how you source the motors and parts, a single arm costs about 100 to 200 USD. That’s a good deal for the hardware alone, but you’re buying much more than servos and screws when it comes to the SO-100—the tools, community, and learning resources that come along with it make it totally worth the investment.

I’ve purchased my parts from PartaBot <a href="https://partabot.com/products/so-arm101?variant=43026077155443" target="_blank" rel="noopener">here</a>, and I’m building it as we speak.

## Tools

* <a href="https://github.com/huggingface/lerobot" target="_blank" rel="noopener">LeRobot</a>: A library from Hugging Face that I’m using to record datasets and interface with robot foundation models. It reminds me of the Hugging Face Transformers library with its goal of making AI and, in LeRobot’s case, robotics more accessible.
* <a href="https://developer.nvidia.com/isaac" target="_blank" rel="noopener">Isaac</a>: A platform of robotics tools from NVIDIA that provides the GR00T foundation model. I’m fine-tuning GR00T to control my SO-100 arm. It also provides Isaac Sim and Isaac Lab, open-source tools for training robots in simulation. I plan to check out Sim and Lab in a later post after I get reps training GR00T with LeRobot.
* <a href="https://developer.nvidia.com/brev" target="_blank" rel="noopener">Brev</a>: You need NVIDIA GPUs to work with GR00T, and I don’t have thousands to buy my own right now. Thankfully, Brev provides on-demand access to preconfigured GPU environments.

I’m using LeRobot, Isaac GR00T, and Brev to train my first robot policy. I’ll share the challenges and learnings on that in future posts.

## Community

Compared to the LLM space, the AI for robotics community is relatively small. But it is very active and over the next few years, I expect it to grow a ton.

**Creators to watch**
* <a href="https://www.youtube.com/@LycheeAI/videos" target="_blank" rel="noopener">LycheeAI</a>: Video tutorials on Isaac Sim and Isaac Lab often featuring the SO-100.
* <a href="https://www.youtube.com/@ilialarchenko/videos" target="_blank" rel="noopener">Ilia Larchenko</a>: Deep dives on how robot foundation models work and experiments with the SO-100.
* <a href="https://www.youtube.com/@nikodembartnik/videos" target="_blank" rel="noopener">Nikodem Bartnik</a>: Fun experiments with all kinds of robots and AI. Recently getting into Isaac tools and the SO-100.
* <a href="https://www.youtube.com/@NVIDIAOmniverse/streams" target="_blank" rel="noopener">NVIDIA Omniverse livestreams</a>: Official content from NVIDIA with new videos every week. Beginner-friendly but also goes deep on how NVIDIA tools work. The SO-100 has made an appearance multiple times here.

**Where to chat**

Join the Discord servers for <a href="https://discord.com/invite/s3KuuzsPFb" target="_blank" rel="noopener">LeRobot</a>, <a href="https://discord.gg/nvidiaomniverse" target="_blank" rel="noopener">NVIDIA Omniverse</a>, and <a href="https://hf.co/join/discord" target="_blank" rel="noopener">Hugging Face</a> to ask for help and stay in the loop.

## Learning Resources

Beyond the community content, here are the structured resources I’m using to fill in the gaps in my knowledge.

**Articles**
* <a href="https://huggingface.co/blog/nvidia/gr00t-n1-5-so101-tuning" target="_blank" rel="noopener">Post-Training Isaac GR00T N1.5 for LeRobot SO-101 Arm</a> by NVIDIA: A perfect reference for me as I learn how to use LeRobot to interface with Isaac GR00T.
* <a href="https://huggingface.co/blog/lerobotxnvidia-healthcare" target="_blank" rel="noopener">Building a Healthcare Robot from Simulation to Deployment with NVIDIA Isaac</a> by LeRobot: Once I’m ready to scale training up with simulation, I’ll be reading this to learn how.

**Courses**
* <a href="https://huggingface.co/learn/robotics-course/unit0/1" target="_blank" rel="noopener">Hugging Face Robotics Course</a>: I’m taking this course as I build and train my robot to learn how classical robotics is evolving toward robot learning.
* <a href="https://www.nvidia.com/en-us/learn/learning-path/robotics" target="_blank" rel="noopener">NVIDIA Robotics Fundamentals Learning Path</a>: Once I move on from my initial fine-tuning experiments, I’ll be taking this course to learn about simulation, world models, and reinforcement learning.

**Papers**
* <a href="https://www.physicalintelligence.company/blog" target="_blank" rel="noopener">Physical Intelligence Research</a>: I’m going here first once I’m ready to dive deep into the theory behind robot foundation models and vision-language-action models in particular.
* <a href="https://deepmind.google/research" target="_blank" rel="noopener">Google DeepMind Research</a>: This site can be hard to navigate because all of DeepMind’s research publications are jumbled here without easy ways to filter. Look for posts by the Gemini Robotics team. Despite the navigation issues, it’s neat to see their AI robotics research contextualized with the other posts from the SIMA, Genie, and Veo teams.

## Conclusion

Those are my recommendations for how to start experimenting with AI for robotics today. It won’t be easy or cheap, but it’s the most accessible it has ever been. I’m just getting started on my own SO-100 build and policy training, so check back soon for the results (and the inevitable troubleshooting). I haven’t decided what task my robot will do yet, but I know it’ll be something simple so I can focus on getting to know the tools and concepts.

I’m excited to see AI go from <a href="https://karpathy.bearblog.dev/animals-vs-ghosts" target="_blank" rel="noopener">ghosts</a> to something that can help humans in the real world. For me, these little experiments are a way to touch that future today.
