import React from 'react';
import { graphql } from 'gatsby';
import { ProjectsQuery } from '../gatsby-queries.d.ts/ProjectsQuery';
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
      <h1 className={style.header}>
        Projects {data.allProjectsJson.edges[0].node.title}
      </h1>
    </header>
    <Project />
  </Layout>
);

export const query = graphql`
  query ProjectsQuery {
    allProjectsJson {
      edges {
        node {
          title
          image
        }
      }
    }
  }
`;

export default Projects;
