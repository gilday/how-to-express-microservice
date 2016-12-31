const bodyParser = require('body-parser')
const express = require('express')
const mapError = require('./errors/map-error')

/**
 * create a new app server, register middleware, register the given components
 * @return app - express app object
 */
module.exports = function factory (components) {
  const app = express()
  app.use(bodyParser.json())
  components.forEach(([context, router]) => {
    app.use(context, router)
  })
  app.use(mapError)
  return app
}
