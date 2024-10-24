describe('login for receptionist', () => {
  beforeEach(() => {
    cy.login("0007", "testpassword7");
  });

  it('existence', () => {
      cy.visit('/dashboard/postmanAssignments');
      cy.get('[data-testId="cypress-postmanAssignments-title"]', { timeout: 10000 }).should("exist")
      .should('have.text', 'Mail and Area Assignments');
    })
})