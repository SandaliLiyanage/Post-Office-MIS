// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in the user
       * @param username - Username for login
       * @param password - Password for login
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
  