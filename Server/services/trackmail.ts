import { MailRepository } from "../repositeries/mailrepository";

const mailRepository = new MailRepository();

class TrackMail{
    async getTrackingDetails(transactionID: string) {
        try {
            const mailDetails = await mailRepository.trackMail(transactionID);
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
