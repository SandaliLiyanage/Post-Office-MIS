describe('Feedback Form', () => {
    beforeEach(() => {
      cy.visit('/feedback'); // Adjust this to your feedback form URL
    });
  
    it('should fill out and submit the feedback form successfully', () => {
      // Fill out the Name field
      cy.get('input[name="name"]').type('John Doe');
      
      // Fill out the Email field
      cy.get('input[name="email"]').type('john.doe@example.com');
      
      // Fill out the Contact Number field
      cy.get('input[name="contactNumber"]').type('0712345678');
      
      // Fill out the Post ID field
      cy.get('input[name="postID"]').type('123456');
      
      // Open the Post Office dropdown and select an option
      cy.get('div[role="button"][aria-haspopup="listbox"]').click(); // Open the dropdown
      cy.get('li').contains('Colombo Main').click(); // Select the option
  
      // Fill out the Issue Description
      cy.get('textarea[name="issue"]').type('My package was delayed.');
  
      // Submit the form
      cy.get('button').contains('Submit').click();
  
      // Validate the submission success message (adjust based on your logic)
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Feedback submitted successfully!');
      });
    });
  
    it('should show an error message when fields are missing', () => {
      // Attempt to submit the form without filling it out
      cy.get('button').contains('Submit').click();
  
      // Validate that the error message is displayed
      cy.get('body').should('contain', 'All fields are required.');
    });
  });
  