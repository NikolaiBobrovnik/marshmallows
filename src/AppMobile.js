import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'

import Routes from 'pagesMobile/Routes'

export default class AppMobile extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Helmet
            defaultTitle='Kalashnikov'
            titleTemplate='%s — Kalashnikov'
            meta={[
              { property: 'og:title', content: 'Kalashnikov' },
              { property: 'og:type', content: 'website' }
            ]}
          />
          {/* <div
            {...{
              style: {
                textAlign: 'center',
                backgroundImage: `url('/images/mobile/Mobile_fon-min.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
                position: 'relative'
              }
            }}
          >
            <div
              {...{
                style: {
                  color: '#fff',
                  fontSize: '1.6rem',
                  lineHeight: '2.4rem',
                  textTransform: 'uppercase',
                  paddingTop: '26.4rem'
                }
              }}>
              Мобильная версия <br /> находится в разработке
            </div>
          </div> */}
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
