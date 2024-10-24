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
                throw new Error("Invalid tracking number. Must be a number.");
            }

            // Fetch mail details using the integer transaction ID
            const mailDetails = await mailRepository.trackMail(transactionIDInt);
            if (mailDetails.length > 0) {
                return mailDetails;
            } else {
                throw new Error("No mail details found for the given tracking number");
            }
        } catch (error) {
            console.error("Error fetching mail details:", error);
            throw error;
        }
    }

    // Updated estimateDeliveryTime function using coordinates
    async estimateDeliveryTime(bundleID: number): Promise<string> {
        // Fetch the bundle using the repository
        const bundle = await mailRepository.findBundleById(bundleID);
    
        if (!bundle) {
            throw new Error('Bundle not found');
        }
    
        const { currentPostCode, destPostalCode } = bundle;
        
        // Fetch the current post office using its postal code
        const currentPostOffice = await mailRepository.findByPostalCode(currentPostCode);
        const destinationPostOffice = await mailRepository.findByPostalCode(destPostalCode);
        
        if (!currentPostOffice || !destinationPostOffice) {
            throw new Error('Post office not found for one of the postal codes');
        }

        // Ensure both post offices have latitude and longitude
        if (!currentPostOffice.latitude || !currentPostOffice.longitude || 
            !destinationPostOffice.latitude || !destinationPostOffice.longitude) {
            throw new Error('Coordinates are missing for one of the post offices');
        }
        
        // Use the coordinates (latitude, longitude) for the Google Maps API
        const origin = `${currentPostOffice.latitude},${currentPostOffice.longitude}`;
        const destination = `${destinationPostOffice.latitude},${destinationPostOffice.longitude}`;

        const apiKey = "AIzaSyCLI12v3YiFsivav4C2p1FqWEBU1acjFeQ";  // Your API key
        const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

        // Call the Google Maps API with the coordinates
        const response = await axios.get(googleMapsUrl);
        console.log("Google Maps API Response:", response.data); // Log the response


        // Get the estimated duration from the response
        if (response.data.routes.length > 0) {
            const duration = response.data.routes[0].legs[0].duration; // Get estimated duration
            // Extract the duration in minutes
            const durationInMinutes = duration.value / 60; // 'duration.value' is in seconds, so we convert to minutes

            // Format the time to include 1 day
            const formattedDuration = `1 day and ${Math.round(durationInMinutes)} minutes`;

            return `Estimated delivery time is ${formattedDuration}`;
        } else {
            throw new Error("No routes found for the given locations");
        }
    }
}

export default TrackMail;
