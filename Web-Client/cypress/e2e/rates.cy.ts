describe('Calculate Postal Rates', () => {
  it('should load the page and allow the user to calculate postal rates', () => {
    // Visit the Calculate Postal Rates page
    cy.visit('http://localhost:5173/calculate-postal-rates');

    // Ensure the page title is visible
    cy.contains('h4', 'Calculate Postal Rates').should('be.visible');

    // Select a mail type from the dropdown (e.g., Registered Mail)
    cy.get('[id="mail-type-label"]').should('be.visible');
    cy.get('#mail-type-label').parent().click();
    cy.get('li').contains('Registered Mail').click();

    // Input a valid weight
    cy.get('input[type="number"]').type('150');

    // Click the Calculate button
    cy.contains('button', 'Calculate').click();

    // Check if the result is displayed
    cy.contains('Calculated Postal Rate:').should('be.visible');
  });

  it('should display an error for invalid weight', () => {
    // Visit the Calculate Postal Rates page
    cy.visit('http://localhost:5173/calculate-postal-rates');

    // Leave the weight empty and try to calculate
    cy.contains('button', 'Calculate').click();

    // Check if an alert is shown for invalid input
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a valid weight!');
    });
  });

  it('should not allow negative weights', () => {
    // Visit the Calculate Postal Rates page
    cy.visit('http://localhost:5173/calculate-postal-rates');

    // Input a negative weight
    cy.get('input[type="number"]').type('-50');

    // Click the Calculate button
    cy.contains('button', 'Calculate').click();

    // Check if an alert is shown for invalid input
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a valid weight!');
    });
  });
});
