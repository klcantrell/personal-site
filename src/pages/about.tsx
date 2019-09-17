import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import AboutMe from '../components/aboutMe';
import HorizontalRule from '../components/horizontalRule';
import Skills from '../components/skills';

const About = () => (
  <Layout>
    <Seo title="About" />
    <AboutMe />
    <HorizontalRule />
    <Skills />
  </Layout>
);

export default About;
