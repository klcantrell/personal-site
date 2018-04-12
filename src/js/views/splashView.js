import KUTE from 'kute.js';
import 'kute.js/kute-svg';
import 'kute.js/kute-attr';

import {
  k$delay,
  k$bounceEl,
  k$classListRemove,
  k$throttle,
  k$whenTopQuarterInView,
} from '../utils';

export default function SplashView(rootEl, eventBus) {
  const arrowEl = rootEl.querySelector('.splash__arrow');
  const arrowPath = arrowEl.querySelector('#downArrow');
  const namePath = rootEl.querySelector('#name');
  const splashPageNav = rootEl.querySelector('.route-links--splash');
  const bigLetterK = document.getElementById('bigLetterK');

  let isArrowMorphed = false;

  function morphArrowOnScroll() {
    const morphArrowHandler = (() => {
      return k$throttle(k$whenTopQuarterInView.bind(this, morphArrowToK, splashPageNav), 1000);
    })();

    window.addEventListener('scroll', morphArrowHandler);

    eventBus.on('arrowmorphed', () => {
      isArrowMorphed = true;
      window.removeEventListener('scroll', morphArrowHandler);
    });
  }

  function morphArrowToK() {
    const morph = KUTE.to(arrowPath, {
      path: `M 152.77,315.36
      C 229.84,278.14 252.00,249.33 252.00,229.39
        252.00,216.53 243.14,209.00 228.97,209.00
        205.48,209.00 171.38,227.17 134.61,264.39
        134.61,264.39 107.58,404.00 107.58,404.00
        107.58,404.00 81.89,404.00 81.89,404.00
        81.89,404.00 141.69,95.22 141.69,95.22
        141.69,95.22 168.27,93.00 168.27,93.00
        168.27,93.00 139.48,240.02 139.48,240.02
        175.36,203.48 212.58,185.00 240.92,185.00
        265.95,185.00 280.00,199.03 280.00,219.64
        280.00,248.44 253.08,281.69 185.11,315.36
        185.11,315.36 269.50,401.78 269.50,401.78
        269.50,401.78 239.44,406.00 239.44,406.00
        239.44,406.00 152.77,315.36 152.77,315.36 Z`,
    }).start();
    eventBus.emit('arrowmorphed');
  }

  function drawName(startTime) {
    KUTE.fromTo(
      namePath,
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 25000, easing: 'easeIn' },
    ).start(startTime);
  }

  function drawArrow(startTime) {
    const arrowVisible = KUTE.to(arrowPath, { opacity: '1' }, { duration: 10, delay: 3000 });
    const drawInArrow = KUTE.fromTo(
      arrowPath,
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 1000, easing: 'easeIn', delay: 3000 },
    );
    const fillInArrow = KUTE.fromTo(
      arrowPath,
      { attr: { fillOpacity: 0 } },
      { attr: { fillOpacity: 1 } },
      { duration: 1000, easing: 'easeIn' },
    );
    arrowVisible.start(startTime);
    drawInArrow.chain(fillInArrow).start(startTime);
    return new Promise(resolve => {
      k$delay(3550).then(() => {
        resolve();
      });
    });
  }

  const bigLetterMorphControl = (() => {
    const morph = KUTE.to(
      bigLetterK,
      {
        path: `M 266.00,210.86
        C 266.00,210.86 217.00,211.58 217.00,211.58
          217.72,177.94 214.09,166.00 197.41,166.00
          164.77,166.00 143.00,217.38 143.00,258.61
          143.00,305.63 172.03,319.02 245.67,295.86
          245.67,295.86 240.23,341.47 240.23,341.47
          142.80,373.69 91.00,341.83 91.00,266.20
          91.00,189.48 143.86,120.00 208.30,120.00
          252.94,120.00 268.89,149.33 266.00,210.86 Z`,
      },
      { repeat: 50, yoyo: true, duration: 20000 },
    );
    return {
      start() {
        morph.start();
      },
      stop() {
        morph.stop();
      },
    };
  })();

  function resetBigLetterKPath() {
    bigLetterK.setAttribute(
      'd',
      `M 152.77,315.36
    C 229.84,278.14 252.00,249.33 252.00,229.39
      252.00,216.53 243.14,209.00 228.97,209.00
      205.48,209.00 171.38,227.17 134.61,264.39
      134.61,264.39 107.58,404.00 107.58,404.00
      107.58,404.00 81.89,404.00 81.89,404.00
      81.89,404.00 141.69,95.22 141.69,95.22
      141.69,95.22 168.27,93.00 168.27,93.00
      168.27,93.00 139.48,240.02 139.48,240.02
      175.36,203.48 212.58,185.00 240.92,185.00
      265.95,185.00 280.00,199.03 280.00,219.64
      280.00,248.44 253.08,281.69 185.11,315.36
      185.11,315.36 269.50,401.78 269.50,401.78
      269.50,401.78 239.44,406.00 239.44,406.00
      239.44,406.00 152.77,315.36 152.77,315.36 Z`,
    );
  }

  function bounceLoop(el) {
    if (isArrowMorphed) {
      return null;
    }
    k$bounceEl(el).then(() => {
      k$classListRemove(el, 'bounce');
      k$delay(50).then(() => {
        return bounceLoop(el);
      });
    });
  }

  return {
    introSequence() {
      const now = window.performance.now();
      drawName(now);
      drawArrow(now).then(() => {
        bounceLoop(arrowEl);
      });
      bigLetterMorphControl.start();
    },
    startBigLetterMorph() {
      bigLetterMorphControl.start();
    },
    resetBigLetterK() {
      bigLetterMorphControl.stop();
      resetBigLetterKPath();
    },
    morphArrowOnScroll,
  };
}
