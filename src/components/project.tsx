import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ProjectsQuery_allProjectsJson_edges_node as ProjectQuery } from '../gatsby-queries.d.ts/ProjectsQuery';

import Divider from '../components/divider';
import HorizontalRule from '../components/horizontalRule';
import Skills, { Tech } from './skills';

import style from '../styles/project.module.css';

interface Props {
  info: ProjectQuery;
  image: FluidObject;
  gif: string;
  skills: Tech[];
}

type NullableHTMLImageElement = HTMLImageElement | null;

const Project = ({ info, image, gif, skills }: Props) => {
  const [gifLoaded, setGifLoaded] = React.useState(false);

  let gifLoader =
    typeof window !== 'undefined' && (new Image() as NullableHTMLImageElement);
  if (gifLoader) {
    gifLoader.onload = () => {
      setGifLoaded(true);
      gifLoader = null;
    };
    gifLoader.src = gif;
  }

  return (
    <figure className={style.card}>
      <h3 className={style.title}>{info.title}</h3>
      <div className={style.imageContainer}>
        <div
          className={style.gif}
          style={{
            backgroundImage: gifLoaded ? `url(${gif})` : '',
          }}
        />
        <Img
          fluid={image}
          className={`${style.staticImage} ${
            gifLoaded ? style.staticImageHide : ''
          }`}
        />
      </div>
      <div className={style.descriptionContainer}>
        <figcaption dangerouslySetInnerHTML={{ __html: info.excerpt || '' }} />
        <div className={style.links}>
          <div className={style.link}>
            <svg
              className={style.linkIcon}
              width="30"
              height="30"
              viewBox="0 0 640 512"
            >
              <path d="M112 352h416c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v256c0 26.5 21.5 48 48 48zM96 48c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v256c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V48zm532 336H366c-3.3 0-6 2.7-6 6v10c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24v-10c0-3.3-2.7-6-6-6H12c-6.6 0-12 5.4-12 12v68c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-68c0-6.6-5.4-12-12-12zm-20 80c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-48h224c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32h224v48z" />
            </svg>
            <a
              href={info.website || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              See the site
            </a>
          </div>
          <Divider width="5" />
          <div className={style.link}>
            <svg
              className={style.linkIcon}
              width="30"
              height="30"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
            <a
              href={info.github || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              See the code
            </a>
          </div>
        </div>
      </div>
      <HorizontalRule className={style.horizontalRule} />
      <div className={style.skillsContainer}>
        <h4 className={style.skillsHeading}>Tech used</h4>
        <Skills className={style.skills} skills={skills} />
      </div>
    </figure>
  );
};

export default Project;
