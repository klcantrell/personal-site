import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import AboutMe from '../components/aboutMe';
import HorizontalRule from '../components/horizontalRule';
import Skills, { Tech } from '../components/skills';

const {
  JAVASCRIPT,
  CSS,
  HTML,
  REACT,
  NODE,
  JAVA,
  AWS,
  GRAPHQL,
  REASONML,
} = Tech;

const About = () => (
  <Layout>
    <Seo title="About" />
    <AboutMe />
    <h4>I have experience with...</h4>
    <Skills
      skills={[
        JAVASCRIPT,
        CSS,
        HTML,
        REACT,
        NODE,
        JAVA,
        AWS,
        GRAPHQL,
        REASONML,
      ]}
    />
    <HorizontalRule />
  </Layout>
);

export default About;
