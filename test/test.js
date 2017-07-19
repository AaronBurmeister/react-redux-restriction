/* eslint-disable no-unused-expressions */

import Restriction, { RestrictionRoute } from '../'
import { expect } from 'chai'

describe('react-redux-restriction', () => {
  it('should export the Restriction class', done => {
    expect(Restriction).to.exist
    done()
  })

  it('should export the RestrictionRoute class', done => {
    expect(RestrictionRoute).to.exist
    expect(Restriction.Route).to.equal(RestrictionRoute)
    done()
  })
})
