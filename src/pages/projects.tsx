import React from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { ProjectsQuery } from '../gatsby-queries.d.ts/ProjectsQuery';
import { ProjectsQuery_allProjectsJson_edges as ProjectQueryEdge } from '../gatsby-queries.d.ts/ProjectsQuery';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Project from '../components/project';

import piChatGif from '../images/pichat.gif';
import style from '../styles/projects.module.css';

interface Props {
  data: ProjectsQuery;
}

const DEFAULT_IMAGE_SETTINGS = {
  aspectRatio: 0,
  src: '',
  srcSet: '',
  sizes: '',
} as FluidObject;

const Projects = ({ data }: Props) => (
  <Layout>
    <Seo title="Projects" />
    <header>
      <h1 className={style.header}>Projects</h1>
    </header>
    <div className={style.projectsContainer}>
      {data.allProjectsJson.edges.map(({ node }: ProjectQueryEdge, index) => (
        <Project
          key={node.title || index}
          info={node}
          image={
            (data.piChatImage &&
              data.piChatImage.childImageSharp &&
              (data.piChatImage.childImageSharp.fluid as FluidObject)) ||
            DEFAULT_IMAGE_SETTINGS
          }
          gif={piChatGif}
        />
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query ProjectsQuery {
    allProjectsJson {
      edges {
        node {
          title
          excerpt
        }
      }
    }
    piChatImage: file(relativePath: { eq: "pichat.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          tracedSVG
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
  }
`;

export default Projects;
