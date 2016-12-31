# how-to-express-microservice

An opinionated, personal template for a testable express.js http service

## Getting Started

0. install [Node.js](https://nodejs.org) LTS
1. install [yarn](https://yarnpkg.com/)
2. `yarn install`
3. `yarn start`

Try it out with some http requests

    # get message
    curl http://localhost:9000/greeting

    # update message
    curl -XPUT -H 'Content-Type: application/json' -d '{"message": "hola, mundo"}' http://localhost:9000/greeting


## Technologies

* yarn for package management
* express.js for http routing
* mocha, chai, sinon for test runners, assertions, and mocking
* supertest for http integration tests


## Architecture

`./index.js` uses the factory method defined in `./app.js` to construct an
express.js app object from a set of components. In this example, there is one
such component, `./components/greeting`.

Each component directory defines an `index.js` which exports a configured
express [Router](http://expressjs.com/en/4x/api.html#router): this is a
component's public API. Internally, the component likely defines a number of
testable modules for interacting with databases, external services, etc. 

Each component's `routes.js` module defines the skinny controller layer that
translates http requests into messages for domain services then translates the
responses from those domain services to http responses. This `routes.js` module
is testable because it defines a factory method that allows the router to use
mock implementations of domain services.
[supertest](https://github.com/visionmedia/supertest) does a great job of making
assertions about the router's behavior as seen in
`./components/greeting/routes.spec.js`.

Component services communicate errors to the routing layer by ways of throwing
an Error or returning a rejected Promise which contains an Error. The
`./errors/map-error.js` module is responsible for translating domain errors to
HTTP responses.
