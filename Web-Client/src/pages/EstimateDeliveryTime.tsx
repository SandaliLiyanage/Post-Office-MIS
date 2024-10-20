import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import NavBar from "../components/ui/NavBar";
import axios from "axios";

const EstimateDeliveryTime: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>(""); // Stores the tracking number
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null); // Stores the estimated delivery time
  const [error, setError] = useState<string | null>(null); // Stores error messages

  //const GOOGLE_MAPS_API_KEY = 'your_actual_api_key_here'; AIzaSyCLI12v3YiFsivav4C2p1FqWEBU1acjFeQ

  // Function to estimate delivery time based on tracking number
  const handleEstimate = async () => {
    if (trackingNumber) {
      const numericTrackingNumber = Number(trackingNumber);
      if (isNaN(numericTrackingNumber)) {
        alert(
          "Please enter a valid tracking number (only numbers are allowed)."
        );
        return;
      }

      try {
        // Send a POST request to the backend endpoint to estimate delivery time using Axios
        const response = await axios.post(
          "http://localhost:5001/mail/estimate-delivery-time",
          {
            bundleID: numericTrackingNumber, // Send tracking number as transactionID
          }
        );

        // Check if the response is successful
        if (response.data.success) {
          // Set the estimated delivery time from the response
          setEstimatedTime(response.data.deliveryTime);
          setError(null); // Clear any previous error messages
        } else {
          // Handle case where success is false
          setError("Failed to estimate delivery time.");
          setEstimatedTime(null); // Clear the estimated time on error
        }
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
        setEstimatedTime(null); // Clear the estimated time on error
      }
    } else {
      alert("Please enter a tracking number.");
    }
  };

  return (
    <div>
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ padding: "20px" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Estimate Delivery Time
        </Typography>

        {/* Input field for tracking number */}
        <TextField
          label="Tracking Number"
          variant="outlined"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          sx={{ marginBottom: "20px", width: "300px" }}
          placeholder="Tracking Number"
        />

        {/* Estimate Button */}
        <Button
          variant="contained"
          onClick={handleEstimate}
          sx={{ backgroundColor: "#884343" }}
        >
          Estimate
        </Button>

        {/* Display the estimated delivery time or error message */}
        {estimatedTime && (
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            {estimatedTime}
          </Typography>
        )}
        {error && (
          <Typography variant="h6" sx={{ marginTop: "20px", color: "red" }}>
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default EstimateDeliveryTime;
