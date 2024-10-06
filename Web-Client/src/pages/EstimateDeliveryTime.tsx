import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';  

const EstimateDeliveryTime: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');  // Stores the tracking number
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);  // Stores the estimated delivery time
  const [receiverName, setReceiverName] = useState<string | null>(null);  // Stores the receiver's name (mocked)

  // Mock function to estimate delivery time and receiver's name based on tracking number
  const calculateEstimatedTime = (trackingNumber: string) => {
    if (trackingNumber) {
      return {
        deliveryTime: 'Estimated Delivery Time: 12 hours',  // Mocked delivery time
        receiver: 'John Carter',  // Mocked receiver's name
      };
    }
    return {
      deliveryTime: 'Unknown',
      receiver: 'Unknown',
    };
  };

  // Event handler for when the user clicks 'Estimate'
  const handleEstimate = () => {
    if (trackingNumber) {
      const { deliveryTime, receiver } = calculateEstimatedTime(trackingNumber);
      setEstimatedTime(deliveryTime);  // Set the estimated time
      setReceiverName(receiver);  // Set the receiver's name
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

        {/* Display the estimated delivery time and receiver's name */}
        {estimatedTime && receiverName && (
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            {estimatedTime} <br />
            Receiver: {receiverName}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default EstimateDeliveryTime;
