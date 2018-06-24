import {
  k$fadeOut,
  k$fadeIn,
  k$fadeOutDown,
  k$fadeInFromBelow,
  k$scrollToTop,
  html,
  k$doesContentCauseScroll,
} from '../utils';
import IconLib from './icons';

export default function ContributionsView(rootEl) {
  const overlay = rootEl.querySelector('.contributions__overlay');
  const content = overlay.querySelector('.contributions__overlay-content');
  const downArrows = overlay.querySelector('.contributions__overlay-down-arrows');
  const contentItems = Array.from(rootEl.querySelectorAll('.contributions__item'));

  const contributions = {
    c1: {
      title: 'Free Code Camp Indy',
      icon: 'Meetup',
      message: 'Check them out',
      link: 'https://www.meetup.com/Free-Code-Camp-Indy/',
      description:
        'This group represents the local chapter of Free Code Camp, a community dedicated to open-source developer education.  I attend this group regularly for the high quality content that is presented as well as the encouraging community support for developers of all levels.',
      role: 'Regular Attendee',
      techUsed: ['JavaScript', 'HTML', 'CSS', 'Webpack', 'Git', 'React', 'Vue'],
    },
    c2: {
      title: 'Mini-Hackathon with Free Code Camp and Girl Develop It',
      icon: 'GitHub',
      message: 'See the code',
      link: 'https://github.com/klcantrell/Mini-Hackathon-SpaceX-board',
      description:
        "This was my first ever hackathon-like experience.  Although not a full hackathon, it was a tremendous learning experience.  One big takeaway was that working on a team requires much organization, planning, and a clear goal.  Another one was no matter your skill level, you can contribute much to a project if you have a solid grasp of the basics and you're willing to cooperate and learn.",
      role: 'Hackathon participant',
      techUsed: ['JavaScript', 'HTML', 'CSS', 'Git', 'SVG'],
    },
    c3: {
      title: 'From Sound Engineer to Software Engineer — Why I’m Learning to Code',
      icon: 'Medium',
      message: 'Read the blog',
      link:
        'https://medium.freecodecamp.org/how-and-why-a-sound-engineer-started-learning-to-code-2a3ae7fac5cc',
      description:
        'In this article, I tell the story of how I got into code and what inspired me to start learning.',
      role: 'Blog author',
      techUsed: ['JavaScript', 'HTML', 'CSS'],
    },
    c4: {
      title: 'Promises and Pokemon — how I learned to think in async',
      icon: 'Medium',
      message: 'Read the blog',
      link:
        'https://medium.freecodecamp.org/promises-and-pokemon-how-i-learned-to-think-in-async-2ec098c2c90d',
      description:
        'In this article, I tell the story of how I built a simple turn-based battle game to help me learn to write asynchronous JavaScript.  I walk the reader through the technical aspects in hopes that it will help them see what promises and async functions help you do in JavaScript.',
      role: 'Blog author',
      techUsed: ['JavaScript', 'HTML', 'CSS'],
    },
    c5: {
      title: 'Learn Webpack by example: Blurred placeholder images',
      icon: 'Medium',
      message: 'Read the blog',
      link:
        'https://medium.freecodecamp.org/learn-webpack-by-example-blurred-placeholder-images-4ad8b1751709',
      description:
        'In this article, I help the reader learn Webpack by examining a concrete example.  The article is written as a tutorial that has the reader build a progressive image loader.  Along the way, the reader learns Webpack terminology and sees how it works. By the end, the reader has the basic knowledge needed to construct a Webpack build themselves.',
      role: 'Blog author',
      techUsed: ['JavaScript', 'HTML', 'CSS', 'Webpack', 'Git'],
    },
    c6: {
      title: 'Self-Taught Student Talks',
      icon: 'Podcast',
      message: 'Listen to it',
      link:
        'http://www.lavieencode.net/podcast/026-self-taught-student-talks-with-kalalau-cantrell',
      description:
        'The host of La Vie En Code, Nicole Archambault, read my <a class="contributions__inline-link" href="https://medium.freecodecamp.org/how-and-why-a-sound-engineer-started-learning-to-code-2a3ae7fac5cc" rel="noopener" target="_blank">blog story</a> and then contacted me to be a guest on her show.  In this podcast episode, we dive into my origin story as a developer in hopes that it will help others in their own journey of learning to code.',
      role: 'Guest on podcast',
      techUsed: ['JavaScript', 'HTML', 'CSS'],
    },
    c7: {
      title: 'AT&T IoT Civic Hackathon',
      icon: 'GitHub',
      message: 'See the code',
      link: 'https://github.com/klcantrell/hydra-base',
      description:
        "At this hackathon, developers were challenged to think of ways to use modern technology to help our police, fire fighters, and emergency medical services perform their jobs more efficiently, safely, and effectively.  Terrible events such as 9/11 and the Boston Marathon Bombing showed our country that first responders need better tools to do their job.  I learned so much at this hackathon - most importantly that developers can have an impact on social good and that technology isn't just about the coolest most cutting edge stuff - it's also about serving people.",
      role: 'Hackathon participant',
      techUsed: ['JavaScript', 'HTML', 'CSS'],
    },
    c8: {
      title: 'freeCodeCamp Indy website',
      icon: 'GitHub',
      message: 'See the code',
      link: 'https://github.com/Free-Code-Camp-Indy/free-code-camp-indy.github.io',
      description:
        'The <a class="contributions__inline-link" href="https://free-code-camp-indy.github.io/" rel="noopener" target="_blank">website</a> for Indy\'s freeCodeCamp meetup is also a local open source project. I have worked with the maintaners of this project to merge pull requests that have resolved open issues in the project\'s codebase.  Check out <a class="contributions__inline-link" href="https://github.com/Free-Code-Camp-Indy/free-code-camp-indy.github.io/pull/65" rel="noopener" target="_blank">one of my contributions</a> to the project.',
      role: 'Contributor',
      techUsed: ['JavaScript', 'HTML', 'Sass', 'Git'],
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
    k$fadeOut(downArrows);
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
        k$fadeInFromBelow(content).then(() => {
          k$doesContentCauseScroll(content.firstElementChild, content) ? k$fadeIn(downArrows) : '';
          handleInitialScroll();
        });
        k$scrollToTop(content);
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

  function handleInitialScroll() {
    content.addEventListener('scroll', function removeDownArrows() {
      k$fadeOut(downArrows);
      content.removeEventListener('scroll', removeDownArrows);
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
