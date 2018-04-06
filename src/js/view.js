import KUTE from 'kute.js';
import 'kute.js/kute-svg';
import 'kute.js/kute-attr';

export default function View(eventBus) {
  const rootEl = document.getElementById('portfolio');
  const triggerEls = Array.from(rootEl.querySelectorAll('a[routeTo]'));
  const namePath = rootEl.querySelector('#name');
  const arrowPath = rootEl.querySelector('#downArrow');
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

  function drawName(startTime) {
    KUTE.fromTo(
      namePath,
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 25000, easing: 'easeIn' },
    ).start(startTime);
  }

  function drawArrow(startTime) {
    const setupVisibility = KUTE.to(arrowPath, { opacity: '1' }, { duration: 10, delay: 3500 });
    const drawInArrow = KUTE.fromTo(
      arrowPath,
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 1000, easing: 'easeIn', delay: 3500 },
    );
    const fillInArrow = KUTE.fromTo(
      arrowPath,
      { attr: { fillOpacity: 0 } },
      { attr: { fillOpacity: 1 } },
      { duration: 1000, easing: 'easeIn' },
    );
    setupVisibility.start(startTime);
    drawInArrow.chain(fillInArrow).start(startTime);
  }

  return {
    init() {
      bindEvents();
      const now = window.performance.now();
      drawName(now);
      drawArrow(now);
    },
    renderRouteTarget(route) {
      routeMap[route].section.classList.remove('section--hidden');
    },
    dismountRouteTarget(route) {
      routeMap[route].section.classList.add('section--hidden');
    },
  };
}
