import React from 'react';

import style from '../styles/skills.module.css';

export enum Tech {
  HTML = 'HTML',
  CSS = 'CSS',
  JAVASCRIPT = 'JAVASCRIPT',
  REACT = 'REACT',
  NODE = 'NODE',
  JAVA = 'JAVA',
  AWS = 'AWS',
  GRAPHQL = 'GRAPHQL',
  REASONML = 'REASONML',
}

interface SkillProps {
  width: string;
  height: string;
  viewBox: string;
  path?: string;
  childrenSvg?: string;
  label: string;
}

type TechInfo = {
  [key in keyof typeof Tech]: SkillProps;
};

interface SkillsProps {
  skills: Tech[];
  className?: string;
}

const tech: TechInfo = {
  HTML: {
    width: '30',
    height: '30',
    viewBox: '0 0 384 512',
    path:
      'M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z',
    label: 'HTML',
  },
  CSS: {
    width: '30',
    height: '30',
    viewBox: '0 0 512 512',
    path:
      'M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z',
    label: 'CSS',
  },
  JAVASCRIPT: {
    width: '30',
    height: '30',
    viewBox: '0 0 448 512',
    path:
      'M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z',
    label: 'JavaScript',
  },
  REACT: {
    width: '30',
    height: '30',
    viewBox: '0 0 512 512',
    path:
      'M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zm-130 189.1c4.6 8.8 9.3 17.5 14.3 26.1 5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5zm0-50.6c-6.3-14.9-11.6-29.5-16-43.6 14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26zm11.4 25.3c6.6-13.8 13.8-27.3 21.4-40.6 7.6-13.3 15.8-26.2 24.4-38.9 15-1.1 30.3-1.7 45.9-1.7 15.6 0 31 .6 45.9 1.7 8.5 12.6 16.6 25.5 24.3 38.7 7.7 13.2 14.9 26.7 21.7 40.4-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6-15.7 0-30.9-.5-45.6-1.4-8.7-12.7-16.9-25.7-24.6-39-7.7-13.3-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zM256 210.2c25.3 0 45.8 20.5 45.8 45.8 0 25.3-20.5 45.8-45.8 45.8-25.3 0-45.8-20.5-45.8-45.8 0-25.3 20.5-45.8 45.8-45.8',
    label: 'React',
  },
  NODE: {
    width: '30',
    height: '30',
    viewBox: '0 0 448 512',
    path:
      'M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 6.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z',
    label: 'Node',
  },
  JAVA: {
    width: '30',
    height: '30',
    viewBox: '0 0 30 30',
    path:
      'M11.801 24.747s-1.223 0.712 0.871 0.952c2.536 0.291 3.832 0.249 6.625-0.281 0 0 0.736 0.461 1.761 0.861-6.265 2.684-14.177-0.157-9.257-1.532zM11.035 21.244s-1.371 1.015 0.723 1.232c2.709 0.279 4.848 0.303 8.551-0.411 0 0 0.512 0.519 1.316 0.803-7.572 2.215-16.009 0.173-10.589-1.624zM17.488 15.3c1.544 1.777-0.405 3.377-0.405 3.377s3.919-2.024 2.119-4.557c-1.681-2.363-2.971-3.536 4.009-7.584 0-0.001-10.955 2.735-5.723 8.764zM25.773 27.339s0.905 0.745-0.996 1.321c-3.616 1.096-15.051 1.425-18.225 0.044-1.141-0.497 1-1.187 1.672-1.331 0.703-0.152 1.104-0.124 1.104-0.124-1.271-0.895-8.208 1.756-3.524 2.516 12.773 2.071 23.283-0.933 19.969-2.427zM12.389 17.613s-5.816 1.381-2.059 1.883c1.585 0.212 4.748 0.164 7.693-0.083 2.408-0.203 4.824-0.636 4.824-0.636s-0.849 0.363-1.464 0.783c-5.905 1.553-17.315 0.831-14.029-0.757 2.776-1.341 5.035-1.189 5.035-1.189zM22.821 23.445c6.004-3.12 3.228-6.119 1.291-5.713-0.473 0.099-0.687 0.184-0.687 0.184s0.176-0.276 0.513-0.396c3.833-1.348 6.781 3.975-1.237 6.083 0-0.001 0.093-0.083 0.12-0.157zM19.201 0s3.325 3.325-3.153 8.44c-5.195 4.103-1.184 6.443-0.001 9.115-3.032-2.737-5.257-5.144-3.765-7.385 2.192-3.292 8.263-4.887 6.92-10.169zM12.979 31.899c5.763 0.369 14.612-0.204 14.821-2.931 0 0-0.403 1.033-4.763 1.855-4.917 0.925-10.985 0.817-14.583 0.224 0-0.001 0.737 0.609 4.524 0.852z',
    label: 'Java',
  },
  AWS: {
    width: '40',
    height: '40',
    viewBox: '0 0 512 512',
    path:
      'M261.2 136.1c-14 57.5-13.1 54.4-25.8 107-1.6 6.5-4.1 8.4-10.7 8.5h-14.4c-5.8-.1-8.2-1.6-9.9-7.3-12.3-39.4-28.8-94.1-39.9-130.7-4.1-13.5-1.4-13.2 9.3-12.9 3.7.1 7.3 0 11 0 5.1.1 7.7 2 9.1 7.1 3.6 12.9 6 22.8 26.6 104.1.4 1.6.9 3.1 1.4 4.6h1.1c.5-2 1.1-3.9 1.6-5.9 7.8-32.9 15.5-65.9 23.3-98.8 2.4-10.2 6.7-11.2 17-11.2h7.6c6.9.1 9 1.5 10.7 8.3 6 23.4 23.5 101.8 26.7 110.4 5.1-18.3-1.8 7.9 28.5-109 2.1-8.1 4.1-9.7 12.3-9.7h12.7c5.4.1 7 1.8 5.7 7.1-2.4 9.5-2.9 9.9-41.3 132.9-3.1 9.9-4.2 10.8-14.6 10.8h-10.6c-7.3 0-9.2-1.3-11-8.4-4.3-16.2-23.3-95.7-26.4-106.9zM125.4 247.3c4.2 5.8 8.1 6.3 14.1 2.4l6.3-4.2c6.8-4.5 7.3-6.3 3.6-13.5-4.3-8.4-6.4-17.3-6.3-26.9 0-3.1.6-55.7-.9-66.8-2.7-19.3-12.5-32.8-31.7-38.7-10.7-3.4-21.7-3.3-32.7-3-15.1.4-29.4 4.6-42.8 11.4-1.8.9-3.7 3.1-4.1 4.9-.8 3.9-1.1 8.1-.7 12.1.6 5.9 2.6 7 8.2 5.1 5.1-1.7 10-3.9 15.1-5.4 14.5-4.4 29.2-6.4 44.1-1.7 7.1 2.2 11.7 6.9 14.3 13.8 3 7.9 2.4 16.1 2.4 24.2 0 5.5-.1 5.5-5.5 4.5-13.9-2.6-27.7-5-41.9-3.1-15.2 2.1-28.6 7.3-38.2 20-9.1 12-10 25.6-7.4 39.5 2.8 15 11.8 25.7 26.4 30.4 20.6 6.7 40.1 3.3 57.7-9.5 3.8-2.8 7.2-6.2 11.1-9.5 3.1 5 5.8 9.7 8.9 14zm-15.3-61.6c3 .4 4.5 1.9 4.3 5.1-.2 3.8.1 7.6-.3 11.4-1.2 11.7-7.7 19.7-17.9 24.9-8.2 4.2-16.9 5.8-26.1 5-15.2-1.3-21-13.1-19.6-26.3C51.8 193.2 59 186.2 72 184c13.8-2.4 16-1.1 38.1 1.7zm348.8 65.1c21.3-8.6 32.9-26.2 29.2-50-2.2-14.6-11.8-24.2-25.2-29.5-14.7-5.9-33.8-10.3-48.1-18.2-4.4-2.4-7.4-6.3-7.6-11.9-.4-11.1 4.2-17.2 15.4-19.8 9.3-2.1 18.8-2.2 28.1-.4 7.3 1.4 14.3 4.2 21.4 6.3 2.8.9 5.9 2.1 7.8-1.6 3.8-7.3.4-18.7-7.3-21.8-22.5-9-45.5-11.6-68.2-1.6-14.6 6.4-24.6 17.4-26 34.2-1.6 19.3 6.9 33.4 24.1 41.7 7.7 3.7 16.1 5.9 24.2 8.9 8.1 3 16.2 5.8 24.1 9.1 12.3 5.3 11.6 24.2 1.2 30-27.7 15.3-64.9-2.4-69.2-3.8-3.3-1.1-5.3.2-6.3 3.7-3 11.3.7 18.8 11.6 22.7 21.7 7.9 49.6 10.5 70.8 2zM296 413.5c50.8-5.8 98.7-20.8 142.7-47 8-4.7 15.5-10.3 23.1-15.7 7.3-5.2 3.2-18.4-11.3-12.2-54.4 23.2-111.2 36.1-170.2 38.9-30.5 1.5-60.8-.3-91.1-4.7-63.1-9.2-122.4-29.2-177.6-61.2-2.1-1.2-4.2-2.5-6.5-3-4.9-1.1-7.7 4.7-2.4 9.7 24 22.1 50.3 40.8 79.1 55.7 53.7 27.7 110.5 42.7 171.2 42 14.4-.8 28.8-.9 43-2.5zm174.7-92.2c14.8.8 19.4 5.9 15.7 20.2-3.8 14.8-9.3 29.2-13.9 43.8-.9 2.9-4.2 6.3-.8 8.8 3.7 2.6 6.5-1 9-3.3 10.2-9.5 17.4-21 22.5-33.8 5.4-13.4 9.3-27.2 8.7-41.9-.2-6.2-1.8-8.8-7.8-10.5-5.4-1.5-11-2.8-16.5-3.2-21.6-1.8-42.5.5-62 10.6-3.1 1.6-6 3.7-8.7 5.9-1.1.9-3.2 5.3 2.4 6.1 1.9.3 3.9-.1 5.9-.3 16.9-1.6 28.6-3.3 45.5-2.4z',
    label: '',
  },
  GRAPHQL: {
    width: '30',
    height: '30',
    viewBox: '0 0 400 400',
    path: '',
    label: 'GraphQL',
    childrenSvg: `<rect x="122" y="-0.4" transform="matrix(-0.866 -0.5 0.5 -0.866 163.3196 363.3136)" width="16.6" height="320.3"/>
    <rect x="39.8" y="272.2" width="320.3" height="16.6"/>
    <rect x="37.9" y="312.2" transform="matrix(-0.866 -0.5 0.5 -0.866 83.0693 663.3409)" width="185" height="16.6"/>
    <rect x="177.1" y="71.1" transform="matrix(-0.866 -0.5 0.5 -0.866 463.3409 283.0693)" width="185" height="16.6"/>
    <rect x="122.1" y="-13" transform="matrix(-0.5 -0.866 0.866 -0.5 126.7903 232.1221)" width="16.6" height="185"/>
    <rect x="109.6" y="151.6" transform="matrix(-0.5 -0.866 0.866 -0.5 266.0828 473.3766)" width="320.3" height="16.6"/>
    <rect x="52.5" y="107.5" width="16.6" height="185"/>
    <rect x="330.9" y="107.5" width="16.6" height="185"/>
    <rect x="262.4" y="240.1" transform="matrix(-0.5 -0.866 0.866 -0.5 126.7953 714.2875)" width="14.5" height="160.9"/>
    <path  d="M369.5,297.9c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
      C373.5,259.9,379.2,281.2,369.5,297.9"/>
    <path  d="M90.9,137c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
      C94.8,99,100.5,120.3,90.9,137"/>
    <path  d="M30.5,297.9c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
      C61.4,320.3,40.1,314.6,30.5,297.9"/>
    <path  d="M309.1,137c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
      C340.1,159.4,318.7,153.7,309.1,137"/>
    <path  d="M200,395.8c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
      C234.9,380.1,219.3,395.8,200,395.8"/>
    <path  d="M200,74c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
      C234.9,58.4,219.3,74,200,74"/>`,
  },
  REASONML: {
    height: '',
    label: '',
    viewBox: '',
    width: '',
  },
};

const Skill = ({
  width,
  height,
  viewBox,
  path = '',
  label,
  childrenSvg = '<text>Did you forget to pass a prop?</text>',
}: SkillProps) => (
  <div className={style.skill}>
    {path === '' ? (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        dangerouslySetInnerHTML={{ __html: childrenSvg }}
      />
    ) : (
      <svg width={width} height={height} viewBox={viewBox}>
        <path d={path} />
      </svg>
    )}
    <p>{label}</p>
  </div>
);

const ReasonLogo = () => (
  <div className={style.reasonLogoContainer}>
    <div className={style.reasonLogo} />
    <p>ReasonML</p>
  </div>
);

const Skills = ({ skills, className = '' }: SkillsProps) => {
  const hasReasonMl = skills.findIndex(s => s == Tech.REASONML);
  return (
    <div className={`${style.skills} ${className}`}>
      {skills
        .filter(s => s !== Tech.REASONML)
        .map(s => {
          return <Skill key={s} {...tech[s]} />;
        })}
      {hasReasonMl > 0 ? <ReasonLogo /> : null}
    </div>
  );
};

export default Skills;
