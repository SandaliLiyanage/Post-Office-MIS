import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import NavBar from '../components/ui/NavBar';  

const EstimateDeliveryTime: React.FC = () => {
  const [destination, setDestination] = useState<string>('');  // Stores the delivery destination
  const [serviceType, setServiceType] = useState<string>('');  // Stores the selected service type
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);  // Stores the estimated delivery time

  // Function to estimate delivery time based on destination and service type
  const calculateEstimatedTime = (serviceType: string) => {
    // Mock logic for estimating delivery time
    if (serviceType === 'standard') {
      return '5-7 Business Days';
    } else if (serviceType === 'express') {
      return '2-3 Business Days';
    }
    return 'Unknown';
  };

  // Event handler for when the user clicks 'Estimate'
  const handleEstimate = () => {
    if (destination && serviceType) {
      const estimatedTime = calculateEstimatedTime(serviceType);
      setEstimatedTime(estimatedTime);  // Set the estimated time
    } else {
      alert('Please fill in all fields.');
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
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Estimate Delivery Time
        </Typography>

        {/* Input field for destination */}
        <TextField
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Select field for service type */}
        <Select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          displayEmpty
          sx={{ marginBottom: '20px', width: '300px' }}
        >
          <MenuItem value="" disabled>Select Service Type</MenuItem>
          <MenuItem value="standard">Standard Delivery</MenuItem>
          <MenuItem value="express">Express Delivery</MenuItem>
        </Select>

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
            Estimated Delivery Time: {estimatedTime}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default EstimateDeliveryTime;
