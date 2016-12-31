const express = require('express')
const BadRequestError = require('../../errors/bad-request-error')

/**
 * factory produces an express Router for the Greeting routes
 * @param {GreetingService} service
 */
module.exports = service => {
  const router = express.Router()

  router.get('/', function getGreeting (req, res, next) {
    service.get().then(greeting => res.send(greeting + '\n'), next)
  })

  router.put('/', function setGreeting (req, res, next) {
    if (!req.body.message) {
      throw new BadRequestError('expected request to contain JSON with property "message"')
    }
    const greeting = req.body.message
    service.set(greeting).then(() => res.sendStatus(204), next)
  })

  return router
}
