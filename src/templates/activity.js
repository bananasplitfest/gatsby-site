import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import moment from 'moment'
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

const images = [
    {
      original: 'http://lorempixel.com/1000/600/nature/1/',
      thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/2/',
      thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/3/',
      thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    }
  ]

const ActivityTemplate = ({ data }) => (
  <Layout>
    {data.strapiActivity.gallery.forEach(document => {
        images.push({
            original: 'http://localhost:1337/' + document.url,
            thumbnail: 'http://localhost:1337/' + document.url
        })
    })}
    {console.log(data.strapiActivity)}
    <ImageGallery items={images} />
    <div style={{marginBottom: `1.45rem`}}>
      <h6 style={{marginBottom: `0`}}>
        {data.strapiActivity.prefix}
      </h6>
      <h1 style={{marginBottom: `0`}}>
        {data.strapiActivity.name}
      </h1>
      <h6 style={{marginBottom: `0`}}>
        {data.strapiActivity.suffix}
      </h6>
    </div>
    <p>{data.strapiActivity.description}</p>
    <ul style={{listStyleType: 'none'}}>
      {data.strapiActivity.schedule.map(document => (
        <li key={document.id}>
          {moment(document.starttime).format('dddd, MMMM D, h:mm a')} - {moment(document.endtime).format('h:mm a')}
        </li>
      ))}
    </ul>
  </Layout>
)

export default ActivityTemplate

export const query = graphql`
  query ActivityTemplate($id: String!) {
    strapiActivity(id: {eq: $id}) {
        id
        name
        prefix
        suffix
        description
        schedule {
          id
          starttime
          endtime
        }
        sponsorsLogo {
          id
          name
          slug
        }
        gallery {
            id
            name
            url
          }
    }
  }
`