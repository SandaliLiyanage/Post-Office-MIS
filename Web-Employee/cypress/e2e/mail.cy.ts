describe('login for receptionist', () => {
it('existence', () => {
    cy.visit('/dashboard/mail');
    cy.get('[data-testId="cypress-mail-title"]', { timeout: 10000 }).should("exist")
    .should('have.text', 'Mail Order');
  })
})