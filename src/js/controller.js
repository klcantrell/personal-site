export default function Controller(view) {
  return {
    renderSection(route) {
      view.renderRouteTarget(route);
    },
    dismountSection(route) {
      view.dismountRouteTarget(route);
    },
  };
}
