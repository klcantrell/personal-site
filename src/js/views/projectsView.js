const p1Pic = require('../../images/p1.jpg?size=500');
const p2Pic = require('../../images/p2.jpg?size=500');

import {
  k$fadeOut,
  k$fadeIn,
  k$fadeOutDown,
  k$fadeInFromBelow,
  html,
  k$processResponsiveLoaderData,
  k$loadFullImage,
  k$loadFullGif,
} from '../utils';

export default function ProjectsView(rootEl) {
  const overlay = rootEl.querySelector('.projects__overlay');
  const content = overlay.querySelector('.projects__overlay-content');
  const closeBtn = overlay.querySelector('.close-overlay');
  const contentItems = Array.from(rootEl.querySelectorAll('.projects__item'));

  let areGifsLoaded = false;

  const projects = {
    p1: {
      title: 'Project 1',
      description:
        'An Awesome Project. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat. Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen freegan green juice hot chicken literally.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      backupImage: {
        src: p1Pic.src,
      },
    },
    p2: {
      title: 'Project 2',
      description:
        'Another Awesome Project. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat. Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen freegan green juice hot chicken literally.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      backupImage: {
        src: p2Pic.src,
      },
    },
  };

  function projectsOverlayTemplate(project) {
    return html`
      <button closeOverlay class="close-overlay">X</button>
      <h3>${project.title}</h3>
      <figure style="background-image: url(
        ${project.image ? project.image.src : project.backupImage.src}
      )"></figure>
      <p>${project.description}</p>
      <p>User can:</p>
      <p>Tech Highlights:</p>
      ${generateIconsMarkup(project.tech)}
    `;
  }

  function generateIconsMarkup(icons) {
    let iconsMarkup = '';
    iconsMarkup += html`<div class="projects__tech-icons">`;
    icons.forEach(icon => {
      iconsMarkup += html`<i>${icon}</i>`;
    });
    iconsMarkup += html`</div>`;
    return iconsMarkup;
  }

  function handleCloseBtnClicks() {
    content.addEventListener('click', e => {
      if (e.target.hasAttribute('closeOverlay')) {
        e.stopPropagation();
        closeOverlay();
      }
    });
  }

  function handleContentItemClicks() {
    contentItems.forEach(contentItem => {
      contentItem.addEventListener('click', e => {
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

  function loadGifs() {
    if (!areGifsLoaded) {
      areGifsLoaded = true;
      contentItems.forEach(contentItem => {
        if (contentItem.hasAttribute('projectId')) {
          const projectId = contentItem.getAttribute('projectId');
          const imageUrl = require(`../../images/${projectId}.gif`);
          k$loadFullGif(
            contentItem.querySelector('.loaded-image-hook'),
            projects[projectId],
            imageUrl,
          );
        }
      });
    }
  }

  return {
    handleEvents() {
      handleContentItemClicks();
      handleCloseBtnClicks();
    },
    closeOverlay,
    loadGifs,
  };
}
