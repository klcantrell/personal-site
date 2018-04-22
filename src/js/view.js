import { k$scrollToTop, k$fadeOut, k$fadeIn, k$hide } from './utils';

import SplashView from './views/splashView';
import ProjectsView from './views/projectsView';
import ContributionsView from './views/contributionsView';

export default function View(eventBus) {
  const rootEl = document.getElementById('portfolio');
  const triggerEls = Array.from(rootEl.querySelectorAll('a[routeTo]'));
  const menuBtn = rootEl.querySelector('.menu-btn');
  const contentPageNavs = Array.from(rootEl.querySelectorAll('.route-links'));
  const branding = document.querySelector('.branding');

  const splashView = SplashView(rootEl, eventBus);
  const projectsView = ProjectsView(rootEl);
  const contributionsView = ContributionsView(rootEl);

  const routeMap = {};

  function createRouteMap() {
    triggerEls.forEach((triggerEl) => {
      const triggerName = triggerEl.getAttribute('routeTo');
      routeMap[triggerName] = {
        trigger: triggerEl,
        section: rootEl.querySelector(`section[routeTarget="${triggerName}"]`),
      };
    });
  }

  function addSpecialRenders() {
    routeMap['/'].specialRender = () => {
      k$fadeOut(menuBtn);
      k$fadeOut(branding);
      splashView.startBigLetterMorph();
    };
    routeMap.projects.specialRender = () => {
      projectsView.loadGifs();
      projectsView.closeOverlay();
    };
    routeMap.contributions.specialRender = () => {
      contributionsView.closeOverlay();
    };
  }

  function bindEvents() {
    enableRouteTriggers();
    handleMenuBtnsClick();
    splashView.handleScroll();
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
    menuBtn.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('menu-btn--active');
      contentPageNavs.forEach((contentPageNav) => {
        contentPageNav.classList.toggle('route-links__menu--show');
      });
    });
  }

  function hideContentPageNavs() {
    menuBtn.classList.remove('menu-btn--active');
    contentPageNavs.forEach((contentPageNav) => {
      contentPageNav.classList.remove('route-links__menu--show');
    });
  }

  return {
    init() {
      createRouteMap();
      addSpecialRenders();
      bindEvents();
      splashView.introSequence();
    },
    renderRouteTarget(route) {
      const el = routeMap[route].section;
      if (routeMap[route].specialRender) {
        routeMap[route].specialRender();
      }
      k$scrollToTop(window);
      k$fadeIn(el);
      hideContentPageNavs();
    },
    dismountRouteTarget(route) {
      const el = routeMap[route].section;
      if (route === '/') {
        k$hide(el);
        k$fadeIn(menuBtn);
        k$fadeIn(branding);
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
