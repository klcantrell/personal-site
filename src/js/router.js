export default function Router() {
  const routes = {};
  const activeRoute = {};
  const previousRoute = {};

  function updateRouteObj(routeToUpdate, routeToCopy) {
    Object.keys(routeToCopy).forEach((prop) => {
      routeToUpdate[prop] = routeToCopy[prop];
    });
  }

  return {
    add(route, controller) {
      routes[route] = { rule: route, controller };
      return this;
    },

    initHistory() {
      const pathname = location.pathname.substring(1);
      if (pathname === '') {
        window.history.replaceState('/', null, '');
        updateRouteObj(activeRoute, routes['/']);
      } else {
        window.history.replaceState(pathname, null, pathname);
        updateRouteObj(activeRoute, routes[pathname]);
        updateRouteObj(previousRoute, routes['/']);
        this.updateView();
      }
      return this;
    },

    bindPopstate() {
      const _this = this;
      window.addEventListener('popstate', (e) => {
        if (activeRoute.rule !== e.state) {
          updateRouteObj(previousRoute, activeRoute);
          updateRouteObj(activeRoute, routes[e.state]);
          _this.updateView();
        }
      });
      return this;
    },

    onRouteChange(routeName) {
      if (activeRoute.rule !== routeName) {
        updateRouteObj(previousRoute, activeRoute);
        updateRouteObj(activeRoute, routes[routeName]);
        window.history.pushState(routeName, null, routeName);
        this.updateView();
      }
      return this;
    },

    updateView() {
      activeRoute.controller.renderSection(activeRoute.rule);
      previousRoute.controller.dismountSection(previousRoute.rule);
      return this;
    },
  };
}
