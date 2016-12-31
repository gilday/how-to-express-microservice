/**
 * indicates a client request is badly formatted
 */
module.exports = class BadRequestError extends Error {
  constructor (message) {
    super(message)
    this.name = 'BadRequestError'
    this.message = message
  }
}
