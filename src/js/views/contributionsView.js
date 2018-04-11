import { k$fadeOut, k$fadeIn, k$hide, k$show, k$fadeOutDown, k$fadeInFromBelow } from '../utils';

export default function ContributionsView(rootEl) {
  const overlay = rootEl.querySelector('.contributions__overlay');
  const content = overlay.querySelector('.contributions__overlay-content');
  const closeBtn = overlay.querySelector('.close-overlay');

  closeBtn.addEventListener('click', () => {
    k$fadeOutDown(content);
    k$fadeOut(overlay).then(() => {
      k$hide(overlay);
    });
  });
}
