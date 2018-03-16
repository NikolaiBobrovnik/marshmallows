import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from '../reducers/_index'
import Immutable from 'immutable'

const stateTransformer = state => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS()
  else return state
}

export default function configureStore () {
  let store
  if (process.env.NODE_ENV === 'development') {
    store = compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(
        createLogger({
          stateTransformer
        })
      )
    )(createStore)(rootReducer)
  } else {
    store = compose(applyMiddleware(thunkMiddleware))(createStore)(rootReducer)
  }
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/_index', () => {
      const nextRootReducer = require('../reducers/_index').rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
