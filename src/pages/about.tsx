import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Seo from '../components/seo';

import style from '../styles/about.module.css';

const About = () => (
  <Layout>
    <Seo title="About" />
    <header className={style.header}>
      <h1>About me</h1>
      <ProfilePic />
    </header>
  </Layout>
);

const ProfilePic = () => {
  const data = useStaticQuery(graphql`
    query {
      profilePic: file(
        relativePath: { eq: "cantrell-profile-pic_square.jpg" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);
  return (
    <Img
      style={{ position: 'absolute' }}
      className={style.profilePicContainer}
      fluid={data.profilePic.childImageSharp.fluid}
    />
  );
};

export default About;
