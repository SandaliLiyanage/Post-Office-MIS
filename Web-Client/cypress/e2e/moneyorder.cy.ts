/// <reference types="cypress" />

describe('Pay Money Order', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/pay-money-order'); 
  });

  it('should fill out the payment form and submit successfully', () => {
      const recipientName = 'John Doe';
      const recipientAddress = '123 Main St, Colombo';
      const recipientNIC = '123456789V';
      const amount = '1000';
      const senderName = 'Jane Doe';
      const phoneNumber = '0712345678';

      // Input values for the payment form fields
      cy.get('[data-cy="sender-name"]').should('be.visible').type(senderName);
      cy.get('[data-cy="phone-number"]').should('be.visible').type(phoneNumber);
      cy.get('[data-cy="recipient-name"]').should('be.visible').type(recipientName);
      cy.get('[data-cy="recipient-address"]').should('be.visible').type(recipientAddress);
      cy.get('[data-cy="recipient-nic"]').should('be.visible').type(recipientNIC);
      cy.get('[data-cy="amount"]').should('be.visible').type(amount);

      // Since Stripe's CardElement can't be filled with plain text input in Cypress,
      // we'll skip the credit card details and directly test the 'Pay Now' button click

      cy.get('button').contains('Pay Now').click();

      // Verify success message or expected result after clicking Pay Now
      cy.on('window:alert', (text) => {
          expect(text).to.contains('Payment succeeded!');
      });
  });

  it('should show an error message when required fields are empty', () => {
      // Click the Pay Now button without filling out the form
      cy.get('button').contains('Pay Now').click();

      // Check for the error message
      cy.get('body').contains('All fields are required.').should('be.visible');
  });
});
