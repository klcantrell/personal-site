import React from 'react';
import { graphql } from 'gatsby';
import { ProjectsQuery } from '../gatsby-queries.d.ts/ProjectsQuery';
import { ProjectsQuery_allProjectsJson_edges as ProjectQueryEdge } from '../gatsby-queries.d.ts/ProjectsQuery';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Project from '../components/project';

import style from '../styles/projects.module.css';

interface Props {
  data: ProjectsQuery;
}

const Projects = ({ data }: Props) => (
  <Layout>
    <Seo title="Projects" />
    <header>
      <h1 className={style.header}>Projects</h1>
    </header>
    {data.allProjectsJson.edges.map(({ node }: ProjectQueryEdge, index) => (
      <Project key={node.title || index} info={node} />
    ))}
  </Layout>
);

export const query = graphql`
  query ProjectsQuery {
    allProjectsJson {
      edges {
        node {
          title
          excerpt
          image
        }
      }
    }
  }
`;

export default Projects;
