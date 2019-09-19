import React from 'react';
import Divider from '../components/divider';
import ProfilePic from '../components/profilePic';

import style from '../styles/aboutMe.module.css';

const AboutMe = () => (
  <>
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
        <p>We can make the world better through software.</p>
      </div>
      <p>
        I have experience writing web applications with technologies such as
        JavaScript, Node, React, and Java. I&apos;m currently following the
        ReasonML/OCaml language and progressive web app technologies.
      </p>
    </article>
  </>
);

export default AboutMe;
