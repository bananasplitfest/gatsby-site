import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <pre>{JSON.stringify(data)}</pre>
    <ul style={{listStyleType: 'none', paddingLeft: 0, marginLeft: 0}}>
      {data.allStrapiActivity.edges.map(document => (
        <li key={document.node.id}>
          <h2 style={{marginBottom: 0}}>
            <Link to={`/activity/${document.node.slug}`}>{document.node.name}</Link>
          </h2>
          <p>{document.node.location.name}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
query IndexQuery {
  allStrapiActivity {
    edges {
      node {
        id
        name
        slug
        gallery {
          id
        }
        schedule {
          timeblocks {
            id
            starttime
            endtime
          }
        }
        location {
          id
          name
          slug
        }
        tags {
          name
          slug
          id
        }
      }
    }
  }
}

`