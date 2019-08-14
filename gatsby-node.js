/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      
      return result;
    })
  )
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  
  const getActivites = makeRequest(graphql, `
    {
      allStrapiActivity {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each activity.
    result.data.allStrapiActivity.edges.forEach(({ node }) => {
      createPage({
        path: `/activity/${node.slug}`,
        component: path.resolve(`src/templates/activity.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  
  // Query for activities nodes to use in creating pages.
  return getActivites;
  
};