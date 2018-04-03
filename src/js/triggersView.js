export default function TriggersView(eventBus) {
  const elsArray = Array.from(document.querySelectorAll('a[routeTo]'));
  const triggers = {};

  elsArray.forEach((el) => {
    const triggerName = el.getAttribute('routeTo');
    triggers[triggerName] = el;

    el.addEventListener('click', (e) => {
      e.preventDefault();
      eventBus.emit('routeChange', triggerName);
    });
  });

  return {
    addHighlight(triggerName) {
      triggers[triggerName].classList.add('activeTrigger');
    },

    removeHighlight(triggerName) {
      triggers[triggerName].classList.remove('activeTrigger');
    },
  };
}
