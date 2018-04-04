function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data);
}

function fetchImg(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(data => data);
}

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

export { fetchData, fetchImg, html, EventBus };
