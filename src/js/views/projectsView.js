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
    },
  };

  const techIcons = {
    HTML: html`
      <svg width="30" height="30" viewBox="0 0 384 512">
        <path
          fill="rgb(39, 39, 39)" 
          d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 
            127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 
            27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 
            53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
      </svg>`,
    CSS: html`
      <svg width="30" height="30" viewBox="0 0 512 512">
        <path
            fill="rgb(39, 39, 39)" 
            d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 
              390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"/>
      </svg>`,
    JavaScript: html`
      <svg width="30" height="30" viewBox="0 0 448 512">
        <path
          fill="rgb(39, 39, 39)" 
          d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 
            63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 
            21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 
            63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 
            25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 
            0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 
            290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 
            7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 
            37.8-29.8 58.6-69.7 58.6z"/>
      </svg>`,
  };

  function projectsOverlayTemplate(project) {
    return html`
      <button closeOverlay class="close-overlay">X</button>
      <h3>${project.title}</h3>
      <figure style="background-image: url(
        ${project.image ? project.image.src : project.backupImage.src}
      )"></figure>
      <h4>Links</h4>
      <div class="projects__links-icons icons--base">
        <i> See the site
          <svg width="50" height="50" viewBox="0 0 640 512">
            <path
              fill="rgb(39, 39, 39)" 
                d="M112 352h416c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H112C85.5 
                  0 64 21.5 64 48v256c0 26.5 21.5 48 48 48zM96 48c0-8.8 7.2-16 16-16h416c8.8 
                  0 16 7.2 16 16v256c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V48zm532 
                  336H366c-3.3 0-6 2.7-6 6v10c0 13.3-10.7 24-24 24h-32c-13.3 
                  0-24-10.7-24-24v-10c0-3.3-2.7-6-6-6H12c-6.6 0-12 5.4-12 12v68c0 26.5 
                  21.5 48 48 48h544c26.5 0 48-21.5 48-48v-68c0-6.6-5.4-12-12-12zm-20 80c0 8.8-7.2 
                  16-16 16H48c-8.8 0-16-7.2-16-16v-48h224c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 
                  32-32h224v48z"/>
          </svg>
        </i>
        <span class="vr"></span>
        <i> See the code
          <svg width="50" height="50" viewBox="0 0 496 512">
            <path
              fill="rgb(39, 39, 39)" 
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 
                  2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 
                  4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 
                  2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 
                  4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 
                  252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 
                  0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 
                  0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 
                  16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 
                  2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 
                  62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 
                  25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 
                  17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 
                  496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 
                  5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 
                  1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 
                  35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 
                  3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
          </svg>
        </i>
      </div>
      <p>${project.description}</p>
      <p>User can:</p>
      ${generateListMarkup(project.userCan)}
      <p>Tech Highlights:</p>
      ${generateListMarkup(project.techHighlights)}
      <h4>Technologies used</h4>
      ${generateIconsMarkup(project.techUsed)}
    `;
  }

  function generateIconsMarkup(icons) {
    let iconsMarkup = '';
    iconsMarkup += html`<div class="projects__tech-icons icons--base">`;
    icons.forEach(icon => {
      iconsMarkup += html`<i>${icon}${techIcons[icon]}</i>`;
    });
    iconsMarkup += html`</div>`;
    return iconsMarkup;
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
