import React from 'react';

import style from '../styles/landing.module.css';

const Landing = () => {
  return (
    <article className={style.container}>
      <h1>
        Hi, I&apos;m <span className={style.headerAccent}>Kal</span>alau
      </h1>
      <p className={style.titles}>
        Software Engineer
        <span className={style.divider}>|</span>
        Learner
        <span className={style.divider}>|</span>
        Final Fantasy nerd
      </p>
    </article>
  );
};

export default Landing;
