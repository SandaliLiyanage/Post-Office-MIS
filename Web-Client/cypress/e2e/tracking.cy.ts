describe('Track Your Mail Page', () => {
    beforeEach(() => {
      // Visit the Track Your Mail page before each test
      cy.visit('http://localhost:5173/track-mail-item');
    });
  
    it('should display the page and allow the user to input a tracking number', () => {
      // Ensure the page title is visible
      cy.contains('h3', 'Track Your Mail').should('be.visible');
  
      // Select the input field using the label
      cy.get('input').invoke('attr', 'id').then((inputId) => {
        if (inputId) { // Check if inputId is defined
          const escapedId = inputId.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"); // Escaping special characters
          cy.get(`#${escapedId}`).type('123456'); // Use the escaped id in the selector
        } else {
          throw new Error('Input ID is undefined'); // Throw an error if inputId is undefined
        }
      });
  
      // Click the Track button
      cy.contains('button', 'Track').click();
    });
  
    it('should display tracking information when a valid tracking number is entered', () => {
      // Mock the backend response for a valid tracking number
      cy.intercept('POST', 'http://localhost:5001/mail/track', {
        statusCode: 200,
        body: {
          success: true,
          data: [
            {
              recepientName: 'John Doe',
              mailstatus: 'IN_TRANSIT',
              postOfficeName: 'Colombo Central Post Office',
            },
          ],
        },
      }).as('trackMail');
  
      // Input a valid tracking number
      cy.get('input').invoke('attr', 'id').then((inputId) => {
        if (inputId) {
          const escapedId = inputId.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"); // Escaping special characters
          cy.get(`#${escapedId}`).type('1');
        } else {
          throw new Error('Input ID is undefined');
        }
      });
  
      // Click the Track button
      cy.contains('button', 'Track').click();
  
      // Wait for the API call
      cy.wait('@trackMail');
  
      // Check if tracking information is displayed
      cy.contains('Recipient Name: John Doe').should('be.visible');
      cy.contains('Status: In Transit').should('be.visible');
      cy.contains('Location: Colombo Central Post Office').should('be.visible');
    });
  
    it('should show an error for invalid input (non-numeric tracking number)', () => {
      // Input a non-numeric tracking number
      cy.get('input').invoke('attr', 'id').then((inputId) => {
        if (inputId) {
          const escapedId = inputId.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"); // Escaping special characters
          cy.get(`#${escapedId}`).type('abc');
        } else {
          throw new Error('Input ID is undefined');
        }
      });
  
      // Click the Track button
      cy.contains('button', 'Track').click();
  
      // Check if the appropriate alert message is shown
      cy.contains('Please enter a valid tracking number!').should('be.visible');
    });
  });
  