---
title: "Getting Physical with AI (1): A Body for My Musubi-Making Agent"
date: "2026-03-15T23:59:59.000Z"
slug: "getting-physical-with-ai-1-a-body-for-my-musubi-making-agent"
description: "AI agents are pretty fantastic. I use tools like GitHub Copilot and Claude Code daily to code and learn. My biggest complaint is..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1773498404/digitized-so-100-spam-musubi_bncrvl.png"
  alt: "Digitized SO-100 reaching for Spam musubi"
  caption: "Original photo by Hugging Face"
---

AI agents are pretty fantastic. I use tools like GitHub Copilot and Claude Code daily to code and learn. My biggest complaint is their usefulness is trapped in the digital realm. Digital agents can’t place a slice of grilled Spam onto a bed of rice or fold nori, can they? So, my excitement for them can only go so far.

Then I learned that the Claudes and GPTs of the world have cousins like GR00T, Cosmos, π, and Genie that exist to enable physical agents. I decided it was time to experience what’s possible when an agent is broken out of its digital box and given the intelligence to interact with the world.

## Okay, But What’s With The Musubi?

### 1. Fuel

Learning about AI for robotics—or <a href="https://www.nvidia.com/en-us/glossary/generative-physical-ai" target="_blank" rel="noopener">physical AI</a>—works up a serious mental appetite. So how should I refuel? The answer is undeniably to eat more <a href="https://en.wikipedia.org/wiki/Spam_musubi" target="_blank" rel="noopener">musubi</a>. It was one of my favorite snacks growing up and deserves to be the North Star of this project. My wife isn’t convinced that the excessive sodium intake is justified, but science must prevail.

### 2. Squishiness

A simple task like picking and placing a slice of Spam is surprisingly difficult for a robot. In classical robotics, you’d have to build a perfect math-based model of the world and then tell the robot exactly how to move within it. The problem is that the real world is messy and unpredictable. Physical AI shifts the paradigm: instead of me trying to manually model the physics of a squishy block of rice, the robot learns to navigate that complexity from the data.

With physical AI, I won’t be writing `if/else` statements for every grain of rice. Using LeRobot and GR00T, I can show the robot how to handle the ingredients. Instead of a rigid script, the robot will learn to adapt to the squishiness. See <a href="https://kalalau-cantrell.com/blog/if-you-cant-wait-5-years-start-experimenting-with-ai-for-robotics-today" target="_blank" rel="noopener">this post</a> for more info on LeRobot, GR00T, and the other tools I plan to use for this project.

### 3. Why not?

How awesome is it that I can even attempt this? One or two years ago, this would have required a robotics degree, a lab at a university, and a $50,000 industrial arm. Today, if you’re a software engineer with a laptop, around a hundred bucks to buy the electronics, and access to a 3D printer, you can build a physical AI agent as a side project.

## Building the SO-101 Robot Arm

To give my agent a body, I chose the <a href="https://github.com/TheRobotStudio/SO-ARM100" target="_blank" rel="noopener">SO-101</a>. Building it was pretty straightforward and mostly a matter of following <a href="https://huggingface.co/docs/lerobot/en/so101" target="_blank" rel="noopener">the Hugging Face guide</a>.

Check out this sped-up video of me unboxing, assembling, calibrating, and doing a test teleoperation of the SO-101 follower arm. There are other videos out there that are more step-by-step like <a href="https://www.youtube.com/watch?v=70GuJf2jbYk" target="_blank" rel="noopener">this one from WowRobo</a>. For mine, it’s just a quick look at what it’s like to build one of these.

<div class="w-full aspect-16/9">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VrkLgyNLXiU?si=VVVrzbw3lO9ew1v3&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Tips

The only issue I ran into was during calibration. While calibrating one of the motors, the LeRobot calibration script threw this error: `ValueError: Magnitude 3641 exceeds 2047 (max for sign_bit_index=11)`. I found <a href="https://github.com/huggingface/lerobot/issues/1296" target="_blank" rel="noopener">this LeRobot GitHub issue</a> that had some helpful tips. Ultimately, I got around the issue by trying different starting positions for the arm until I found one that worked with the script. It was a hacky workaround but it got things working and caused no issues later for teleoperation.

If buying a kit, I recommend getting one that provides a wrist camera. If going the 3D printing route instead, make sure to look at the camera options <a href="https://github.com/TheRobotStudio/SO-ARM100?tab=readme-ov-file#5-wristmount-cameras" target="_blank" rel="noopener">listed on the SO-100 GitHub</a>. Having a wrist camera will be important for training later as explained in <a href="https://www.youtube.com/watch?v=DeBLc2D6bvg&t=837s" target="_blank" rel="noopener">this video</a>.

## What’s Next?

Now I’ll be collecting the data to train GR00T how to move the SO-101. I’ve got the hardware, I’ve got the models, and now I just need to record enough data to train the model (without eating all the supplies first).
