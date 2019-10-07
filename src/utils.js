export const throttle = (func, limit) => {
  let inThrottle;
  let lastFunc;
  let lastRan;
  return function throttling(...args) {
    const context = this; // eslint-disable-line
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
};
