import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'

import Routes from 'pages/Routes'

export default class AppDesktop extends Component {
  render () {
    return (
      <BrowserRouter>
        <div
          {...{
            style: {
              display: 'flex',
              minHeight: '100vh',
              flexDirection: 'column',
              maxWidth: '144rem',
              margin: '0 auto'
            }
          }}
        >
          <Helmet
            defaultTitle='Kalashnikov'
            titleTemplate='%s — Kalashnikov'
            meta={[
              { property: 'og:title', content: 'Kalashnikov' },
              { property: 'og:type', content: 'website' }
            ]}
          />
          <div
            {...{
              style: {
                minHeight: '90vh',
                flexGrow: '1'
              }
            }}
          >
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
