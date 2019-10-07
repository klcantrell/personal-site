import React from 'react';
import Divider, { Orientation } from '../components/divider';

import { throttle } from '../utils';

import style from '../styles/landing.module.css';

const Landing = () => {
  const [isPhoneWidth, setIsPhoneWidth] = React.useState(
    window.innerWidth < 684
  );
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => {
        setIsPhoneWidth(window.innerWidth < 684);
      }, 100)
    );
  });

  return (
    <article className={style.container}>
      <h1>
        Hi, I&apos;m <span className={style.headerAccent}>Kal</span>alau
      </h1>
      <div className={style.titles}>
        <p>Software Engineer</p>
        <Divider
          width={isPhoneWidth ? '4' : '5'}
          orientation={
            isPhoneWidth ? Orientation.Vertical : Orientation.Horizontal
          }
        />
        <p>Learner</p>
        <Divider
          width={isPhoneWidth ? '4' : '5'}
          orientation={
            isPhoneWidth ? Orientation.Vertical : Orientation.Horizontal
          }
        />
        <p>Final Fantasy nerd</p>
      </div>
    </article>
  );
};

export default Landing;
