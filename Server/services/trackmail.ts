import { MailRepository } from "../repositeries/mailrepository";
import axios from 'axios';


const mailRepository = new MailRepository();

class TrackMail {
    async getTrackingDetails(transactionID: string) {
        try {
            // Convert the transactionID to an integer
            const transactionIDInt = parseInt(transactionID, 10);

            // Check if conversion was successful and is a valid number
            if (isNaN(transactionIDInt)) {
                throw new Error("Invalid transaction ID. Must be a number.");
            }

            // Fetch mail details using the integer transaction ID
            const mailDetails = await mailRepository.trackMail(transactionIDInt);
            if (mailDetails.length > 0) {
                return mailDetails;
            } else {
                throw new Error("No mail details found for the given transaction ID");
            }
        } catch (error) {
            console.error("Error fetching mail details:", error);
            throw error;
        }
    }

    // Get current and destination post office and estimate delivery time
    async estimateDeliveryTime(transactionID: number): Promise<string> {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Your API key from env variable
      
        if (!apiKey) {
          throw new Error("Google Maps API key is missing.");
        }
      
        try {
          // Step 1: Get current and destination post offices
          const { currentPostOffice, destinationPostOffice } = await mailRepository.getCurrentAndDestinationPostOffices(
            transactionID
          );
      
          if (!currentPostOffice || !destinationPostOffice) {
            throw new Error("Could not fetch post office information.");
          }
      
          // Step 2: Ensure latitude and longitude are not null, then estimate delivery time
          if (
            currentPostOffice.latitude !== null &&
            currentPostOffice.longitude !== null &&
            destinationPostOffice.latitude !== null &&
            destinationPostOffice.longitude !== null
          ) {
            // Use Google Maps API to estimate delivery time
            const deliveryTime = await this.getDeliveryTime(
              currentPostOffice.latitude,
              currentPostOffice.longitude,
              destinationPostOffice.latitude,
              destinationPostOffice.longitude,
              apiKey
            );
      
            return deliveryTime;
          } else {
            throw new Error("Invalid postal office coordinates. Latitude and longitude cannot be null.");
          }
        } catch (error) {
          console.error("Error estimating delivery time:", error);
          throw error;
        }
      }
      

    // Helper function to estimate delivery time using Google Maps API
    private async getDeliveryTime(
        originLat: number,
        originLng: number,
        destLat: number,
        destLng: number,
        apiKey: string
    ): Promise<string> {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLat},${originLng}&destinations=${destLat},${destLng}&key=${apiKey}`;
        
        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
                const duration = data.rows[0].elements[0].duration.text; // Estimated time as a human-readable string (e.g., "1 hour 20 mins")
                return duration;
            } else {
                throw new Error("Unable to estimate delivery time.");
            }
        } catch (error) {
        console.error("Error calling Google Maps API:", error);
        throw new Error("Failed to estimate delivery time.");
        }
    }
}


export default TrackMail;