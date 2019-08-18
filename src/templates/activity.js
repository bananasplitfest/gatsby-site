import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ReactMarkdown from "react-markdown"  
import moment from 'moment'
import "../components/activity.css"
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

const ActivityTemplate = ({ data }) => (
  <Layout>
    <div class="activity">
      <div class="title">
        {data.strapiActivity.prefix ? <h6 class="prefix">{data.strapiActivity.prefix}</h6> : ''}
        <h1 class="name">{data.strapiActivity.name}</h1>
        {data.strapiActivity.suffix ? <h6 class="suffix">{data.strapiActivity.suffix}</h6> : ''}
      </div>
      <div class="sidebar">
        <div class="meta">
          <div class="grid-container">
            <div class="icon">
              <i class="fas fa-map-marked"></i>
            </div>
            <div class="location">
              {data.strapiActivity.location.name}
            </div>

            <div class="icon">
              <i class="far fa-clock"></i>
            </div>
            <div class="schedule">
              <ul style={{listStyleType: 'none', paddingLeft: 0, marginLeft: 0, marginBottom: 0}}>
                {data.strapiActivity.schedule.timeblocks.map(document => (
                  <li key={document.id} style={{marginBottom: 0}}>
                    <span class="weekday">
                      {moment(document.starttime).format('dddd')}
                    </span> <span class="date">
                      {moment(document.starttime).format('MMMM D')}
                    </span> from <span class="time">
                      {moment(document.starttime).format('h')}
                      {moment(document.starttime).format('mm') === "00"
                        ? moment(document.starttime).format('a')
                        : moment(document.starttime).format(':mma')
                      }
                    </span> to <span class="time">
                    {console.log(moment(document.endtime).format('m'))}
                    {console.log(typeof moment(document.endtime).format('m'))}
                    {moment(document.endtime).format('h')}
                    {moment(document.endtime).format('mm') === "00"
                      ? moment(document.endtime).format('a')
                      : moment(document.endtime).format(':mma')
                    }
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div class="icon">
              <i class="fas fa-hashtag"></i>
            </div>
            <div class="tags">
              <ul style={{listStyleType: 'none', paddingLeft: 0, marginLeft: 0}}>
                {data.strapiActivity.tags.map(document => (
                  <li key={document.id} style={{display: 'inline', paddingRight: '.3625rem'}}>
                    <Link to={`/tag/${document.slug}`}>{document.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        
        </div>
        <div class="links">
          <ul>
            <li>Link 1</li>
            <li>Link2</li>
          </ul>
        </div>      
      </div>

      <div class="main">
        <div class="gallery">Gallery Here!</div>
        <div class="description">
          <ReactMarkdown  
            source={data.strapiActivity.description}
          />
        </div>
        <div class="sponsors">
          Sponsor
        </div>
      </div>
    </div>
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
        timeblocks {
          id
          starttime
          endtime
        }
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
`