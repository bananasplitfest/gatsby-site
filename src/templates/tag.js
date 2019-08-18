import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

const TagTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiTag.name}</h1>
    <ul>
    {data.strapiTag.activities.map(document => (
      <li key={document.id}>
        <Link to={`/activity/${document.slug}`}>{document.name}</Link>
      </li>
    ))}
    </ul>
  </Layout>
)

export default TagTemplate

export const query = graphql`
  query TagTemplate($id: String!) {
    strapiTag(id: {eq: $id}) {
      id
        name
        slug
        activities {
          id
          name
          slug
        }
    }
  }
`