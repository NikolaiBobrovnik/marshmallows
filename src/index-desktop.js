import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as utils from './Utils/index'
import AppDesktop from './AppDesktop'
import moment from 'moment'

import 'react-dynamic-swiper/lib/styles.css'
import 'normalize.css'
import 'styles/common.scss'

moment.locale('ru')

const store = configureStore()
console.log(store.getState().toJS())

if (utils.isBrowser) {
  utils.getDirection()
  utils.elasticDesktop(store)
}

const renderAppDesktop = () => {
  render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <AppDesktop />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderAppDesktop(AppDesktop)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./AppDesktop', () => {
    renderAppDesktop(AppDesktop)
  })
}
