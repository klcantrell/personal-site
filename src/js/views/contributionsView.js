import { k$fadeOut, k$fadeIn, k$fadeOutDown, k$fadeInFromBelow, html } from '../utils';
import IconLib from './icons';

export default function ContributionsView(rootEl) {
  const overlay = rootEl.querySelector('.contributions__overlay');
  const content = overlay.querySelector('.contributions__overlay-content');
  const contentItems = Array.from(rootEl.querySelectorAll('.contributions__item'));

  const contributions = {
    c1: {
      title: 'Contribution 1',
      icon: 'GitHub',
      message: 'See the code',
      link: 'https://google.com',
      description: `An Awesome Contribution. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat.  
      Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz 
      VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen 
      freegan green juice hot chicken literally.`,
      role: 'Hackathon participant',
      techUsed: ['Sass', 'PostCSS'],
    },
    c2: {
      title: 'Contribution 2',
      icon: 'Medium',
      message: 'Read the blog',
      link: 'https://google.com',
      description: `Another Awesome Contribution. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat.  
      Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz 
      VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen 
      freegan green juice hot chicken literally.`,
      role: 'Blog author',
      techUsed: ['JavaScript'],
    },
  };

  function contributionsOverlayTemplate(contribution) {
    return html`
      <div class="contributions__item-overlay-content">
        <button closeOverlay class="close-overlay">X</button>
        <h3>${contribution.title}</h3>
        <a class="contributions__overlay-link" href="${contribution.link}" 
        rel="noopener" target="_blank">
          <i>${contribution.message}
              ${IconLib.returnSvgMarkup(contribution.icon)}
          </i>
        </a>
        <p><strong>Role:</strong> ${contribution.role}</p>
        <p>${contribution.description}</p>
        <h4>Technologies used</h4>
  ${IconLib.returnIconsMarkup({
    icons: contribution.techUsed,
    classes: 'contributions__overlay-tech-icons icons--base',
  })}
      </div>
    `;
  }

  function closeOverlay() {
    k$fadeOutDown(content);
    k$fadeOut(overlay);
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

  function handleClickOffOverlayContent() {
    overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        closeOverlay();
      }
    });
  }

  return {
    handleEvents() {
      handleContentItemClicks();
      handleCloseBtnClicks();
      handleClickOffOverlayContent();
    },
    closeOverlay,
  };
}
