import React from 'react';
import Divider, { Orientation } from '../components/divider';

import { throttle } from '../utils';

import style from '../styles/landing.module.css';

const { Horizontal, Vertical } = Orientation;

const Landing = () => {
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
    <article className={style.container}>
      <h1>
        Hi, I&apos;m <span className={style.headerAccent}>Kal</span>alau
      </h1>
      <div className={style.titles}>
        <p>Software Engineer</p>
        <Divider
          width={isPhoneWidth ? '4' : '5'}
          orientation={isPhoneWidth ? Vertical : Horizontal}
        />
        <p>Learner</p>
        <Divider
          width={isPhoneWidth ? '4' : '5'}
          orientation={isPhoneWidth ? Vertical : Horizontal}
        />
        <p>Final Fantasy nerd</p>
      </div>
    </article>
  );
};

export default Landing;
