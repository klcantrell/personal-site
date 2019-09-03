const postCssPresetEnv = require('postcss-preset-env');
const postCSSImports = require('postcss-import');

module.exports = {
  siteMetadata: {
    title: `Hello Friend`,
    description: `A simple starter for Gatsby. That's it.`,
    copyrights: '',
    author: `@panr`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: 'hello friend',
    defaultTheme: 'dark',
    postsPerPage: 5,
    showMenuItems: 2,
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
          postCSSImports(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            preserve: false,
            stage: 3,
            features: {
              'nesting-rules': true,
            },
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
