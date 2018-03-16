import React, { Component } from 'react'

import SliderHome from '../../Mobile/containers/SliderHome/SliderHome'
import Production from '../../Mobile/containers/Production/Production'
import BrandFlags from '../../Mobile/containers/BrandFlags/BrandFlags'
import Advice from '../../Mobile/containers/Advice/Advice'
// import Accessories from '../../Mobile/containers/Accessories/Accessories'
import News from '../../Mobile/containers/News/News'
// import Information from '../../Mobile/containers/Information/Information'

import css from './homePage.scss'

export default class Home extends Component {
  render () {
    return (
      <div className={css.wrapper}>
        <SliderHome />
        <div
          {...{
            className: css.container
          }}
        >
          <Production />
          <BrandFlags />
          <Advice />
          {/* <Accessories /> */}
          <News />
          {/* <Information /> */}
        </div>
      </div>
    )
  }
}
