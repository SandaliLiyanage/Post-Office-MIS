describe('login for receptionist', () => {
    it('existence', () => {
        cy.visit('/dashboard/postmanAssignments');
        cy.get('[data-testId="cypress-postmanAssignments-title"]', { timeout: 10000 }).should("exist")
        .should('have.text', 'Mail and Area Assignments');
      })
    })