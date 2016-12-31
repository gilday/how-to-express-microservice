/**
 * indicates an error occurred while making a request to an upstream service
 */
module.exports = class RemoteServiceError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.name = 'RemoteServiceError'
  }
}
