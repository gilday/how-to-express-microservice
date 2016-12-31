const BadRequestError = require('./bad-request-error')
const RemoteServiceError = require('./remote-service-error')

/**
 * express middleware for mapping Error types to responses.
 * If no mappping is found, pass control to the next error handler middleware
 * @param {Error} err
 */
module.exports = function mapError (err, req, res, next) {
  if (err instanceof BadRequestError) {
    res.status(400).send(err.message)
  } else if (err instanceof RemoteServiceError) {
    res.status(502).send(err.message)
  } else {
    next(err)
  }
}
