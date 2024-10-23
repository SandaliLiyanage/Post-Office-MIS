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
      const cardNumber = '1234 5678 9012 3456';
      const expiryDate = '12/25';
      const pin = '123';
  
      // Input values for the payment form
      cy.get('[data-cy="sender-name"]').should('be.visible').type(senderName);
      cy.get('[data-cy="phone-number"]').should('be.visible').type(phoneNumber);
      cy.get('[data-cy="recipient-name"]').should('be.visible').type(recipientName);
      cy.get('[data-cy="recipient-address"]').should('be.visible').type(recipientAddress);
      cy.get('[data-cy="recipient-nic"]').should('be.visible').type(recipientNIC);
      cy.get('[data-cy="amount"]').should('be.visible').type(amount);
      cy.get('[data-cy="card-number"]').should('be.visible').type(cardNumber);
      cy.get('[data-cy="expiry-date"]').should('be.visible').type(expiryDate);
      cy.get('[data-cy="pin"]').should('be.visible').type(pin);
  
      // Submit the form
      cy.get('button').contains('Pay Now').click();
  
      // Assert that an alert is shown with the correct message
      cy.on('window:alert', (text) => {
        expect(text).to.contains(`Processing payment of Rs. ${amount} to ${recipientName}. Payment made by ${senderName}.`);
      });
    });
  
    it('should show error message when required fields are empty', () => {
      // Click the Pay Now button without filling out the form
      cy.get('button').contains('Pay Now').click();
  
      // Check for the error message
      cy.get('body').contains('All fields are required.').should('be.visible');
    });
  });
  