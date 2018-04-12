import { k$fadeOut, k$fadeIn, k$fadeOutDown, k$fadeInFromBelow, html } from '../utils';

export default function ContributionsView(rootEl) {
  const overlay = rootEl.querySelector('.contributions__overlay');
  const content = overlay.querySelector('.contributions__overlay-content');
  const closeBtn = overlay.querySelector('.close-overlay');
  const contentItems = Array.from(rootEl.querySelectorAll('.contributions__item'));

  const contributions = {
    c1: {
      title: 'Contribution 1',
      description: 'An Awesome Contribution',
      icon: 'github',
    },
    c2: {
      title: 'Contribution 2',
      description: 'Another Awesome Contribution',
      icon: 'medium',
    },
  };

  function contributionsOverlayTemplate(contribution) {
    return html`
      <button closeOverlay class="close-overlay">X</button>
      <h3>${contribution.title}</h3>
      <p>${contribution.description}</p>
      <i>${contribution.icon}</i>
    `;
  }

  function handleCloseBtnClicks() {
    content.addEventListener('click', (e) => {
      if (e.target.hasAttribute('closeOverlay')) {
        e.stopPropagation();
        closeOverlay();
      }
    });
  }

  function handleContentItemClicks() {
    contentItems.forEach((contentItem) => {
      contentItem.addEventListener('click', (e) => {
        const contributionId = e.currentTarget.getAttribute('contributionId');
        content.innerHTML = contributionsOverlayTemplate(contributions[contributionId]);
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
