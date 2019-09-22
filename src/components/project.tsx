import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ProjectsQuery_allProjectsJson_edges_node as ProjectQuery } from '../gatsby-queries.d.ts/ProjectsQuery';

import style from '../styles/project.module.css';
import { url } from 'inspector';

interface Props {
  info: ProjectQuery;
  image: FluidObject;
  gif: string;
}

const Project = ({ info, image, gif }: Props) => {
  return (
    <figure className={style.card}>
      <h3>{info.title}</h3>
      <div className={style.imageContainer}>
        <div
          className={style.gif}
          style={{
            backgroundImage: `url(${gif})`,
          }}
        />
        <Img fluid={image} className={style.staticImage} />
      </div>
      <figcaption dangerouslySetInnerHTML={{ __html: info.excerpt || '' }} />
    </figure>
  );
};

export default Project;
