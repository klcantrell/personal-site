function html(literals, ...customs) {
  let result = '';
  customs.forEach((custom, i) => {
    const lit = literals[i];
    if (Array.isArray(custom)) {
      custom = custom.join('');
    }
    result += lit;
    result += custom;
  });
  result += literals[literals.length - 1];
  return result;
}

function EventBus() {
  const events = {};
  return {
    on(eventName, func) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(func);
    },

    emit(eventName, ...args) {
      events[eventName].forEach((func) => {
        func(args[0], ...args);
      });
    },
  };
}

function k$classListAdd(el, classToAdd) {
  const existingClasses = el.getAttribute('class');
  el.setAttribute('class', `${existingClasses} ${classToAdd}`);
}

function k$classListRemove(el, classToRemove) {
  const existingClasses = el.getAttribute('class');
  const newClassList = existingClasses
    .split(' ')
    .filter(el => el !== classToRemove)
    .join(' ');
  el.setAttribute('class', newClassList);
}

function k$delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function k$throttle(func, limit) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  return function throttling(...args) {
    const context = this;
    if (!inThrottle) {
      window.requestAnimationFrame(func.bind(context, args));
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          window.requestAnimationFrame(func.bind(context, args));
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function k$whenTopTwoThirdsInView(func, el) {
  const windowT = window.pageYOffset;
  const windowB = windowT + window.innerHeight;
  const cRect = el.getBoundingClientRect();
  const elT = windowT + cRect.top;
  const elTopTwoThirds = cRect.height / 3 * 2 + elT;

  if (windowB > elTopTwoThirds) {
    func();
  }
}

function k$doesContentCauseScroll(contentEl, parentEl) {
  const contentHeight = contentEl.getBoundingClientRect().height;
  const parentHeight = parentEl.getBoundingClientRect().height;
  return contentHeight > parentHeight;
}

function k$bounceEl(el) {
  k$classListAdd(el, 'bounce');
  return new Promise((resolve) => {
    k$delay(4000).then(() => {
      resolve();
    });
  });
}

function k$scrollToTop(el) {
  el.scrollTo(0, 0);
}

function k$fadeOut(el) {
  el.classList.add('fade-out');
  return new Promise((resolve) => {
    k$delay(450).then(() => {
      k$hide(el);
      el.classList.remove('fade-out');
      resolve();
    });
  });
}

function k$fadeIn(el) {
  el.classList.add('fade-in');
  k$show(el);
  return new Promise((resolve) => {
    k$delay(450).then(() => {
      el.classList.remove('fade-in');
      resolve();
    });
  });
}

function k$fadeOutDown(el) {
  el.classList.add('fade-out-down');
  return new Promise((resolve) => {
    k$delay(350).then(() => {
      k$hide(el);
      el.classList.remove('fade-out-down');
      resolve();
    });
  });
}

function k$fadeInFromBelow(el) {
  el.classList.add('fade-in-from-below');
  k$show(el);
  return new Promise((resolve) => {
    k$delay(350).then(() => {
      el.classList.remove('fade-in-from-below');
      resolve();
    });
  });
}

function k$show(el) {
  el.classList.remove('el--hidden');
}

function k$hide(el) {
  el.classList.add('el--hidden');
}

function k$loadFullImage(el, imageUrls) {
  let image = new Image();
  const url = window.innerWidth > 600 ? imageUrls.large.path : imageUrls.small.path;
  image.src = url;
  if (image.complete) {
    el.style.backgroundImage = `url(${url})`;
    k$fadeIn(el);
    image = null;
  } else {
    image.addEventListener('load', function fullImageLoaded() {
      el.style.backgroundImage = `url(${url})`;
      k$fadeIn(el);
      image.removeEventListener('load', fullImageLoaded);
      image = null;
    });
  }
}

function k$loadFullGif(el, cacheLocation, imageUrl) {
  let image = new Image();
  image.src = imageUrl;
  if (image.complete) {
    el.style.backgroundImage = `url(${imageUrl})`;
    k$fadeIn(el);
    cacheLocation.image = image;
    image = null;
  } else {
    image.addEventListener('load', function fullImageLoaded() {
      el.style.backgroundImage = `url(${imageUrl})`;
      k$fadeIn(el);
      image.removeEventListener('load', fullImageLoaded);
      cacheLocation.image = image;
      image = null;
    });
  }
}

function k$processResponsiveLoaderData(raw) {
  return raw.images.reduce((acc, item) => {
    const sizeMap = {
      800: 'small',
      1200: 'large',
    };
    const key = sizeMap[item.width];
    acc[key] = {
      path: item.path,
    };
    return acc;
  }, {});
}

export {
  html,
  EventBus,
  k$classListAdd,
  k$classListRemove,
  k$delay,
  k$throttle,
  k$whenTopTwoThirdsInView,
  k$bounceEl,
  k$scrollToTop,
  k$fadeOut,
  k$fadeIn,
  k$show,
  k$hide,
  k$fadeOutDown,
  k$fadeInFromBelow,
  k$loadFullImage,
  k$processResponsiveLoaderData,
  k$loadFullGif,
  k$doesContentCauseScroll,
};
