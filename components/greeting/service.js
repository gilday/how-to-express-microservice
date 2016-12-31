/**
 * represents a service that is unaware of HTTP and returns asynchronous results
 */
module.exports = class GreetingService {
  constructor (message) {
    this.message = message
  }

  /**
   * simulate an asynchronous call by returning the message wrapped in a Promise
   */
  get () {
    return Promise.resolve(this.message)
  }

  /**
   * sets the message asynchronously
   */
  set (message) {
    this.message = message
    return Promise.resolve()
  }
}
