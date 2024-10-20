describe('Mail Order Form', () => {
  beforeEach(() => {
    cy.login("0008", "testpassword8");
  });

  const fillCustomerData = (name:string, telephone:string, search: string, address:string) => {
      cy.get('input[placeholder="Customer Name"]').clear().type(name);
      cy.get('input[placeholder="Telephone"]').clear().type(telephone);
      cy.get('[data-testId="cypress-address_search"]').clear().type(search);
      cy.get('[data-testId="suggestion-dropdown"]')
          .find('[data-testid="suggestion-item"]')
          .contains(address)
          .should('exist')
          .click({ force: true });
  };

  const fillRecipientData = (name:string, search:string, address:string) => {
      cy.get('input[placeholder="Recepient Name"]').clear().type(name);
      cy.get('[data-testId="cypress-address_search"]').clear().type(search);
      cy.get('[data-testId="suggestion-dropdown"]')
          .find('[data-testid="suggestion-item"]')
          .contains(address)
          .should('exist')
          .click({ force: true });
  };

  const selectMailType = (mailType:string) => {
      cy.get('[data-testId="mailtype-dropdown"]').should('exist').click();
      cy.get('[data-testid="select-item"]').should('be.visible').contains(mailType,{timeout: 10000}).click({ force: true });
  };

  const checkReceipt = ()=>{
      cy.contains("The Total Amount = Rs: 90")
      cy.get('[data-testId="print-barcode-button"]').should("exist");
      cy.get('[data-testId="end-transaction"]').should("exist").click();
      cy.get('[data-testId="cypress-mailorder-title"]').should('have.text', 'Mail Order');
      
  }

  it('fills out the mail order form correctly', () => {
      cy.visit('/dashboard/mailorder');

      fillCustomerData("Sandali", "0769445355", "4", "440, Dutugemunu Mw, Battaramulla, 10120");
      cy.get('button[type="submit"]').click();
      
      cy.get('[data-testId="cypress-mailorder-title"]').should('have.text', 'Mail Order');
      
      fillRecipientData("Sandali", "5", "55, Matale Rd, Akurana, 20850");
      selectMailType("Normal mail");
      cy.get('input[placeholder="Weight"]').clear().type("56");
      cy.get('[data-testid="calculate-button"]').click();
      cy.get('button[type="submit"]').click()
      cy.contains("Mail 1")
      cy.get('[data-testid="print-receipt-button"]').click();
      checkReceipt();
  });
});
