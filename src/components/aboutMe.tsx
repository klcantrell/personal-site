import React from 'react';
import Divider from '../components/divider';
import ProfilePic from '../components/profilePic';

import { throttle } from '../utils';

import style from '../styles/aboutMe.module.css';

const AboutMe = () => {
  const [isPhoneWidth, setIsPhoneWidth] = React.useState(
    window.innerWidth < 684
  );
  React.useEffect(() => {
    const throttledWidthHandler = throttle(() => {
      setIsPhoneWidth(window.innerWidth < 684);
    }, 100);
    window.addEventListener('resize', throttledWidthHandler);
    return () => {
      window.removeEventListener('resize', throttledWidthHandler);
    };
  });
  return (
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
          <Divider width={isPhoneWidth ? '5' : '7'} />
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
};

export default AboutMe;
