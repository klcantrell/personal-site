export default function View(eventBus) {
  const rootEl = document.getElementById('portfolio');
  const routeMap = {
    '/': {
      triggerName: null,
      section: rootEl.querySelector('section[routeTarget="/"]'),
    },
  };

  const triggerEls = Array.from(rootEl.querySelectorAll('a[routeTo]'));

  triggerEls.forEach((triggerEl) => {
    const triggerName = triggerEl.getAttribute('routeTo');
    routeMap[triggerName] = {
      trigger: triggerEl,
      section: rootEl.querySelector(`section[routeTarget="${triggerName}"]`),
    };

    triggerEl.addEventListener('click', (e) => {
      e.preventDefault();
      eventBus.emit('routeChange', triggerName);
    });
  });

  return {
    renderRouteTarget(route) {
      routeMap[route].section.classList.remove('section--hidden');
    },
    dismountRouteTarget(route) {
      routeMap[route].section.classList.add('section--hidden');
    },
  };
}
