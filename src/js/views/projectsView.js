import { k$fadeOut, k$fadeIn, k$fadeOutDown, k$fadeInFromBelow } from '../utils';

export default function ProjectsView(rootEl) {
  const overlay = rootEl.querySelector('.projects__overlay');
  const content = overlay.querySelector('.projects__overlay-content');
  const closeBtn = overlay.querySelector('.close-overlay');
  const contentItems = Array.from(rootEl.querySelectorAll('.projects__item'));

  function handleCloseBtnClicks() {
    closeBtn.addEventListener('click', () => {
      k$fadeOutDown(content);
      k$fadeOut(overlay);
    });
  }

  function handleContentItemClicks() {
    contentItems.forEach((contentItem) => {
      contentItem.addEventListener('click', () => {
        k$fadeIn(overlay);
        k$fadeInFromBelow(content);
      });
    });
  }

  function closeOverlay() {
    k$fadeOutDown(content);
    k$fadeOut(overlay);
  }

  return {
    handleEvents() {
      handleContentItemClicks();
      handleCloseBtnClicks();
    },
    closeOverlay,
  };
}
