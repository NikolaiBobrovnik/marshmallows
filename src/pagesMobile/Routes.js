import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// import HomePage from '../pagesMobile/HomePage/HomePage'

@withRouter
export default class Routes extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' component={''} />
      </Switch>
    )
  }
}
