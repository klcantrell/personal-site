---
title: "Learn Webpack by Example (I): Blurred placeholder images"
date: "2018-02-01"
slug: "learn-webpack-through-example-i-blurred-placeholder-images"
img:
  src: "https://res.cloudinary.com/kalalau/image/upload/v1751855460/personal-site/mobile-phone_800.jpg"
  alt: "mobile phone"
  caption: "Mobile. Image credit: Rodion Kutsaev."
---

**_The repo that goes along with this post uses webpack 3. If you are interested in learning webpack 4, you will find this post useful as the concepts as well as the config file format is the same. Webpack 4 did introduce optimizations, zero-config capabilities, as well as new out-of-the-box plugins that an advanced user would want to know about but is beyond the purpose of this post._**

---

This is an episodic guide for learning webpack through various examples. Webpack newbies are welcome – I’m one myself and I’ll try to explain the webpack stuff in terms that make sense to someone just getting to know the tool.

All the folks that maintain the packages used in this guide deserve recognition for making such awesome tools available to the community. Since it’s the subject of this guide, a special shoutout goes to [responsive-loader](https://github.com/herrstucki/responsive-loader/) and [Jeremy Stucki](https://twitter.com/herrstucki) who maintains the project.

In episode I, we’ll look at a technique for loading images that 1) inlines blurred placeholder versions of our images on initial page load, 2) requests the full images from the server, and 3) when the full images finally load, they get faded in and the blurred placeholders get removed.

