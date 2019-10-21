import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';

import '../styles/layout.css';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          logo {
            src
            alt
          }
          logoText
          defaultTheme
          copyrights
          mainMenu {
            title
            path
          }
          showMenuItems
          menuMoreText
        }
      }
    }
  `);
  const {
    logo,
    logoText,
    defaultTheme,
    mainMenu,
    showMenuItems,
    menuMoreText,
  } = data.site.siteMetadata;

  return (
    <>
      <div className="container">
        <Header
          siteLogo={logo}
          logoText={logoText}
          defaultTheme={defaultTheme}
          mainMenu={mainMenu}
          mainMenuItems={showMenuItems}
          menuMoreText={menuMoreText}
        />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
