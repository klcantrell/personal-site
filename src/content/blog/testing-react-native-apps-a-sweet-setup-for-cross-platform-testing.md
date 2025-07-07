---
title: "Testing React Native Apps: A Sweet Setup for Cross-Platform Testing"
date: "2022-12-02"
slug: "testing-react-native-apps-a-sweet-setup-for-cross-platform-testing"
img:
  src: "https://sep.com/wp-content/uploads/2022/11/testing-react-native-apps-featured-image-1024x683.jpg"
  alt: ""
  caption: ""
---

Short on time? The answer is to use [Jest](https://jestjs.io/), [React Native Testing Library](https://callstack.github.io/react-native-testing-library/), and [Detox](https://wix.github.io/Detox/). Here’s a sample repo with it all wired up: https://github.com/klcantrell/testing-react-native-apps-post.

The advantages of building an app with React Native apply when testing the app as well. When building, you write code once and get native apps that work well on multiple platforms. Likewise, when testing, you write tests once and verify your app’s behavior on multiple platforms.

Since you write your app code only once – in JavaScript or TypeScript – you only need one set of unit tests to go with it. The same app code runs on each platform, no matter how many platforms you target. But how could this be true for UI tests that need to run in the environment of the target platform – say on iOS or Android? The tools available in the React Native ecosystem make it possible.

## What does cross-platform testing look like?

Check out the UI test below, written once in TypeScript and capable of verifying the app on iOS and on Android. See the video below the code snippet for the test in action.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/kB0EiqrpCsk?si=Mx11ArgoS_4cdGKX&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Pretty sweet, right?

## I’m sold. What’s the catch?

Unfortunately, it can be tricky to get a setup like this working for a React Native project. The official project template only provides a minimal testing setup. The single test it comes with does not give strong signals on how to write thorough and meaningful tests.

Questions come up like:

- Do you need third-party libraries? If so, which ones should you use?
- How do you set them up?
- What kind of tests should you write? Spoiler alert: my suggestions line up with what Martin Fowler says in his [TestPyramid post](https://martinfowler.com/bliki/TestPyramid.html).

I’ll share how I went about answering the questions above for a recent client project. I think the setup I describe below is a solid starting place for testing apps built with React Native in 2022 going into 2023. Unless your needs are uncommon, it should work well for you, too.

For each tool described below, I link to a specific commit that shows how the tool was set up. I also link to specific code examples that show the tool in action. The example app is a basic weather app with three screens:

1. a sign-in screen
1. a screen displaying the current temperature
1. a screen allowing the user to customize their preferred measurement system (i.e. °C or °F)

## Unit Test with Jest

To unit test our app, we need tools that let us exercise the functions and methods of our app in isolation. We need the ability to make assertions against the output of a function or method given certain inputs.

You’ll want a lot of this type of test in your codebase, especially compared to UI tests. They run fast – hundreds or thousands can run in the time it takes a single UI test to run. And, you want your units to work well in isolation before putting them together to make your app. Don’t just take my word for it; see what Martin Fowler has to say about it in his [SelfTestingCode post](https://martinfowler.com/bliki/SelfTestingCode.html).

The tool I recommend for unit testing a React Native app is [Jest](https://jestjs.io/).

### Why Jest?

- It has everything we need from a testing framework (i.e. test runner, assertions, mocking, reporting) in a nice, easy-to-use package.
- It’s extremely popular and a basic setup is included in the official React Native template.
- It comes with a vibrant ecosystem of other tools. In fact, the other tools I discuss in this post integrate well with it.

### Example code

- Setting up: if you [created your project with the official template](https://reactnative.dev/docs/environment-setup#creating-a-new-application), you’re good to go! Jest already comes ready to use for unit tests.
- Example test: [Temperature model unit tests](https://github.com/klcantrell/testing-react-native-apps-post/blob/main/__tests__/units/Temperature.spec.ts)

## Component Test with React Native Testing Library

To [component test](https://reactjs.org/docs/testing.html) our app, we need tools that let us render components, individual pieces of UI, in isolation. We need the ability to simulate interactions such as clicks or typing on components. We also need to make assertions against the state of a component after certain actions with it.

Like unit tests, you’ll want a lot of these in your codebase – they’re fast, and components should work well on their own before you compose them all together.

The tool I recommend for component testing a React Native app is [React Native Testing Library](https://callstack.github.io/react-native-testing-library/).

### Why React Native Testing Library?

- It provides APIs that make writing complete, readable, and reliable tests easy.
- It’s associated with the extremely popular [Testing Library](https://testing-library.com/) ecosystem and is popular in its own right.
- It’s easy to get set up.

### Example code

- Setting up: See [this commit](https://github.com/klcantrell/testing-react-native-apps-post/commit/02057061972659b144d65a8f0c8a0c00bf69fbf6) as well as the docs from React Native Testing Library
- Example test: [SettingsScreen component test](https://github.com/klcantrell/testing-react-native-apps-post/blob/main/__tests__/components/SettingsScreen.spec.tsx)

## UI Test with Detox

To UI test our app, we need tools to launch it and exercise it the way a user would. We need the ability to make assertions against the app’s behavior from the user’s perspective.

It all depends of course, but you probably don’t want a lot of this type of test in your codebase. For one, they take a while to author and run. Also, these tests are best written from the user’s perspective, so it’s natural to have fewer tests that traverse more screens of your app.

The tool I recommend for UI testing a React Native app is [Detox](https://wix.github.io/Detox/).

### Why Detox?

- It enables you to write UI tests once and verify your app’s behavior on multiple platforms
- It’s backed by [Wix](https://www.wix.engineering/) who provides amazing support and [documentation](https://wix.github.io/Detox/docs/introduction/getting-started/) behind the tool

### Example code

- Setting up: See [this commit](https://github.com/klcantrell/testing-react-native-apps-post/commit/f1c6aaab7c2ba659be29f8628fb42bd9bd1c5fcc) for the initial setup and [this one](https://github.com/klcantrell/testing-react-native-apps-post/commit/706e72a6284080b2788a581c7e8050301ba1aeaa) for the mocking setup. Also, see [Detox’s docs for the initial setup](https://wix.github.io/Detox/docs/introduction/project-setup/) and [docs for mocking](https://wix.github.io/Detox/docs/guide/mocking/).
- Example test: [UI test verifying every screen of the example app](https://github.com/klcantrell/testing-react-native-apps-post/blob/main/e2e/app.test.ts)

## Conclusion

I used the setup described above in a recent client project. The mobile app had 30+ distinct screens and several platform integrations, including app links, widgets, wallet passes, camera, and push notifications.  It has undergone a few major changes while in production. This setup helped me maintain confidence that the app continued to work well through it all.

---

<span class="text-sm italic">Originally posted at <a href="https://sep.com/blog/testing-react-native-apps-a-sweet-setup-for-full-stack-cross-platform-testing/">sep.com</a></span>
