export default function Controller(view) {
  return {
    renderSection(route) {
      view.scrollToTop();
      view.renderRouteTarget(route);
    },
    dismountSection(route) {
      view.scrollToTop();
      view.dismountRouteTarget(route);
    },
  };
}
