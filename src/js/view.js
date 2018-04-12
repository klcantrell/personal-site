import { k$scrollToTop, k$fadeOut, k$fadeIn, k$hide } from './utils';

import SplashView from './views/splashView';
import ProjectsView from './views/projectsView';
import ContributionsView from './views/contributionsView';

export default function View(eventBus) {
  const rootEl = document.getElementById('portfolio');
  const triggerEls = Array.from(rootEl.querySelectorAll('a[routeTo]'));
  const menuBtns = Array.from(rootEl.querySelectorAll('.route-links__menuBtn'));
  const contentPageMenus = Array.from(rootEl.querySelectorAll('.route-links__menu'));

  const routeMap = {
    '/': {
      triggerName: null,
      section: rootEl.querySelector('section[routeTarget="/"]'),
    },
  };

  const splashView = SplashView(rootEl, eventBus);
  const projectsView = ProjectsView(rootEl);
  const contributionsView = ContributionsView(rootEl);

  function createRouteMap() {
    triggerEls.forEach((triggerEl) => {
      const triggerName = triggerEl.getAttribute('routeTo');
      routeMap[triggerName] = {
        trigger: triggerEl,
        section: rootEl.querySelector(`section[routeTarget="${triggerName}"]`),
      };
    });
  }

  function bindEvents() {
    enableRouteTriggers();
    handleMenuBtnsClick();
    splashView.morphArrowOnScroll();
    projectsView.handleEvents();
    contributionsView.handleEvents();
  }

  function enableRouteTriggers() {
    triggerEls.forEach((triggerEl) => {
      triggerEl.addEventListener('click', triggerRouteChange);
    });
  }

  function disableRouteTriggers() {
    triggerEls.forEach((triggerEl) => {
      triggerEl.removeEventListener('click', triggerRouteChange);
    });
  }

  function triggerRouteChange(e) {
    const triggerName = e.currentTarget.getAttribute('routeTo');
    e.preventDefault();
    eventBus.emit('routeChange', triggerName);
  }

  function handleMenuBtnsClick() {
    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('route-links__menuBtn--active');
        contentPageMenus.forEach((contentPageMenu) => {
          contentPageMenu.classList.toggle('route-links__menu--show');
        });
      });
    });
  }

  function hideContentPageMenus() {
    menuBtns.forEach((menuBtn) => {
      menuBtn.classList.remove('route-links__menuBtn--active');
    });
    contentPageMenus.forEach((contentPageMenu) => {
      contentPageMenu.classList.remove('route-links__menu--show');
    });
  }

  return {
    init() {
      createRouteMap();
      bindEvents();
      splashView.introSequence();
    },
    renderRouteTarget(route) {
      const el = routeMap[route].section;
      if (route === '/') {
        splashView.startBigLetterMorph();
      }
      k$scrollToTop();
      k$fadeIn(el);
      hideContentPageMenus();
      projectsView.closeOverlay();
      contributionsView.closeOverlay();
    },
    dismountRouteTarget(route) {
      const el = routeMap[route].section;
      if (route === '/') {
        k$hide(el);
        splashView.resetBigLetterK();
      } else {
        disableRouteTriggers();
        k$fadeOut(el).then(() => {
          enableRouteTriggers();
        });
      }
    },
  };
}
