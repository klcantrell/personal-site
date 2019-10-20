import React from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import Slider from 'react-slick';

import { ProjectsQuery } from '../gatsby-queries.d.ts/ProjectsQuery';
import { ProjectsQuery_allProjectsJson_edges as ProjectQueryEdge } from '../gatsby-queries.d.ts/ProjectsQuery';
import { sharpImageFields as ProjectImage } from '../gatsby-queries.d.ts/sharpImageFields';

import { Tech } from '../components/skills';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Project from '../components/project';
import CustomArrow from '../components/customArrow';

import style from '../styles/projects.module.css';

const { JAVASCRIPT, HTML, CSS, REACT, NODE, AWS, GRAPHQL } = Tech;

interface Props {
  data: ProjectsQuery;
}

type NullableProjectImage = ProjectImage | null;

const DEFAULT_IMAGE_SETTINGS = {
  aspectRatio: 0,
  src: '',
  srcSet: '',
  sizes: '',
} as FluidObject;

const DEFAULT_PROJECT_EDGE = {
  node: {
    title: '',
    excerpt: '',
    slug: '',
  },
} as ProjectQueryEdge;

const sliderSettings = {
  speed: 500,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 820,
      settings: {
        dots: true,
        arrows: false,
      },
    },
  ],
  prevArrow: <CustomArrow />,
  nextArrow: <CustomArrow />,
};

const findProjectOrDefault = (edges: ProjectQueryEdge[], projectSlug: string) =>
  edges.find(edge => edge.node.slug === projectSlug) || DEFAULT_PROJECT_EDGE;

const projectFluidImageOrDefault = (projectImage: NullableProjectImage) =>
  (projectImage &&
    projectImage.childImageSharp &&
    (projectImage.childImageSharp.fluid as FluidObject)) ||
  DEFAULT_IMAGE_SETTINGS;

const Projects = ({ data }: Props) => {
  const piChatProjectEdge = findProjectOrDefault(
    data.allProjectsJson.edges,
    'pichat'
  );
  const simonMorphProjectEdge = findProjectOrDefault(
    data.allProjectsJson.edges,
    'simon-morph'
  );
  const swGuessProjectEdge = findProjectOrDefault(
    data.allProjectsJson.edges,
    'sw-guess'
  );

  return (
    <Layout>
      <Seo title="Projects" />
      <header>
        <h1 className={style.header}>Projects</h1>
      </header>
      <div className={style.projectsContainer}>
        <Slider {...sliderSettings}>
          <Project
            info={piChatProjectEdge.node}
            image={projectFluidImageOrDefault(data.piChatImage)}
            gif={
              'https://kals-portfolio-assets.s3.us-east-2.amazonaws.com/main/gifs/p6.gif'
            }
            skills={[GRAPHQL, REACT, AWS, NODE]}
          />
          <Project
            info={simonMorphProjectEdge.node}
            image={projectFluidImageOrDefault(data.simonMorphImage)}
            gif="https://kals-portfolio-assets.s3.us-east-2.amazonaws.com/main/gifs/p1.gif"
            skills={[JAVASCRIPT, HTML, CSS]}
          />
          <Project
            info={swGuessProjectEdge.node}
            image={projectFluidImageOrDefault(data.swGuessImage)}
            gif={
              'https://kals-portfolio-assets.s3.us-east-2.amazonaws.com/main/gifs/p5.gif'
            }
            skills={[NODE, AWS, REACT]}
          />
        </Slider>
      </div>
    </Layout>
  );
};

export const query = graphql`
  fragment sharpImageFields on File {
    childImageSharp {
      fluid(maxWidth: 1200) {
        tracedSVG
        aspectRatio
        src
        srcSet
        sizes
      }
    }
  }

  query ProjectsQuery {
    allProjectsJson {
      edges {
        node {
          title
          slug
          excerpt
          github
          website
        }
      }
    }
    piChatImage: file(relativePath: { eq: "pichat.jpg" }) {
      ...sharpImageFields
    }
    simonMorphImage: file(relativePath: { eq: "simon-morph.jpg" }) {
      ...sharpImageFields
    }
    swGuessImage: file(relativePath: { eq: "sw-guess.jpg" }) {
      ...sharpImageFields
    }
  }
`;

export default Projects;
