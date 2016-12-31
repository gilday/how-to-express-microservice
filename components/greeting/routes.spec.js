/* eslint-env mocha */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('supertest')
const appFactory = require('../../app')
const RemoteServiceError = require('../../errors/remote-service-error')
const routerFactory = require('./routes')

chai.use(sinonChai)
const expect = chai.expect

const service = {
  get: notStubbed,
  set: notStubbed
}
const router = routerFactory(service)
const app = appFactory([
  ['/greeting', router]
])

describe('greeting/routes', () => {
  beforeEach(() => {
    service.get = notStubbed
    service.set = notStubbed
  })

  describe('GET /', () => {
    it('returns 200 and greeting message with extra line-ending added', done => {
      service.get = sinon.stub().returns(Promise.resolve('hello, world!'))
      request(app)
        .get('/greeting')
        .expect('hello, world!\n')
        .expect(200, done)
    })

    it('returns 500 when greeting service fails', done => {
      service.get = () => Promise.reject(new RemoteServiceError('boom!'))
      request(app)
        .get('/greeting')
        .expect(502, done)
    })
  })

  describe('PUT /', () => {
    it('returns 204 when setting message', done => {
      service.set = sinon.stub().returns(Promise.resolve())
      request(app)
        .put('/greeting')
        .set('Content-Type', 'application/json')
        .send({ message: 'hola' })
        .expect(() => {
          expect(service.set).to.have.been.called
        })
        .expect(204, done)
    })

    it('returns 400 when the request format is wrong', done => {
      request(app)
        .put('/greeting')
        .set('Content-Type', 'application/json')
        .send({ bad: 0 })
        .expect(400, done)
    })
  })
})

function notStubbed () {
  throw new Error('not stubbed')
}
