/* eslint-disable no-unused-expressions */

import React from 'react'
import { expect } from 'chai'

import { fetchComponent } from '../'

describe('fetchComponent', () => {
  describe('with component prop', () => {
    it('should return a React component if component is provided', done => {
      expect(fetchComponent({ component: () => null })).to.exist
      done()
    })

    it('should return the component even if render or children is provided', done => {
      const children = (<span>React text 2</span>)
      const result = fetchComponent({ component: () => null, render: () => 'React text', children })
      expect(result).to.exist
      expect(result).to.not.equal('React text')
      expect(result).to.not.equal(children)
      done()
    })
  })

  describe('with render prop', () => {
    it('should return the result of render() if render is provided', done => {
      expect(fetchComponent({ render: () => 'React text' })).to.equal('React text')
      done()
    })

    it('should return the result of render() even if children is provided', done => {
      const children = (<span>React text 2</span>)
      expect(fetchComponent({ render: () => 'React text', children })).to.equal('React text')
      done()
    })
  })

  describe('with children prop', () => {
    it('should return the children if provided', done => {
      const children = (<span>React text 2</span>)
      expect(fetchComponent({ children })).to.equal(children)
      done()
    })
  })

  it('returns the defaultProp if neither component, render nor children are provided', done => {
    expect(fetchComponent({}, {}, 'default')).to.equal('default')
    done()
  })

  it('accepts undefined props', done => {
    expect(fetchComponent).to.not.throw
    done()
  })
})
