import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { omit } from 'lodash'

import fetchComponent from './fetchComponent'

class Restriction extends React.Component {
  static propNames = [
    'not',
    'condition',
    'updateState',
    'fixState',

    'component',
    'render',
    'children',

    'restrictionPropMatch',
    'restrictionPropDispatch',
  ]

  static propTypes = {
    not: PropTypes.bool,
    condition: PropTypes.func,
    updateState: PropTypes.func,
    fixState: PropTypes.func,

    component: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),

    restrictionPropMatch: PropTypes.bool.isRequired,
    restrictionPropDispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.update(newProps)
  }

  update({ updateState, fixState, restrictionPropMatch, restrictionPropDispatch, ...props }) {
    const childProps = omit(props, this.propNames)

    if (restrictionPropMatch && updateState) {
      updateState(
        restrictionPropDispatch,
        childProps,
      )
    }

    if (!restrictionPropMatch && fixState) {
      fixState(
        restrictionPropDispatch,
        childProps,
      )
    }
  }

  render() {
    const none = null
    const {
      restrictionPropMatch,
      ...props,
    } = this.props

    if (!restrictionPropMatch) return none

    const childProps = omit(props, this.propNames)
    return fetchComponent(props, childProps, none)
  }
}

const mapStateToProps = (state, { not, condition, ...props }) => ({
  restrictionPropMatch:
    !condition ||
    !not === !!condition(state, omit(props, Restriction.propNames)),
})

const mapDispatchToProps = dispatch => ({
  restrictionPropDispatch: dispatch,
})

const ConnectedRestriction = connect(mapStateToProps, mapDispatchToProps)(Restriction)
ConnectedRestriction.displayName = 'Restriction'
export default ConnectedRestriction
