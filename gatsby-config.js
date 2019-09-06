const postCssPresetEnv = require('postcss-preset-env');
const postCSSImports = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: `Kalalau Cantrell`,
    description: `A simple starter for Gatsby. That's it.`,
    copyrights: '',
    author: `@panr`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: 'kalalau cantrell',
    defaultTheme: 'light',
    postsPerPage: 5,
    showMenuItems: 3,
    menuMoreText: 'Show more',
    mainMenu: [
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Showcase',
        path: '/showcase',
      },
      {
        title: 'Example',
        path: '/example',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          autoprefixer(),
          postCSSImports(),
          postCssPresetEnv({
            preserve: false,
            stage: 1,
          }),
        ],
        cssLoaderOptions: {},
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
