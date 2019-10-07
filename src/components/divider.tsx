import React from 'react';

import style from '../styles/divider.module.css';

export enum Orientation {
  Horizontal,
  Vertical,
}

interface Props {
  width?: string;
  orientation?: Orientation;
}

const Divider = ({
  width = '7',
  orientation = Orientation.Vertical,
}: Props) => (
  <div
    className={`${style.divider} ${
      orientation === Orientation.Horizontal ? style.dividerHorizontal : ''
    }`}
  >
    <svg width={width} height="50" viewBox={`0 0 7 50`}>
      <line x1="4" x2="4" y1="3" y2="47"></line>
    </svg>
  </div>
);

export default Divider;
