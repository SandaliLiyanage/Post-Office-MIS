import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';  

const EstimateDeliveryTime: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');  // Stores the tracking number
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);  // Stores the estimated delivery time

  // Function to estimate delivery time based on tracking number
  const calculateEstimatedTime = (trackingNumber: string) => {
    // Mock logic for estimating delivery time based on tracking number
    // For simplicity, we're returning static values here
    if (trackingNumber) {
      return 'Estimated Delivery Time: 3-5 Business Days'; // Mocked delivery time
    }
    return 'Unknown';
  };

  // Event handler for when the user clicks 'Estimate'
  const handleEstimate = () => {
    if (trackingNumber) {
      const estimatedTime = calculateEstimatedTime(trackingNumber);
      setEstimatedTime(estimatedTime);  // Set the estimated time
    } else {
      alert('Please enter a tracking number.');
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
        sx={{ padding: '20px' }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Estimate Delivery Time
        </Typography>

        {/* Input field for tracking number */}
        <TextField
          label="Tracking Number"
          variant="outlined"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Estimate Button */}
        <Button
          variant="contained"
          onClick={handleEstimate}
          sx={{ backgroundColor: '#884343' }}
        >
          Estimate
        </Button>

        {/* Display the estimated delivery time */}
        {estimatedTime && (
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            {estimatedTime}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default EstimateDeliveryTime;
