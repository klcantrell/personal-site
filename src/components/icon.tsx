import React from 'react';

import style from '../styles/icon.module.css';

interface Props {
  d: string;
  size?: IconSize;
  label?: string;
  style: React.CSSProperties;
  viewBox: string;
}

type IconSize = number | string;

const Icon = ({ d, size = '1em', label, style: styles, viewBox }: Props) => {
  return (
    <span className={style.root} style={styles} role="figure">
      <svg
        version="1.1"
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} className={style.icon} />
      </svg>
      {label && <span className={style.label}>{label}</span>}
    </span>
  );
};

export default Icon;
