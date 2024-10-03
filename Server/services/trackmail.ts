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

    async estimateDeliveryTime(bundleID: number): Promise<string> {
        // Fetch the bundle using the repository
        const bundle = await mailRepository.findBundleById(bundleID);
    
        if (!bundle) {
          throw new Error('Bundle not found');
        }
    
        const { currentPostCode, destPostalCode } = bundle;
    
        // Use Google Maps API or other service to estimate delivery time
        const apiKey = "AIzaSyCLI12v3YiFsivav4C2p1FqWEBU1acjF";
        const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentPostCode}&destination=${destPostalCode}&key=${apiKey}`;
    
        const response = await axios.get(googleMapsUrl);
    
        const { duration } = response.data.routes[0].legs[0]; // Get estimated duration
    
        return `Estimated delivery time is ${duration.text}`;
      }
}


export default TrackMail;