describe('login for receptionist', () => {
  beforeEach(() => {
    cy.login("0008", "testpassword8");
  });

    it('existence', () => {
      cy.visit('/dashboard/revenuereports');
      cy.get('[data-testid="cypress-unauthorized-title"]', { timeout: 10000 }).should("exist")
      .should('have.text', 'Go Back');
    })
})