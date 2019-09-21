import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ProjectsQuery_allProjectsJson_edges_node as ProjectQuery } from '../gatsby-queries.d.ts/ProjectsQuery';

import style from '../styles/project.module.css';

interface Props {
  info: ProjectQuery;
  image: FluidObject;
  gif: string;
}

const Project = ({ info, image, gif }: Props) => {
  return (
    <div className={style.projectCard}>
      <p>{`This is the ${info.title} project`}</p>
      <Img fluid={image} className={style.projectImage} />
      <img src={gif} />
    </div>
  );
};

export default Project;
