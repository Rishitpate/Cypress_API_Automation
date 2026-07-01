# Cypress API Test Suite

This repository contains a Cypress-based API test suite for the ReqRes public API (`https://reqres.in`).

## Project Overview

The test suite covers API endpoints for:
- Getting a list of users
- Getting a single user
- Successful login
- Unsuccessful login
- Updating a user
- Deleting a user
- Requesting a user that does not exist

Test cases are located in `cypress/e2e/api-tests/api.cy.js`.

## Prerequisites

- Node.js installed on your machine
- npm available in your terminal

## Install Dependencies

From the project root, run:

```bash
npm install
```

## Run Cypress Tests

### Headless mode

```bash
npx cypress run
```

### Open interactive Cypress Test Runner

```bash
npx cypress open
```

## Configuration

The Cypress config file is `cypress.config.js`.

Key settings:
- `baseUrl`: `https://reqres.in/`
- `screenshotOnRunFailure`: `false`
- `video`: `false`

## Project Structure

- `cypress/e2e/api-tests/api.cy.js` - API test specification
- `cypress/fixtures/` - example response fixtures
- `cypress/support/` - Cypress support files
- `cypress.config.js` - Cypress configuration
- `package.json` - project metadata and dependencies

## Notes

This suite uses Cypress `cy.request()` to send HTTP requests and validate the returned JSON structure, status codes, and response headers.

If you want to add more tests, create new spec files under `cypress/e2e/` and update the suite accordingly.
