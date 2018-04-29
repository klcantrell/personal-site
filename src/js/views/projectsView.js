const p1Pic = require('../../images/p1.jpg?size=600');
const p2Pic = require('../../images/p2.jpg?size=600');
const p3Pic = require('../../images/p3.jpg?size=600');
const p4Pic = require('../../images/p4.jpg?size=600');
const p5Pic = require('../../images/p5.jpg?size=600');
const p6Pic = require('../../images/p6.jpg?size=600');
const p7Pic = require('../../images/p7.jpg?size=600');
const p8Pic = require('../../images/p8.jpg?size=600');
const p9Pic = require('../../images/p9.jpg?size=600');

import {
  k$fadeOut,
  k$fadeIn,
  k$fadeOutDown,
  k$fadeInFromBelow,
  k$delay,
  html,
  k$processResponsiveLoaderData,
  k$loadFullImage,
  k$loadFullGif,
  k$scrollToTop,
  k$doesContentCauseScroll,
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
      title: 'Simon - Morph Edition',
      description:
        "This app is a browser based implementation of the original Simon game.  The game creates a pattern of tones and lights, and challenges the user to repeat the pattern in exact sequence.  This user interface features morphing text that reminds the user whose turn it is and whether they've succeeded or failed.",
      userCan: [
        'See the same series of button presses but with an additional step each time they input the pattern correctly',
        'Hear a sound that corresponds to each button both when the series plays for them and when they press a button',
        'Get notified when they press a wrong button and the series of starts again to remind them of the pattern so they can try again',
        'See how many steps are in the current series of button presses',
        'Hit a button to restart the game to a single step',
        'Play in "strict" mode where if they get a button press wrong, it notifies them that they have done so and the game restarts with a new random series of button presses',
        'Win the game by getting a series of 20 steps correct',
      ],
      techHighlights: [
        'Used <strong>async functions</strong> for handling the flow of the game',
        'Composed the functionality of the CPU and player objects with small factory functions',
      ],
      techUsed: ['JavaScript', 'SVG', 'KUTE.js', 'HTML', 'Sass', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p1Pic.src,
      },
      github: 'https://github.com/klcantrell/simon-game',
      website: 'https://simon-morphedition.surge.sh/',
    },
    p2: {
      title: 'Final Fantasy MiniWiki',
      description:
        "This is a single page app that lets Final Fantasy fans view quick facts about their favorite Final Fantasy characters.  Just by clicking on each picture, the user can select the character they're interested in and the app will load that characters info.  Although the app doesn't trigger a page refresh, it provides the user URLs for each character so that they can quickly revisit the view containing a specific character's info.",
      userCan: [
        'View new character information at the click of a picture',
        "Save a URL to visit the site with a specific character's info loaded",
      ],
      techHighlights: [
        'Used <strong>AJAX</strong> to fetch new character info',
        'Used vanilla JS to re-render views based on selected character',
        'Created a <strong>vanilla JS history API router</strong> from scratch',
        'Images are progressively loaded from blurred placeholders to full images',
      ],
      techUsed: ['JavaScript', 'Pug', 'CSS', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p2Pic.src,
      },
      github: 'https://github.com/klcantrell/finalfantasy-miniwiki-vanillaspa',
      website: 'https://finalfantasy-miniwiki.surge.sh/',
    },
    p3: {
      title: 'Drawn Tic-Tac-Toe',
      description:
        "Upon loading the game, the Tic-Tac-Toe grid draws itself in and the user is asked to select between the 'X' or 'O' symbol.  As the user and the CPU place their symbols on the board, the symbols are drawn in.  Try as they might, the user cannot hope to beat the CPU.  At best, they can achieve a draw.  If the user is not careful, the CPU's logic is coded to pursue a win rather than just place symbols randomly on the board.  Once the game is over, the user is prompted to start over and pick a new symbol.",
      userCan: [
        'Play a game of Tic Tac Toe with the computer',
        'Reset the game as soon as its over to play again',
        "Choose whether to play as 'X' or 'O'",
      ],
      techHighlights: [
        'Used an SVG animation library <strong>KUTE.js</strong> to draw the shapes',
        'Coded the CPU logic and strategy from stratch in vanilla JS',
      ],
      techUsed: ['SVG', 'KUTE.js', 'JavaScript', 'HTML', 'CSS', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p3Pic.src,
      },
      github: 'https://github.com/klcantrell/tic-tac-toe',
      website: 'https://drawn-tictactoe.surge.sh/',
    },
    p4: {
      title: 'K-Calc',
      description: `This is a calculator that uses pure JavaScript for computation and memory.  As soon as you hover over the calculator (or tap on it if on mobile), you experience a bit of fun 3D delight as it rotates in before you need to get to the number crunching.`,
      userCan: [
        'Add, subtract, multiply and divide two numbers',
        'Clear the input field with a clear button',
        'Keep chaining mathematical operations together until the equal button is hit, and the calculator will display the correct output',
      ],
      techHighlights: ['Used <strong>CSS 3D transforms</strong> for the rotation action'],
      techUsed: ['JavaScript', 'HTML', 'CSS', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p4Pic.src,
      },
      github: 'https://github.com/klcantrell/js-calculator',
      website: 'https://k-calc.surge.sh/',
    },
    p5: {
      title: 'WeatherGist',
      description:
        "This weather app gets straight to the point and shows the user their local temperature, a brief description of the weather conditions in their area, and an icon and color animation that portrays that description.  Upon loading, the app immediately requests the user's location and then interfaces with the <strong>Dark Sky API</strong> to retrieve and display the weather information based on that location.",
      userCan: [
        'See the weather in their current location',
        'See a different icon (e.g. rainy clouds, sunny sky) depending on the weather',
        'Push a button to toggle between Fahrenheit and Celsius',
      ],
      techHighlights: [
        'Setup an <strong>AWS lambda function</strong> with <strong>Node.js</strong> to act as a proxy server with the <strong>Dark Sky API</strong>',
        'Used SVG <code>defs</code> and <code>symbol</code> elements to load and switch between different weather icons',
      ],
      techUsed: ['AWS', 'Node.js', 'SVG', 'JavaScript', 'HTML', 'CSS', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p5Pic.src,
      },
      github: 'https://github.com/klcantrell/weather-viewer',
      website: 'https://weathergist.surge.sh/',
    },
    p6: {
      title: 'K-Tatap',
      description:
        'This is an application that turns your keyboard into an electronic drum kit controller.  Key strokes trigger a variety of drum sounds that can be combined to make a beat.  The ear-tickling sounds are accompanied by colorful visuals making the overall experience a pleasure for the senses. The user is guided through some "getting started" prompts when the page first loads.',
      userCan: [
        'Press keys to trigger a sound and a colorful visual',
        'Press multiple keys together rhythmically to create a drum beat',
        'Receive introduction prompts on how to get started with the application',
      ],
      techHighlights: [
        'Used promises to handle the asynchronous interaction that the user has with the introduction prompts',
        'Used canvas JS library <strong>Paper.js</strong> to create the colorful animations',
        'Used audio JS library <strong>Howler.js</strong> to load, cache, and play the drum sounds',
      ],
      techUsed: ['HTML', 'Paper.js', 'CSS', 'Howler.js', 'JavaScript'],
      backupImage: {
        src: p6Pic.src,
      },
      github: 'https://github.com/klcantrell/patatap',
      website: 'https://k-tatap.surge.sh/',
    },
    p7: {
      title: 'Wikipedia Gateway',
      description:
        "This app provides the user a way to enter in search keywords and find content on Wikipedia.  It is built on top Wikipedia's <strong>MediaWiki action API</strong> to find the 10 most relevant articles based on the user's inputted keywords.  Once a search is executed, the interface displays the title of each article and a small snippet of the content.  If users are feeling particularly adventurous, they can press a button that shows them a random Wikipedia article.",
      userCan: [
        'Search Wikipedia entries in a search box and see the resulting Wikipedia entries',
        'Click a button to see a random Wikipedia entry',
        'Get notified if their query returns no results',
      ],
      techHighlights: [
        'Setup an <strong>AWS lambda function</strong> with <strong>Node.js</strong> to act as a proxy server with the <strong>MediaWiki action API</strong>',
        'Setup error handling in case the API or the proxy server returns an error',
      ],
      techUsed: ['AWS', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p7Pic.src,
      },
      github: 'https://github.com/klcantrell/wikipedia-gateway',
      website: 'https://wikipedia-gateway.surge.sh',
    },
    p8: {
      title: 'Spinning Pomodoro',
      description:
        "This app helps users implement the pomodoro technique, which recommends breaking work into short, productive intervals usually 25 minutes long.  The interface not only numerically displays the remaining time, but it also animates different parts of the app to show the user the remaining time.  If the user wishes to customize the timer, they can use the app's controls to set custom work and break intervals.",
      userCan: [
        'Start a 25 minute pomodoro and the timer will turn off once 25 minutes has elapsed',
        'Reset the clock for the next pomodoro',
        'Customize the length of each pomodoro',
      ],
      techHighlights: [
        'Used animation library <strong>KUTE.js</strong> to visually convey time remaining',
        'Used <strong>ES2015 classes</strong> to encapsulate main timer and break timer functionality',
      ],
      techUsed: ['JavaScript', 'SVG', 'KUTE.js', 'HTML', 'CSS', 'Webpack', 'PostCSS'],
      backupImage: {
        src: p8Pic.src,
      },
      github: 'https://github.com/klcantrell/pomodoro-clock',
      website: 'https://spinning-pomodoro.surge.sh',
    },
    p9: {
      title: 'HydraBase',
      description:
        'This prototype was designed with stories from actual fire fighters in mind.  The app is meant to help fire departments keep track of and share information about fire hydrants especially when requesting mutual aid. The app aims to solve the problem of fire hydrant information being "tribal knowledge" that is hard to keep track of, communicate, and get access to quickly. HydraBase is built on top of the <strong>Google Maps API</strong> and uses web technologies to create a cross-platform web app. The app is intended to be used over the <strong>FirstNet</strong> network that is dedicated to the data needs of first responders.  It was developed at the 2018 AT&T IoT Civic Hack in Indy.',
      userCan: [
        'See the fire hydrants at a given geolocation',
        'Click on a fire hydrant icon to see important information about the hydrant at that location such as its hose size and thread type',
      ],
      techHighlights: [
        'Used the <strong>Google Maps API</strong> to build the user interface on top of',
        'Designed the app with the user stories of actual fire fighters in mind',
        'Developed the app on a team that worked together for the first time, had a variety of skill levels, and was on a tight timeline',
      ],
      techUsed: ['JavaScript', 'Google Maps API', 'SVG', 'HTML', 'CSS'],
      backupImage: {
        src: p9Pic.src,
      },
      github: 'https://github.com/klcantrell/hydrabase',
      website: 'https://hydrabase.surge.sh/',
    },
  };

  function projectsOverlayTemplate(project) {
    return html`
      <div class="projects__item-overlay-content">
        <button closeOverlay class="close-overlay">X</button>
        <h3>${project.title}</h3>
        <figure class="box-shadow--std" style="background-image: url(
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

  function closeOverlay() {
    k$fadeOutDown(content);
    k$fadeOut(overlay);
    k$fadeOut(downArrows);
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
          k$doesContentCauseScroll(content.firstElementChild, content) ? k$fadeIn(downArrows) : '';
          handleInitialScroll();
        });
        k$scrollToTop(content);
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
      k$fadeOut(downArrows);
      content.removeEventListener('scroll', removeDownArrows);
    });
  }

  function loadGifs() {
    if (!areGifsLoaded) {
      areGifsLoaded = true;
      contentItems.forEach((contentItem, idx) => {
        if (contentItem.hasAttribute('projectId')) {
          const projectId = contentItem.getAttribute('projectId');
          const imageUrl = require(`../../images/${projectId}.gif`);
          k$delay(idx * 1500).then(() => {
            k$loadFullGif(
              contentItem.querySelector('.loaded-image-hook'),
              projects[projectId],
              imageUrl,
            );
          });
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
