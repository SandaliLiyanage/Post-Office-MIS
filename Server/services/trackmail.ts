import { MailRepository } from "../repositeries/mailrepository";

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
}


export default TrackMail;