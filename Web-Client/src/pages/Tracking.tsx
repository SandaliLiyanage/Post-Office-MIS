import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import NavBar from "../components/ui/NavBar";
import axios from "axios";
import {IP} from '../../config'
enum MailStatus {
  IN_TRANSIT = "In Transit",
  DELIVERED = "Delivered",
  RETURNED = "Returned",
}

interface TrackingInfo {
  recepientName: string;
  mailstatus: MailStatus;
  postOfficeName: string;
}

const TrackYourMail: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>(""); // Stores user input for tracking number
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null); // Stores the tracking info
  const [error, setError] = useState<string | null>(null); // State for error message

  // Function to fetch tracking information from the backend API
  const fetchTrackingInfo = async (
    transactionID: number
  ): Promise<TrackingInfo | null> => {
    try {
      const response = await axios.post(`http://${IP}/mail/track`, {
        transactionID,
      });
      console.log("Response from server:", response.data);

      if (response.data.success) {
        const resData = response.data.data[0]; // Use the first item in the array

        // Optional: map enum to user-friendly status
        const userFriendlyMailStatus =
          MailStatus[resData.mailstatus as keyof typeof MailStatus];

        return {
          recepientName: resData.recepientName,
          mailstatus: userFriendlyMailStatus,
          postOfficeName: resData.postOfficeName,
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      throw new Error("Failed to fetch tracking information.");
    }
  };

  // Event handler for when the user clicks 'Track'
  const handleTrack = async () => {
    const num = parseInt(trackingNumber, 10); // Parse input as an integer
    if (isNaN(num)) {
      setError("Please enter a valid tracking number!"); // Validate input
      return;
    }

    setError(null); // Clear any previous errors
    try {
      const info = await fetchTrackingInfo(num);
      //console.log("Fetched dataaaaaa");
      //console.log(info);
      if (info) {
        setTrackingInfo(info); // Set the tracking information
        //console.log(trackingInfo);
      } else {
        setTrackingInfo(null); // No info found
        setError("No tracking information found for this number.");
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Failed to fetch tracking information.";
      setError(errorMessage); // Set the error message
      setTrackingInfo(null); // Clear previous tracking info
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ marginY: "20px" }}
        >
          Track Your Mail
        </Typography>

        {/* Input field for tracking number */}
        <TextField
          label="Tracking Number"
          variant="outlined"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)} // Only updates state on user input
          sx={{ marginBottom: "20px", width: "100%" }}
        />

        {/* Track Button */}
        <Button
          variant="contained"
          onClick={handleTrack} // Function is only called when 'Track' button is clicked
          sx={{ backgroundColor: "#884343" }}
        >
          Track
        </Button>

        {/* Display error message */}
        {error && (
          <Typography variant="h6" color="error" sx={{ marginTop: "20px" }}>
            {error}
          </Typography>
        )}

        {/* Display tracking information */}
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {trackingInfo && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Recipient Name:</strong> {trackingInfo.recepientName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Status:</strong> {trackingInfo.mailstatus}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Location:</strong> {trackingInfo.postOfficeName}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default TrackYourMail;
