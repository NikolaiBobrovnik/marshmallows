import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as utils from './Utils/index'
import AppMobile from './AppMobile'
import moment from 'moment'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-dynamic-swiper/lib/styles.css'
import 'Mobile/css/common.css'
// import 'css/fonts/stylesheet.css'

// request.defaults.withCredentials = true
// request.defaults.headers = Object.assign(request.defaults.headers,'mindboxDeviceUUID': Cookies.get('mindboxDeviceUUID') })
// request.defaults.baseURL = API_URL

moment.locale('ru')

const store = configureStore()
console.log(store.getState().toJS())

if (utils.isBrowser) {
  utils.getDirection()
  utils.elasticMobile(store)
}

const renderAppMobile = () => {
  render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <AppMobile />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderAppMobile(AppMobile)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./AppMobile', () => {
    renderAppMobile(AppMobile)
  })
}
