describe('login for receptionist', () => {
    beforeEach(() => {
        cy.login("0008", "password8");
      });

    it('existence', () => {
      cy.visit('/dashboard/mailorder');
      cy.get('[data-testId="cypress-mailorder-title"]', { timeout: 10000 }).should("exist")
      .should('have.text', 'Mail Order');
    })

    it('fill customer data',()=>{
        cy.visit('/dashboard/mailorder');
        cy.get('input[placeholder="Customer Name"]', { timeout: 10000 }).should('exist').clear().type("Sandali");
        cy.get('input[placeholder="Telephone"]', { timeout: 10000 }).should('exist').clear().type("0769445355");
        cy.get('[data-testId="cypress-address_search"]', { timeout: 10000 }).should('exist').clear().type("4");
        cy.get('[data-testId="suggestion-dropdown"]', { timeout: 10000 }) .find('[data-testid="suggestion-item"]').contains("440, Dutugemunu Mw, Battaramulla, 10120") // Check for the specific text
        .should('exist').click({force:true});
        cy.get('button[type="submit"]').should('exist').click();
        cy.get('[data-testId="cypress-mailorder-title"]', { timeout: 10000 }).should("exist")
        .should('have.text', 'Mail Order');
        cy.get('input[placeholder="Recepient Name"]', { timeout: 10000 }).should('exist').clear().type("Sandali");
        cy.get('[data-testId="cypress-address_search"]', { timeout: 10000 }).should('exist').clear().type("5");
        cy.get('[data-testId="suggestion-dropdown"]', { timeout: 10000 }) .find('[data-testid="suggestion-item"]').contains("55, Matale Rd, Akurana, 20850") // Check for the specific text
        .should('exist').click({force:true});
        cy.get('[data-testId="mailtype-dropdown"]') .click();
        cy.get('[data-testid="select-item"]')
        .should('exist') 
        .contains("Normal mail") 
        .click({force: true}); 
        cy.get('input[placeholder="Weight"]', { timeout: 10000 }).should('exist').clear().type("56");
        cy.get('[data-testid="calculate-button"]').should('exist').click();

    })


  
   
  })