![blurred-placeholders](https://res.cloudinary.com/kalalau/image/upload/v1751855460/personal-site/blurred-image-placeholders.gif)
Blurred placeholder images.
This technique is great for devices on slow connections because it gives users some sense of what the page will look like during the several seconds (think slow 3G) it may take for the page’s images to fully load.

---

### Getting started

If you want to follow along in your code editor, you can either download [this repo](https://github.com/klcantrell/webpack-through-example-blog/tree/blur-up) or `git clone` and `checkout` the `blur-up` branch of the repo if you prefer.

Below is the file structure you should find when you open up the project folder.

```
+
/src
/css
  main.css
/imgs
  barret-wallace.jpg
  cloud-strife.jpg
  tifa-lockhart.jpg
/js
  index.js
  loadImages.js
index.html
package.json
webpack.config.js
+
```

We’ll be using webpack and specifically **responsive-loader** to resize and generate blurred placeholders for the three images in `src/imgs`, which by the way are of characters from the author’s favorite video game of all time.

Let’s take a look at our source code now starting with `index.html`. As we go, we’ll see what webpack is doing for us and we’ll pause to talk about how. Boilerplate has been omitted and replaced with `<-- ... -->` for brevity.

```html
<!-- index.html -->

<!-- ... -->

<section class="characters">
  <a href="${require('./imgs/cloud-strife.jpg').src}" class="hero-pic replace">
    <img
      src="${require('./imgs/cloud-strife.jpg').placeholder}"
      class="hero-preview"
      alt="cloud strife"
    />
  </a>
  <a href="${require('./imgs/tifa-lockhart.jpg').src}" class="hero-pic replace">
    <img
      src="${require('./imgs/tifa-lockhart.jpg').placeholder}"
      class="hero-preview"
      alt="tifa lockhart"
    />
  </a>
  <a
    href="${require('./imgs/barret-wallace.jpg').src}"
    class="hero-pic replace"
  >
    <img
      src="${require('./imgs/barret-wallace.jpg').placeholder}"
      class="hero-preview"
      alt="barret wallace"
    />
  </a>
</section>

<!-- ... -->
```

You’ve probably noticed that there are three `<a>` elements, one for each of our images. But what’s with the template literals? And what’s that `require` function all about? These are how we’re asking webpack to do its thing.

As webpack parses through our `HTML`, it encounters the template literals and knows it needs to put something there. The `require` function tells webpack _what_ to put there – in our case we’re putting in image data (it may not be clear yet what data we’re putting there but hang with me, we’ll get there). So, how does webpack know to do this? Is it automatic?

If you’ve never seen a webpack config file before, you could probably guess by just glancing at one that it’s very much not automatic. There are many options some of which are specific to webpack and others that are specific to a certain loader or plugin. So, what’s a **loader** anyway? What’s a **plugin**?

### Quick Definitions

Before diving into the configuration, I’ll provide quick definitions of these webpack concepts here as well as links to the docs that explain them in more detail.

- [ **Loader**](https://webpack.js.org/concepts/#loaders): Its job is to take your files, transform them a certain way, and give you the result of that transformation. The result you get depends on what type of file you’re working with and what the loader’s capabilities are. To use an example from our project today, you can use a loader to take an image file, transform it into image data, and then inline that data into your `HTML`.

- [ **Plugin**](https://webpack.js.org/concepts/#plugins): Its job is to accomplish more general tasks than loaders. Whereas loaders apply specific transformations to specific file types, plugins can perform tasks such as file compression, text minification, and so on. To use an example from our project today, you can use a plugin to compress image files.

### HTML Processing

Let’s now look at how we use loaders and plugins to handle our `HTML` specifically. Below are the parts of our `webpack.config.js` that have to do with `HTML`. The other options that we’ll talk about eventually are omitted and replaced with `// ...`.

```js
/*
webpack.config.js
HTML specific options
*/
// ...
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            interpolate: true,
          },
        },
      },
      // ...
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    // ...
  ],
};
```

First we pull in the **html-webpack-plugin** and assign it to a variable named `HtmlWebpackPlugin` (creative, right?). This plugin’s job is to generate the `HTML` file that we’ll use in distribution. To instatiate the plugin, we use the `new` operator on our variable in the `plugins` property of our config object. The config object I’m referring to is the one assigned to `module.exports`, and it is what “tells” webpack what to do.

**html-webpack-plugin** would generate pretty generic boilerplate `HTML` without any options passed in. But, notice that we’ve set its `template` property equal to our source `index.html` file. As you might guess, this is us telling the plugin to use our `index.html` as a template when it generates an `HTML` file for us. Great, but why go through all this trouble you ask?

It’s because we want to use loaders to transform our source `HTML`. We want to transform this:

```html
<!-- ... -->

<a href="${require('./imgs/cloud-strife.jpg').src}" class="hero-pic replace">
  <img
    src="${require('./imgs/cloud-strife.jpg').placeholder}"
    class="hero-preview"
    alt="cloud strife"
  />
</a>

<!-- ... -->
```

into this:

```html
<!-- ... -->

<!--image data truncated for brevity-->
<a href="imgs/cloud-strife-300.jpg" class="hero-pic replace">
  <img
    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/
2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhw
XExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4U
ERQeHh4eHh4e..."
    class="hero-preview"
    alt="cloud strife"
  />
</a>

<!-- ... -->
```

Notice that the template literals and `require` functions have been replaced. Now the `a.href` attribute has a url to a resized version of our image, `300px` wide. Also, the `img.src` attribute now has inlined image data. I showed the transformation of our `HTML` for one `<a>` element, but this is what we want all the `<a>` elements to look like.

Let’s look at how we use loaders to accomplish this transformation. Let’s zoom in on the block of code from our `webpack.config.js` that starts off with the `test: /\.html$/` key-value pair.

```js
{
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      interpolate: true
    }
  }
}
```

What this block basically says is, “Hey webpack, when you encounter `HTML` files, please use **html-loader** and make sure it’s setup to allow interpolation”.

We `test` for the “.html” extension, we `use` **html-loader** as the `loader` for that type of file, and then we specify in `options` that we’d like to use the `interpolate` feature from **html-loader**.

If you look at the **html-loader** [documentation](https://github.com/webpack-contrib/html-loader), you’ll see that when `interpolate` is set to `true`, you can embed the result of some `JS` right in our `HTML`. In our case, we take advantage of that by calling the `require` function to tell webpack to bring in image assets. But how does webpack know what to do with images?

### Image Processing

We need to tell it what loaders and plugins to use. Below is the part of our `webpack.config.js` file that instructs webpack what to do with images.

```js
/*
webpack.config.js
image specific options
*/
// ...
const ImageminPlugin = require("imagemin-webpack-plugin").default;
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "responsive-loader",
          options: {
            sizes: [300],
            placeholder: true,
            placeholderSize: 50,
            name: "imgs/[name]-[width].[ext]",
          },
        },
      },
      // ...
    ],
  },
  plugins: [
    // ...
    new ImageminPlugin({ test: /\.(png|jpg|gif)$/ }),
  ],
};
```

The **imagemin-webpack-plugin** we’re using has a pretty simple job – it just compresses our images. You can read more about that [here](https://www.npmjs.com/package/imagemin-webpack-plugin), but what’s of more interest is the loader we’re using to transform our images. Look at the block of code that starts with the `test: /\.(png|jpg|gif)$/` key-value pair.

What this block basically says is, “Hey webpack, when you encounter image files, please use **responsive-loader** to generate a resized version of the image at `300px` wide and while you’re at it create data for a placeholder image that is `50px` wide”.

In other words, we `test` for the “.png” or “.jpg” or “.gif” extensions, we `use` **responsive-loader** as the `loader` for those types of file, and then we specify in `options` that we’d like to use the `resize`, `placeholder`, and `name` features of **responsive-loader** to transform our images.

Let’s look in detail at what **responsive-loader** does for us with these options. When we say:

```
require('./imgs/cloud-strife.jpg');
```

Then **responsive-loader** gives us this back:

```js
{
  placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAQEAwUE
  BAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8f
  ExciJCIeJBweHx4BBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4e....",
  /* the rest of the data has been omitted for brevity */
  src: "imgs/cloud-strife-300.jpg", // path to the resized image
  srcSet: "imgs/cloud-strife-300.jpg 300w" // more on this in a future episode
  // ... there are other properties but I'll leave that to the reader's curiosity
}
```

It’s just a `JS` object. And that is why when can use `.src` and `.placeholder` to access what we need from our `require` statements so that when we do this:

```html
<img
  src="${require('./imgs/cloud-strife.jpg').placeholder}"
  class="hero-preview"
  alt="cloud-strife"
/>
```

webpack gives us this:

```html
<!--image data truncated for brevity-->
<img
  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/
2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhw
XExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4U
ERQeHh4eHh4e..."
  class="hero-preview"
  alt="cloud strife"
/>
```

### Quick Recap

Awesome, so we have a workflow for processing our `HTML` and our images. To recap:

For `HTML`, we use the **html-webpack-plugin** to generate an `HTML` file using our source `index.html` as a template. We use **html-loader** to process our `HTML` and specifically allow interpolation. Interpolation lets us use `require` statements in our `HTML` so that we can ask webpack to load in images a certain way.

For images, we use **responsive-loader** to generate a resized versions of our images and generate image data for blurred placeholder versions of our images for us to use inline.

Once our code is transformed with these loaders, the image paths and image data are embedded in our `HTML`. Nice!

### Source CSS and JS

Let’s check out the rest of our source code. See the code comments for explanations on how we use `JS` and `CSS` to fade in the full image once it loads and then remove the placeholder image.

#### CSS:

```css
/*  main.css  */
body {
  background: black;
}
/* overall alignment */
.characters {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
/* parent element */
.hero-pic {
  display: block;
  flex-shrink: 0;
  width: 300px;
  height: 240px;
  position: relative;
  overflow: hidden;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 139px -5px rgba(138, 178, 209, 0.78);
}
/* placeholder image */
.hero-preview {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
/* removes the pointer cursor on  elements
once full image loads */
.hero-pic:not(.replace) {
  cursor: default;
}
/* fades in and positons full image element
once it loads */
.reveal {
  position: absolute;
  left: 0;
  right: 0;
  will-change: opacity;
  animation: reveal 1s ease-out;
}
/* animation for fade in */
@keyframes reveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

#### JS:

```js
/*  loadImages.js  */
function loadFullImages() {
  let imageEls = [].slice.call(document.querySelectorAll(".hero-pic"));
  imageEls.forEach((imageEl) => {
    loadFullImage(imageEl);
  });
  /* creates the image element and sets up a callback to add it
to the page once it loads */
  function loadFullImage(item) {
    const img = new Image();
    img.src = item.href;
    img.className = "reveal";
    if (img.complete) {
      phaseInImg(item, img);
    } else {
      img.addEventListener("load", function fullImageLoaded() {
        phaseInImg(item, img);
        img.removeEventListener("load", fullImageLoaded);
      });
    }
  }
  /* adds full image element to page, removes placeholder element */
  function phaseInImg(item, img) {
    removePreviewFeatures(item);
    item
      .appendChild(img)
      .addEventListener("animationend", function phaseOutPreview(e) {
        let previewImage = item.querySelector(".hero-preview");
        item.removeChild(previewImage);
        e.target.classList.remove("reveal");
        e.target.removeEventListener("animationend", phaseOutPreview);
      });
  }
  /* removes the default behavior of an  element */
  function removePreviewFeatures(item) {
    item.classList.remove("replace");
    item.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
}
```

### Loading CSS and JS

Below is what our `index.js` looks like. This file is where we tell webpack to bring in all the modules we want to use and then use them. A [**module**](https://webpack.js.org/concepts/modules/) in the simplest terms is just a chunk of code from another file that we want to import and use.

Inside of a `JS` file, we can use the ES2015 `import` syntax instead of `require` to bring in modules. For instance, take note that `import loadFullImages from './loadImages'` does the same thing as `const loadFullImages = require('./loadImages)` for us.

```js
/*  index.js  */
import mainStyles from "../css/main.css";
import loadFullImages from "./loadImages";
window.addEventListener("load", function onWindowLoad() {
  loadFullImages();
});
```

In our case, we just have two modules. Notice that modules in webpack are not restricted to `JS` – we can treat `CSS` files as modules, too, if we use the right loaders. This is powerful but can be confusing at first. Once I walk you through how webpack is loading our `CSS` file, however, you’ll see that all we’re doing is minifying our source `CSS` and generating a `main.css` file:

```js
/*
webpack.config.js
CSS specific options
*/
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          "extract-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      // ...
    ],
  },
  // ...
};
```

In the above block of options, notice that we can specify multiple loaders in the `use` property by passing in an array of loader objects. The file then gets processed by each of the loaders starting with the last loader in the array and then ending with the first.

What this block basically says is, “Hey webpack, when you encounter `CSS` files, please use **css-loader** to bring in the `CSS` and minify it, then use **extract-loader** to separate it from being bundled in with our `JS` (more on that [here](https://webpack.js.org/loaders/extract-loader/)), and then use **file-loader** to create a file for us with the name and extension of the original source file (in our case, it names it “main.css”).

This is how we’re telling webpack to load our JS:

```js
/*
webpack.config.js
JS specific options
*/
// ...
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "env",
                {
                  modules: false,
                },
              ],
            ],
          },
        },
      },
      // ...
    ],
  },
  // ...
};
```

What this block basically says is, “Hey webpack, when you encounter `JS` files, please use **babel-loader** and its **env** preset to compile our `JS`. Babel takes our source `JS` written in ES2015+ syntax and compiles it down to browser-friendly ES5. The `modules: false` option tells Babel not to worry about transforming our `import` syntax since webpack is already doing that.

### The Build

If you want to see webpack generate the distribution files, go ahead and install [Node.js](https://nodejs.org/) which comes with [npm](https://www.npmjs.com/) if you don’t yet have these installed. Open up a command line console and `cd` into the project directory. If you’re on Windows and need a \*NIX friendly shell, use Windows Powershell rather than the default Command Prompt.

Once you’re in the project directory, run the `npm install` command to install all the packages we’ve talked about in this guide. Then run the `npm start` command to execute the build. Below is the last bit of webpack configuration that we still need to go over. This is how webpack knows where to send the distribution files:

```js
/*
webpack.config.js
*/
// ...
const path = require("path");
module.exports = {
  entry: {
    app: path.join(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  // ...
};
```

`path` is a utility module that allows us to easily construct file and directory paths that are platform friendly (they will work whether your platform’s file system uses ‘/’ or ‘\’ as path separators). Here we use the `path.join` function to tell webpack where to find and send our files.

`entry` tells webpack which module is the “main” module, the one in which we import all of the other modules that we depend on. `app` is the name we’ve given to the main bundle that webpack will create by stiching together all of our modules.

Finally, `output.path` tells webpack where to send all of the files it creates for us. `output.filename` tells webpack what naming scheme to use for the bundles it creates – in our case, we’re just creating one bundle and it will come out named “app.bundle.js”.

### Conclusion

I hope you were able to learn a bit more about how webpack can help you build stuff through this example. I also hope you took away some other thing from reading this whether it was an image loading technique, a way to write modular `JS`, or even just practice reading someone else’s code. Finally, I hope you were able to fire up the resulting code in a browser and see it in action. Thanks for reading!
