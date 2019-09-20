import React from 'react';
import { ProjectsQuery_allProjectsJson_edges_node as ProjectQuery } from '../gatsby-queries.d.ts/ProjectsQuery';

interface Props {
  info: ProjectQuery;
}

const Project = ({ info }: Props) => {
  return (
    <div>
      <p>{`This is the ${info.title} project`}</p>
      <p>{`It will display ${info.image} image`}</p>
    </div>
  );
};

export default Project;
