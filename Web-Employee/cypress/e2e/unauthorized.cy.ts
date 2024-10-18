describe('login for receptionist', () => {
    it('existence', () => {
      cy.visit('/not-authorized');
      cy.get('[data-testid="cypress-unauthorized-title"]', { timeout: 10000 }).should("exist")
      .should('have.text', 'Go Back');
    })
})