import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import style from '../styles/profilePic.module.css';

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
      className={style.container}
      fluid={data.profilePic.childImageSharp.fluid}
    />
  );
};

export default ProfilePic;
