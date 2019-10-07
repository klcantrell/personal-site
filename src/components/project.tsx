import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ProjectsQuery_allProjectsJson_edges_node as ProjectQuery } from '../gatsby-queries.d.ts/ProjectsQuery';

import style from '../styles/project.module.css';

interface Props {
  info: ProjectQuery;
  image: FluidObject;
  gif: string;
}

type NullableHTMLImageElement = HTMLImageElement | null;

const Project = ({ info, image, gif }: Props) => {
  const [gifLoaded, setGifLoaded] = React.useState(false);

  let gifLoader = new Image() as NullableHTMLImageElement;
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
      <figcaption
        className={style.caption}
        dangerouslySetInnerHTML={{ __html: info.excerpt || '' }}
      />
    </figure>
  );
};

export default Project;
