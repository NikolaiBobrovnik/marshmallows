import React, { Component } from 'react'
import * as DesctopHeaderActions from 'actions/DesctopHeaderActions'
import * as DesctopFooterActions from 'actions/DesctopFooterActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default function defPageColor (WrappedComponent) {
  class defPageColor extends Component {
    render () {
      return <WrappedComponent {...this.props} setDefColor={this.props.actions.setDefColor} setDefFooterColor={this.props.actionsFooter.setDefFooterColor} />
    }
  }

  defPageColor.displayName = `defPageColor(${getDisplayName(WrappedComponent)})`

  function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  function mapStateToProps () {
    return {}
  }

  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(DesctopHeaderActions, dispatch),
      actionsFooter: bindActionCreators(DesctopFooterActions, dispatch)
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(defPageColor)
}
