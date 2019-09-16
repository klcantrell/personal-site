import React from 'react';
import Divider from '../components/divider';

import style from '../styles/landing.module.css';

const Landing = () => {
  return (
    <article className={style.container}>
      <h1>
        Hi, I&apos;m <span className={style.headerAccent}>Kal</span>alau
      </h1>
      <div className={style.titles}>
        <p>Software Engineer</p>
        <Divider width="5" />
        <p>Learner</p>
        <Divider width="5" />
        <p>Final Fantasy nerd</p>
      </div>
    </article>
  );
};

export default Landing;
