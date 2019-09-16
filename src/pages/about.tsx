import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Divider from '../components/divider';

import style from '../styles/about.module.css';

const About = () => (
  <Layout>
    <Seo title="About" />
    <header className={style.header}>
      <h1>About me</h1>
      <ProfilePic />
    </header>
    <article className={style.content}>
      <p>
        I&apos;m driven to continually hone my skills as a software craftsman
        and help others do the same.
      </p>
      <div className={style.blockQuote}>
        <Divider />
        <p>We can make the world better through software</p>
      </div>
      <p>
        I have experience writing web applications with technologies such as
        JavaScript, Node, React, and Java. Currently following the React
        ecosystem, the ReasonML programming language, and progressive web app
        technologies.
      </p>
    </article>
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
