import { fromJS } from 'immutable'
import {
  HEADER_NAVIGATION_LOAD_START,
  HEADER_NAVIGATION_LOAD_END,
  BASE_SIZE_RESIZE,
  UPDATE_HEADER
} from 'constants/HEADER'

const initialState = fromJS({
  navigation: {
    logoBig: '',
    logoSmall: '',
    navList: []
  },
  empty: true,
  isAjax: false,
  baseFontSize: 10,
  outOfTop: false,
  comeToTop: false,
  smallHeader: false,
  whiteHeader: false
})

export default function Header (state = initialState, action) {
  switch (action.type) {
    case HEADER_NAVIGATION_LOAD_START:
      return state.set('isAjax', true)

    case HEADER_NAVIGATION_LOAD_END:
      return state
        .merge(fromJS({ empty: false, isAjax: false }))
        .mergeIn(['navigation'], fromJS(action.payload))

    case BASE_SIZE_RESIZE:
      return state.set('baseFontSize', action.payload)

    case UPDATE_HEADER:
      return state.merge(fromJS(action.payload))

    default:
      return state
  }
}
