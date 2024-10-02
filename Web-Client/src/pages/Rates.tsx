import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';
import axios from 'axios'; // Import axios for HTTP requests

const CalculatePostalRates: React.FC = () => {
  const [weight, setWeight] = useState<string>(''); // Stores the weight input by the user
  const [rate, setRate] = useState<string | null>(null); // Stores the calculated rate

  // Event handler when the user clicks 'Calculate'
  const handleCalculate = async () => {
    const weightNumber = Number(weight);
  
    if (!weight || isNaN(weightNumber) || weightNumber <= 0) {
      alert('Please enter a valid weight!');
      return;
    }
  
    try {
      // Make a POST request to the backend to calculate the postal rate
      const response = await axios.post('http://localhost:5000/calculatePrice', {
        mailType: 'default', // You can customize this based on your needs
        weight: weightNumber
      });
  
      // Set the rate based on the backend response
      setRate(response.data.price);
    } catch (error) {
      console.error("Error calculating postal rate:", error);
      alert('Failed to calculate postal rate');
    }
  };
  
  return (
    <div>
      <NavBar /> {/* Add NavBar here */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ marginTop: '64px' }} // Adjust margin to ensure content is below the NavBar
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Calculate Postal Rates
        </Typography>

        {/* Input field for weight */}
        <TextField
          label="Weight (in grams)"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
          type="number" // Set type to number for better user experience
          inputProps={{ min: "0" }} // Prevent negative values
        />

        {/* Calculate Button */}
        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{ backgroundColor: '#884343' }}
        >
          Calculate
        </Button>

        {/* Display the calculated rate */}
        {rate && (
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Estimated Postal Rate: {rate} LKR
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CalculatePostalRates;
