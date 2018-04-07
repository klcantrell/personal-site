function k$fetchData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data);
}

function k$fetchImg(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(data => data);
}

function k$html(literals, ...customs) {
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

export { k$fetchData, k$fetchImg, k$html, EventBus, k$classListAdd, k$classListRemove, k$delay };
