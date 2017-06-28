/* eslint-disable no-unused-expressions */

import Restriction, { RestrictionRoute, fetchComponent } from '../'
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

  it('should export the fetchComponent function', done => {
    expect(fetchComponent).to.exist
    expect(fetchComponent).to.be.a('function')
    done()
  })
})
