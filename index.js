const appFactory = require('./app')
const config = require('./config')
const greeting = require('./components/greeting')

/**
 * create and run a new app server with a set of components
 */
function run () {
  const app = appFactory([
    ['/greeting', greeting]
  ])
  app.listen(config.port, console.log.bind(null, `listening on port ${config.port}`))
}

run()
