import KUTE from 'kute.js';
import 'kute.js/kute-svg';

export default function View(eventBus) {
  const rootEl = document.getElementById('portfolio');
  const triggerEls = Array.from(rootEl.querySelectorAll('a[routeTo]'));
  const nameSVG = rootEl.querySelector('#name');
  const routeMap = {
    '/': {
      triggerName: null,
      section: rootEl.querySelector('section[routeTarget="/"]'),
    },
  };

  function bindEvents() {
    triggerEls.forEach(triggerEl => {
      const triggerName = triggerEl.getAttribute('routeTo');
      routeMap[triggerName] = {
        trigger: triggerEl,
        section: rootEl.querySelector(`section[routeTarget="${triggerName}"]`),
      };

      triggerEl.addEventListener('click', e => {
        e.preventDefault();
        eventBus.emit('routeChange', triggerName);
      });
    });
  }

  function drawName() {
    KUTE.fromTo(
      nameSVG,
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 25000, easing: 'easeIn' },
    ).start();
  }

  return {
    init() {
      bindEvents();
      drawName();
    },
    renderRouteTarget(route) {
      routeMap[route].section.classList.remove('section--hidden');
    },
    dismountRouteTarget(route) {
      routeMap[route].section.classList.add('section--hidden');
    },
  };
}
