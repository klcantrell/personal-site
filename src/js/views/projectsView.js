import { k$fadeOut, k$fadeIn, k$fadeOutDown, k$fadeInFromBelow, html } from '../utils';

export default function ProjectsView(rootEl) {
  const overlay = rootEl.querySelector('.projects__overlay');
  const content = overlay.querySelector('.projects__overlay-content');
  const closeBtn = overlay.querySelector('.close-overlay');
  const contentItems = Array.from(rootEl.querySelectorAll('.projects__item'));

  const projects = {
    p1: {
      title: 'Project 1',
      description: 'An Awesome Project',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
    p2: {
      title: 'Project 2',
      description: 'Another Awesome Project',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
  };

  function projectsOverlayTemplate(project) {
    return html`
      <button closeOverlay class="close-overlay">X</button>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${generateIconsMarkup(project.tech)}
    `;
  }

  function generateIconsMarkup(icons) {
    let iconsMarkup = '';
    icons.forEach((icon) => {
      iconsMarkup += html`<i>${icon}</i>`;
    });
    return iconsMarkup;
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
        const projectId = e.currentTarget.getAttribute('projectId');
        content.innerHTML = projectsOverlayTemplate(projects[projectId]);
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
