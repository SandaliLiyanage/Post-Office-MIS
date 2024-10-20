describe("Estimate Delivery Time", () => {
    beforeEach(() => {
      // Visit the Estimate Delivery Time page before each test
      cy.visit("/estimate-delivery-time"); // Adjust the URL according to your routing setup
    });
  
    it("should estimate delivery time successfully", () => {
      const trackingNumber = "123456"; // Example tracking number
  
      // Intercept the POST request to the backend API
      cy.intercept("POST", "http://localhost:5001/mail/estimate-delivery-time", {
        statusCode: 200,
        body: {
          success: true,
          deliveryTime: "Estimated Delivery Time: 3-5 Business Days", // Sample response
        },
      }).as("estimateDeliveryTime");
  
      // Enter the tracking number into the input field
      cy.get("input[placeholder='Tracking Number']").type(trackingNumber);
  
      // Click the Estimate button
      cy.get("button").contains("Estimate").click();
  
      // Wait for the API response and assert the expected output
      cy.wait("@estimateDeliveryTime").then(() => {
        cy.get("h6").contains("Estimated Delivery Time: 3-5 Business Days").should("be.visible");
      });
    });
  
    it("should show an error message when the tracking number is invalid", () => {
      // Enter an invalid tracking number
      cy.get("input[placeholder='Tracking Number']").type("invalid_number");
  
      // Click the Estimate button
      cy.get("button").contains("Estimate").click();
  
      // Check for the alert message
      cy.on("window:alert", (txt) => {
        expect(txt).to.contains("Please enter a valid tracking number (only numbers are allowed).");
      });
    });
  
    it("should show an error message when no delivery time is returned", () => {
      const trackingNumber = "654321"; // Example tracking number
  
      // Intercept the POST request to simulate an error response
      cy.intercept("POST", "http://localhost:5001/mail/estimate-delivery-time", {
        statusCode: 200,
        body: {
          success: false,
          message: "Failed to estimate delivery time.",
        },
      }).as("estimateDeliveryTimeError");
  
      // Enter the tracking number into the input field
      cy.get("input[placeholder='Tracking Number']").type(trackingNumber);
  
      // Click the Estimate button
      cy.get("button").contains("Estimate").click();
  
      // Wait for the API response and assert the error message
      cy.wait("@estimateDeliveryTimeError").then(() => {
        cy.get("h6").contains("Failed to estimate delivery time.").should("be.visible");
      });
    });
  });
  