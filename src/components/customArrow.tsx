import React from 'react';

import '../styles/slickCustom.css';

interface Props {
  className?: string;
  style?: { [s: string]: string };
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CustomArrow = ({
  className = '',
  style = {},
  onClick = () => {},
}: Props) => {
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

export default CustomArrow;
