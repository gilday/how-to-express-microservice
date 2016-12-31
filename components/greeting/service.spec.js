/* eslint-env mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const GreetingService = require('./service')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('greeting/service', () => {
  it('returns default greeting', done => {
    const greeting = 'default'
    const service = new GreetingService(greeting)
    expect(service.get()).to.eventually.equal(greeting).notify(done)
  })

  it('sets and gets a greeting', done => {
    const service = new GreetingService()
    const greeting = 'hello, from my fancy unit test'
    service.set(greeting).then(() => {
      expect(service.get()).to.eventually.equal(greeting).notify(done)
    })
  })
})
