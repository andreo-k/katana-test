## Description

Katana test assignment. A web-application that allows to create decks of cards, list cards within the deck and draw cards from the deck via the REST interface.

Implemented on top of nest.js version 8. Requires node.js at least version 14.

For scalability and fail-tolerance objectives the application takes advantage of in-memory database Redis to keep decks of cards there. So you can run multiple instances of the web-application which will share same instance of redis.    

The following API endpoints are available:

POST /deck

GET /deck/open/:uid

POST /deck/draw

Please see app.e2e-spec.ts for usage examples.

## Installation

```bash
$ npm install
```

## Running the app

Please note that running the app requires Redis running at localhost:6379.

By default the application listens port 3000.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# integration tests - please note that it requires Redis running at localhost:6379
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

