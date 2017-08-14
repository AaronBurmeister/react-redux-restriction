import PropTypes from 'prop-types'
import React from 'react'
import resolveElement, { renderProps } from 'react-resolve-element'
import { connect } from 'react-redux'
import { get, omit, split } from 'lodash'

class Restriction extends React.Component {
  static propTypes = {
    not: PropTypes.bool,
    condition: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    data: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    by: PropTypes.func,
    updateState: PropTypes.func,
    fixState: PropTypes.func,

    ...renderProps,

    restrictionPropMatch: PropTypes.bool.isRequired,
    restrictionPropDispatch: PropTypes.func.isRequired,
  }

  static propNames = Object.keys(Restriction.propTypes);

  componentWillMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.update(newProps)
  }

  update({ updateState, fixState, restrictionPropMatch, restrictionPropDispatch, ...props }) {
    const childProps = omit(props, Restriction.propNames)

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

    const childProps = omit(props, Restriction.propNames)
    return resolveElement(props, childProps, none)
  }
}

const resolveCondition = (condition, data, state, props) => {
  const getData = data || condition
  if (typeof getData === 'string') {
    if (!state) return state
    if (state.getIn) return state.getIn(split(getData, '.'))
    return get(state, getData)
  }
  return getData(state, omit(props, Restriction.propNames))
}

const mapStateToProps = (state, { not, condition, data, by = value => value, ...props }) => ({
  restrictionPropMatch:
    (!condition && !data)
    ||
    !not === !!by(resolveCondition(condition, data, state, props)),
})

const mapDispatchToProps = dispatch => ({
  restrictionPropDispatch: dispatch,
})

const ConnectedRestriction = connect(mapStateToProps, mapDispatchToProps)(Restriction)
ConnectedRestriction.displayName = 'Restriction'
export default ConnectedRestriction
