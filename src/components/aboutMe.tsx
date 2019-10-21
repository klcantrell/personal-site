import React from 'react';
import Divider from '../components/divider';
import ProfilePic from '../components/profilePic';

import { throttle } from '../utils';

import style from '../styles/aboutMe.module.css';

const AboutMe = () => {
  const [isPhoneWidth, setIsPhoneWidth] = React.useState(false);
  React.useEffect(() => {
    const _isPhoneWidth =
      typeof window !== 'undefined' && window.innerWidth < 684;
    const throttledWidthHandler = throttle(() => {
      setIsPhoneWidth(_isPhoneWidth);
    }, 100);
    if (typeof window !== 'undefined') {
      setIsPhoneWidth(_isPhoneWidth);
      window.addEventListener('resize', throttledWidthHandler);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', throttledWidthHandler);
      }
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
