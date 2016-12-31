const config = require('../../config')
const routesFactory = require('./routes')
const GreetingService = require('./service')

/**
 * exports GreetingService singleton wired with values from configuration
 */
const service = new GreetingService(config.greeting)
module.exports = routesFactory(service)
