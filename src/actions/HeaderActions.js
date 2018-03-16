import { axiosAPI } from 'Utils/axiosInstances'

import {
  HEADER_NAVIGATION_LOAD_START,
  HEADER_NAVIGATION_LOAD_END,
  UPDATE_HEADER
} from 'constants/HEADER'

export function loadNavigation () {
  return dispatch => {
    dispatch({
      type: HEADER_NAVIGATION_LOAD_START
    })

    axiosAPI.get('/header/header_menu.php')
      .then(response => {
        dispatch({
          type: HEADER_NAVIGATION_LOAD_END,
          payload: response.data
        })
      })
  }
}

export function updateHeader (payload) {
  return dispatch => {
    dispatch({
      type: UPDATE_HEADER,
      payload
    })
  }
}
