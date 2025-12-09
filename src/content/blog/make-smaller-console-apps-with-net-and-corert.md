---
title: "Make smaller console apps with .NET and CoreRT"
date: "2021-01-01T23:59:59.000Z"
slug: "make-smaller-console-apps-with-net-and-corert"
description: "There’s something satisfying about slimming down an app’s executable file(s) to be as small as possible. It’s not unlike the joy of removing..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1751936956/personal-site/small-binaries.png"
  alt: ""
  caption: ""
---

There’s something satisfying about slimming down an app’s executable file(s) to be as small as possible. It’s not unlike the joy of removing dead code from a codebase; or, to use a non-programming example, the satisfaction of emptying your home of clutter. It feels good to remove clutter, whether that clutter is unneeded lines of code, bloated file sizes, or things in your home that you just don’t need anymore.

Aside from the good feeling, another benefit of small executables is that there is less to deploy and distribute. For instance, if end users need to download your app’s executables – such as the JavaScript bundle for a client-side web app or the binary file for a console app – smaller is generally better as it means faster download times. 

Furthermore, if you can reduce your app’s executables down not only in size but down to a single-file executable, you might also be able to simplify the deployment of your app. What can be simpler to deploy than a small, single-file executable?

## What is CoreRT?

For all the reasons described above, I was excited to learn that Microsoft is considering the addition of what they’re calling “native AOT” (as in [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation)) to the .NET toolchain. CoreRT is the name of the project that the native AOT feature comes from.

[This document](https://github.com/dotnet/designs/blob/736b477d5635ebc3076e0ce9604d57dad3609205/accepted/2020/form-factors.md#native-aot-form-factors) is from the dotnet/designs repository, and in it “native AOT” apps are described as “statically linked binaries with minimal dependencies” having characteristics such as “startup time in tens of milliseconds” and “several MBs binary size for a ‘Hello world’ style application” (interpreted to mean that binary sizes for native AOT apps are relatively small compared to non–native AOT apps).

The document also states that AOT compiled apps is a recent trend, one that other programming ecosystems such as Rust, Go, and Dart participate in and one that the .NET community would like to participate in as well.

CoreRT was recently moved from a separate [dotnet/corert](https://github.com/dotnet/corert) repository and into [dotnet/runtimelab](https://github.com/dotnet/runtimelab), a repository for official experimentation on the .NET runtime. I learned everything I wanted to know about .NET native AOT by reading the documentation located in [its feature branch](https://github.com/dotnet/runtimelab/tree/feature/NativeAOT).

In this post, I share my experience of doing the “Hello, World!” example for .NET native AOT. I compare it to the equivalent examples from Rust, Go, and Dart – ecosystems mentioned by Microsoft as models of the AOT compilation trend. I also include a comparison to [single file apps](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file), an existing solution from .NET that has similarities to native AOT. Finally, I look at a slightly more involved example before wrapping up the post.

## “Hello, World!” example

To get started with .NET native AOT, I followed the instructions in the [“Hello, World!” example](https://github.com/dotnet/runtimelab/tree/feature/NativeAOT/samples/HelloWorld). I also fiddled with some configuration and enabled [reflection-free-mode](https://github.com/dotnet/runtimelab/blob/feature/NativeAOT/docs/using-nativeaot/optimizing.md#options-related-to-reflection) to produce the smallest possible executables. I was stoked to find the produced executable weigh in at just over 1 MB.

For comparison, I also built “Hello, World!” examples on Windows, Mac, and Linux for .NET native AOT, Rust, Go, Dart and .NET single file apps. For each toolchain, I compiled using the release configuration and with debug info excluded from the final executable. Figure 1 shows the resulting file sizes.

<figure>
  <img src="https://res.cloudinary.com/kalalau/image/upload/v1751936956/personal-site/small-binaries.png" alt="&quot;hello, world!&quot; binary size comparison chart">
  <figcaption>Figure 1 – “Hello, World!” example</figcaption>
</figure>

[Single file apps](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file) is the current solution from .NET for producing executables that are self-contained, trimmed-down in size, and AOT compiled (although only partially). However, some .NET users have expressed dissatisfaction with this solution, and Microsoft acknowledged their concerns in the [.NET 5 preview 8 announcement](https://devblogs.microsoft.com/dotnet/announcing-net-5-0-preview-8/#single-file-applications) saying that “[t]he single file solution…doesn’t satisfy this definition of AOT”, referring to “native AOT” as having “extremely fast startup” and “binary size as small as it can be”.

As Figure 1 shows, the file sizes for single file apps were nowhere near the other solutions. I did not benchmark startup time for this post, but I couldn’t help but notice the delayed startup from .NET single file apps versus the much snappier startup from the other solutions.

## Star Wars API example

I also wanted to see the file sizes for an app that did slightly more than “Hello, World!”. For that, I made an app that asks the Star Wars API for a random character’s data then prints the data to the console. First, it generates a random number for the character ID to request, then it sends the request and prints the received data to the console.

Although not much more complicated than “Hello, World!”, this example required more native dependencies for the random number generation and the networking. I thought it’d be interesting to see how the additional dependencies affected the file sizes. Figure 2 shows the results.


<figure>
  <img src="https://res.cloudinary.com/kalalau/image/upload/v1751937267/personal-site/small-binaries-star-wars-api-example.png" alt="&quot;hello, world!&quot; binary size comparison chart">
  <figcaption>Figure 2 – Star Wars API example</figcaption>
</figure>

Overall, the sizes increased for the Star Wars API example. However, especially compared to .NET single file apps, the AOT compiled executables were still relatively small. Rust produced the smallest executables across the board, but .NET native AOT’s sizes were right around what the other toolchains produced.

## Conclusion

CoreRT’s native AOT toolchain is still considered experimental, even though some pretty big things have already shipped with it. Examples include Streets of War 4 [[relevant GitHub issue comment](https://github.com/dotnet/corert/issues/7200#issuecomment-624990602)][[game website](https://www.streets4rage.com/)] and SoundFlow [[relevant tweet](https://twitter.com/SoundFlow_org/status/1200155734585094156)][[product website](https://soundflow.org/)].

Microsoft has shown signs that official .NET support may be on the way, including [this survey on native AOT](https://github.com/dotnet/runtime/issues/41522) and a statement that the survey results will be part of the planning for .NET 6. I certainly will be excited if official support lands one day. Until then, despite its experimental status, .NET native AOT works pretty well and is easy to set up, so go check it out!

---

##### Additional Links

Here’s [my repo](https://github.com/klcantrell/ExploreDotnetNativeAOT) with the code for the Star Wars API example.
