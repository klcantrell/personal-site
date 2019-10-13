import React from 'react';

import style from '../styles/horizontalRule.module.css';

interface Props {
  className?: string;
}

const HorizontalRule = ({ className = '' }: Props) => (
  <div className={`${style.rule} ${className}`}>
    <hr />
  </div>
);

export default HorizontalRule;
