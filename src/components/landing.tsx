import React from 'react';
import Divider, { Orientation } from '../components/divider';

import { throttle } from '../utils';

import style from '../styles/landing.module.css';

const { Horizontal, Vertical } = Orientation;

const Landing = () => {
  const [isPhoneWidth, setIsPhoneWidth] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 684
  );
  React.useEffect(() => {
    const throttledWidthHandler = throttle(() => {
      setIsPhoneWidth(typeof window !== 'undefined' && window.innerWidth < 684);
    }, 100);
    typeof window !== 'undefined' &&
      window.addEventListener('resize', throttledWidthHandler);
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('resize', throttledWidthHandler);
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
