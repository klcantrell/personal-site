---
title: "4 reasons to keep an eye on Dart"
date: "2020-12-01T23:59:59.000Z"
slug: "4-reasons-to-keep-an-eye-on-dart"
description: "Dart is worth watching because 1) it can be used to create many different kinds of apps, 2) it has nice tools that..."
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1751936822/personal-site/dart-header-image.png"
  alt: ""
  caption: ""
---

## TL;DR

[Dart](https://dart.dev) is worth watching because:

- it can be used to create many different kinds of apps (mobile, desktop, console, front-end web, server-side web, cloud function)
- it has nice tools that work well on several platforms
- it has a strong and growing community
- it has a promising future with [Flutter](https://flutter.dev/) rising in popularity and [Fuschia](https://en.wikipedia.org/wiki/Google_Fuchsia) coming someday.

A couple reasons I may wait before doubling down on Dart and its ecosystem are 1) support for some use cases is still early in development (e.g. desktop apps and web apps), and 2) the language itself is still evolving to gain features you might expect from a modern programming language (e.g. [pattern matching](https://github.com/dart-lang/language/issues/546) and [data classes](https://github.com/dart-lang/language/issues/314)).

## Intro

I’ve tinkered with a fair amount of programming languages. At work, I’m mostly using JavaScript and Java, but I’ve played with a few others including some mainstream ones like Python, C#, and Swift as well as some less popular ones like OCaml, Haskell, and Rust (though, the lattermost language is gaining traction and catching the eye of big tech companies like [Amazon](https://aws.amazon.com/blogs/opensource/why-aws-loves-rust-and-how-wed-like-to-help) and [Microsoft](https://msrc-blog.microsoft.com/2019/11/07/using-rust-in-windows)).

Once I get to know a language a little, I often find myself really digging some aspects of the language or its ecosystem of tools but perplexed by others. 

For example, I enjoy writing OCaml (specifically in its Reason syntax) because it’s statically typed yet has a concise syntax, and it has features such as [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type) and [pattern matching](https://en.wikipedia.org/wiki/Pattern_matching) that make it really expressive to write in. However, its toolchain is difficult to set up (especially on Windows), and if you ever want to make an actual application, you’ll likely have to implement things that you’ve come to take for granted with other languages. Don’t take my word for it, check out what [this blog](https://blog.darklang.com/first-thoughts-on-rust-vs-ocaml) or [this video](https://youtu.be/Lv2QCq6ZBPs) has to say about it.

For another example, I enjoy using C# and F# because they are both .NET languages, and therefore come with an abundance of tools to help you create just about any kind of software you want. However, the .NET ecosystem is complex and is at least intimidating if not also confusing for newcomers (Do I use .NET Framework or .NET Core or .NET Standard or .NET 5? What’s a Base Class Library vs. a Portable Class Library? What’s the CLR and how is it different from the Core CLR? Oh my…), which is why [articles like this](https://stackify.com/net-ecosystem-demystified) and [videos like this](https://www.youtube.com/watch?v=bEfBfBQq7EE) exist.

## What is Dart?

The current language that I’m playing with is Dart. Like many of the other languages I’ve looked at, there are some aspects about it that I really enjoy and others that I find perplexing. From what I’ve experienced, however, it’s a language worth watching for reasons I’ll go into later in this post. First, let’s get a brief summary of Dart’s history.

Dart was created by Google in 2011 and originally conceived to be a new (better) language for the web. Although Google claims it wasn’t supposed to compete with JavaScript, the proposed advantages of Dart were direct criticisms of the JavaScript ecosystem at the time (lack of application structure, weak tooling, no compile time safety).

As we’ve seen, however, Dart did not actually take off on the web, and the JavaScript ecosystem has since grown to have more frameworks and tools (e.g. React, Angular, Webpack, npm, etc.) and even compile time safety (i.e. TypeScript).

Dart seemed to be a fairly niche language for a while. That is, until its recent surge in popularity, primarily due to the rise of [Flutter](https://flutter.dev). Dart was the the fastest growing language on GitHub in 2019 (see Figure 1). It’s also climbing the charts on language popularity indexes such as [PYPL](https://pypl.github.io/PYPL.html) and [Tiobe](https://www.tiobe.com/tiobe-index) (currently ranked as the 20th and 31th most popular language, respectively).

<figure>
  <img src="https://res.cloudinary.com/kalalau/image/upload/v1751936719/personal-site/state-of-octoverse-2019-1024x573.png" alt="state of octoverse 2019 chart">
  <figcaption>Figure 1 – The State of the Octoverse in 2019</figcaption>
</figure>

For additional reading on the history of Dart, here are a couple interesting links:

- [Presentation from GOTO conference 2011](http://gotocon.com/dl/goto-aarhus-2011/slides/GiladBracha_and_LarsBak_OpeningKeynoteDartANewProgrammingLanguageForStructuredWebProgramming.pdf) at which Dart was unveiled
- [Blog post by Google](https://news.dartlang.org/2015/03/dart-for-entire-web.html) from 2015 sharing that they would focus on compiling Dart to JS rather than shipping a Dart VM in Chrome.

Seeing Dart turning a lot of heads especially with Flutter, I decided to give it a look myself. Here are four reasons I believe it’s a language and ecosystem worth watching.

## Many ways to create

You can create mobile apps for both iOS and Android from a single Dart codebase using the Flutter SDK. Likewise, you can also use Dart with Flutter to create desktop apps for Windows, Mac, and Linux (though, desktop support is still in its early stages).

You can create console apps that [AOT compile](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) to small executables with Dart’s CLI tools (i.e. [dart2native](https://dart.dev/tools/dart2native)). The coolest part is although the built executable is small, it does not require an installation of Dart to run.

You can create server-side web apps using either the HTTP libraries that come with the Dart SDK or the community created frameworks such as [Aqueduct](https://github.com/stablekernel/aqueduct) or [Angel](https://github.com/angel-dart/angel).

You can create cloud functions using the [Dart runtime for AWS Lambda](https://aws.amazon.com/blogs/opensource/introducing-a-dart-runtime-for-aws-lambda). Azure and Google Cloud Platform have yet to support cloud functions written in Dart.

You can create client-side web apps that are written in Dart and compile to web standard HTML, CSS, and JS using Dart’s CLI tools (i.e. [dart2js](https://dart.dev/tools/dart2js)). You can even use the Flutter SDK to target the web with the same codebase you wrote for mobile (though, support for Flutter web apps is still in its early stages).

I’ve made basic mobile apps and native executables with Dart, and I’m looking forward to trying Dart out in all these environments.

## Productive, easy-to-use tools

It took me a few minutes to discover that you can create a console app in Dart with `dart create -t console-simple` and compile it to a small executable with `dart compile exe`. Compare that to the [multiple](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file). [pages](https://docs.microsoft.com/en-us/dotnet/core/deploying/ready-to-run). [of](https://docs.microsoft.com/en-us/dotnet/core/deploying/trim-self-contained). documentation I read and numerous settings I tried with .NET 5 to create a “small” console app only to be a bit bummed that it was 2.5 times the size of the Dart executable.

Dart’s tools and IDE plugins are easy to install and use on Windows, Mac, and Linux. Also, they have an emphasis on quick, iterative feedback. Check out the video clip below in which the mobile app hot reloads with each edit I make to the source code (note that hot reloading a Dart or Flutter web app is [still being worked on](https://github.com/flutter/flutter/issues/53041)).

<iframe width="100%" height="500" src="https://www.youtube.com/embed/EX65OHCK26k?si=rkSnfHYxyTjF_DrK&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p class="text-sm text-slate-400 -mt-4 mb-4 text-center italic">Hot reloading with Flutter</span>

## Strong community

Dart and Flutter are open source projects. There are 14,000 packages shared on [pub](https://pub.dev), the package management platform for Dart and Flutter. Some of the most popular packages are those made by the community such as [provider](https://pub.dev/packages/provider) or [rxdart](https://pub.dev/packages/rxdart). There are tens of thousands of posts on StackOverflow for Dart and Flutter. [More](https://flutter.dev/showcase) and [more](https://uxplanet.org/10-amazing-mobile-apps-built-using-flutter-framework-17019e38a907) apps created with Flutter are being published to the app stores.

The team behind the evolution of the Dart language really seems to listen to the community. A couple examples of this include the discussion in [this issue](https://github.com/dart-lang/language/issues/546) about bringing pattern matching to the language (something I really hope happens!), as well as [this one](https://github.com/dart-lang/language/issues/1077) about soliciting feedback from the community on what features should come next to the language.

## Promising Future

Dart’s current popularity goes hand-in-hand with the rise of Flutter. Google stated in a [blog post from April of this year](https://medium.com/flutter/flutter-spring-2020-update-f723d898d7af) that over two million developers have used Flutter since its release in December 2018, and that over 50,000 apps created with Flutter have been published to the Play Store. As Flutter moves toward stable support for desktop apps and web apps, I can see Dart’s popularity only continuing to grow.

Dart’s future looks even more promising if you consider the role it will play for the [Fuchsia operating system](https://en.wikipedia.org/wiki/Google_Fuchsia) that is currently in development by Google. It still seems too early to predict when Fuchsia will become a thing and what devices it will actually run on (though, some speculate that [it will someday replace Android](https://www.techradar.com/news/google-fuchsia)). What is known is that [Google has selected Dart](https://fuchsia.dev/fuchsia-src/contribute/governance/policy/programming_languages#dart) to be the programming language for writing UI apps for Fuchsia.

## Conclusion

The Dart ecosystem’s killer features are still gaining stable support and the language itself is still evolving quickly. For the reasons described in the post, however, I’ll be watching Dart with keen interest to see where it goes from here.