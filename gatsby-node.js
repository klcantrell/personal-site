const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const projectDetails = path.resolve('src/templates/projectDetails.tsx');

  return graphql(
    `
      {
        allProjectsJson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const projects = result.data.allProjectsJson.edges;

    projects.forEach((project, index) => {
      const previous = index === 0 ? null : projects[index - 1].node;
      const next =
        index === projects.length - 1 ? null : projects[index + 1].node;

      createPage({
        path: `projects/${project.node.slug}`,
        component: projectDetails,
        context: {
          slug: project.node.slug,
          previous,
          next,
        },
      });
    });

    return null;
  });
};
