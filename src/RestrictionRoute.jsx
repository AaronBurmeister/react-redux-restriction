import PropTypes from 'prop-types'
import React from 'react'
import resolveElement, { renderProps } from 'react-resolve-element'
import { Route } from 'react-router-dom'
import { reduceRight } from 'lodash'

import Restriction from './Restriction'

const RestrictionRoute = ({ conditions, component, render, children, ...props }) => (
  <Route {...props}>
    {
      reduceRight(
        conditions,
        (child, condition) => (
          <Restriction {...props} {...condition}>
            {(child)}
          </Restriction>
        ),
        resolveElement({ component, render, children }, props, null)
      )
    }
  </Route>
)

RestrictionRoute.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.shape({
    not: PropTypes.bool,
    condition: PropTypes.func,
    updateState: PropTypes.func,
    fixState: PropTypes.func,
  })),

  ...renderProps,
}

RestrictionRoute.defaultProps = {
  conditions: [],
}

export default RestrictionRoute
