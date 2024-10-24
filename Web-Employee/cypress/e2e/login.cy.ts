describe('login for receptionist', () => {
    it('passes', () => {
      cy.visit('/');
      cy.get('[data-testId="cypress-login-title"]', { timeout: 10000 }).should("exist")
      .should('have.text', 'Employee Login');
    })
    it("renders the login form", () => {
      cy.visit('/');
      cy.login("0008", "testpassword8");

    })
  })