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
  const activityTemplate = path.resolve(`src/templates/activity.js`);
  const tagTemplate = path.resolve(`src/templates/tag.js`)
  
  const getActivites = graphql(`
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
    if(result.errors) {
      Promise.reject(result.errors);
    }
    result.data.allStrapiActivity.edges.forEach(({ node }) => {
      createPage({
        path: `/activity/${node.slug}`,
        component: activityTemplate,
        context: {
          id: node.id,
        },
      })
    })
  });

  const getTags = graphql(`
    {
      allStrapiTag {
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
    if(result.errors) {
      Promise.reject(result.errors);
    }
    result.data.allStrapiTag.edges.forEach(({ node }) => {
      createPage({
        path: `/tag/${node.slug}`,
        component: tagTemplate,
        context: {
          id: node.id,
        },
      })
    })
  });
  
  // Query for activities nodes to use in creating pages.
  // Return a Promise which would wait for both the queries to resolve
	return Promise.all([getActivites, getTags]);
};