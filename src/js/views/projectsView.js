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
  k$scrollToTop,
} from '../utils';

import IconLib from './icons';

export default function ProjectsView(rootEl) {
  const overlay = rootEl.querySelector('.projects__overlay');
  const content = overlay.querySelector('.projects__overlay-content');
  const downArrows = overlay.querySelector('.projects__overlay-down-arrows');
  const contentItems = Array.from(rootEl.querySelectorAll('.projects__item'));

  let areGifsLoaded = false;

  const projects = {
    p1: {
      title: 'Project 1',
      description: `An Awesome Project. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat. 
        Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz 
        VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen 
        freegan green juice hot chicken literally.`,
      userCan: ['Be Productive', 'Do cool stuff', 'Look real smart'],
      techHighlights: ['Latest technology', 'Hippest tools', 'Performant techniques'],
      techUsed: ['HTML', 'CSS', 'JavaScript'],
      backupImage: {
        src: p1Pic.src,
      },
      github: 'https://github.com/klcantrell/wikipedia-crawler',
      website: 'http://kals-practice-history-router.surge.sh/',
    },
    p2: {
      title: 'Project 2',
      description: `Another Awesome Project. Crucifix gochujang hell of, letterpress copper mug gastropub waistcoat.  
        Kitsch marfa squid, man bun food truck gochujang copper mug. Man braid iPhone schlitz 
        VHS flexitarian. Cronut tattooed irony banjo hashtag snackwave. Intelligentsia franzen 
        freegan green juice hot chicken literally.`,
      userCan: ['Be Productive', 'Do cool stuff', 'Look real smart'],
      techHighlights: ['Latest technology', 'Hippest tools', 'Performant techniques'],
      techUsed: ['HTML', 'CSS', 'JavaScript'],
      backupImage: {
        src: p2Pic.src,
      },
      github: 'https://github.com/klcantrell/weather-viewer',
      website: 'http://kals-practice-history-router.surge.sh/cloud-strife',
    },
  };

  function projectsOverlayTemplate(project) {
    return html`
      <div class="projects__item-overlay-content">
        <button closeOverlay class="close-overlay">X</button>
        <h3>${project.title}</h3>
        <figure style="background-image: url(
          ${project.image ? project.image.src : project.backupImage.src}
        )"></figure>
        <h4>Links</h4>
        <div class="projects__overlay-links-icons icons--base">
          <a href="${project.website}" rel="noopener" target="_blank">
            <i> See the site
              ${IconLib.returnSvgMarkup('Computer')}
            </i>
          </a>
          <span class="vr"></span>
          <a href="${project.github}" rel="noopener" target="_blank">
            <i> See the code
              ${IconLib.returnSvgMarkup('GitHub')}
            </i>
          </a>
        </div>
        <div class="projects__overlay-footer">
          <h4>Description</h4>
          <p>${project.description}</p>
          <p>User can:</p>
          ${generateListMarkup(project.userCan)}
          <p>Tech Highlights:</p>
          ${generateListMarkup(project.techHighlights)}
          <h4>Technologies used</h4>
          ${IconLib.returnIconsMarkup({
            icons: project.techUsed,
            classes: 'projects__overlay-tech-icons icons--base',
          })}
        </div>
      </div>
    `;
  }

  function generateListMarkup(listItems) {
    let listMarkup = '';
    listMarkup += html`<ul class="">`;
    listItems.forEach(listItem => {
      listMarkup += html`<li>${listItem}</li>`;
    });
    listMarkup += html`</ul>`;
    return listMarkup;
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
        k$fadeInFromBelow(content).then(() => {
          k$fadeIn(downArrows);
        });
        k$scrollToTop(content);
        handleInitialScroll();
      });
    });
  }

  function handleClickOffOverlayContent() {
    overlay.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        closeOverlay();
      }
    });
  }

  function handleInitialScroll() {
    content.addEventListener('scroll', function removeDownArrows() {
      console.log('handling scroll');
      k$fadeOut(downArrows);
      content.removeEventListener('scroll', removeDownArrows);
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
      handleClickOffOverlayContent();
    },
    closeOverlay,
    loadGifs,
  };
}
