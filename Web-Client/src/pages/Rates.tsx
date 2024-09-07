import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar'; 

const CalculatePostalRates: React.FC = () => {
  const [weight, setWeight] = useState<string>('');  // Stores the weight input by the user
  const [rate, setRate] = useState<string | null>(null);  // Stores the calculated rate

  // Function to calculate the postal rate based on weight
  const calculateRate = (weight: number): string => {
    const baseRate = 50;  // Base rate in your local currency
    const ratePerGram = 0.2;  // Cost per additional gram
    return (baseRate + weight * ratePerGram).toFixed(2);  // Calculating the rate
  };

  // Event handler when the user clicks 'Calculate'
  const handleCalculate = () => {
    const weightNumber = Number(weight);
    if (weight && !isNaN(weightNumber) && weightNumber >= 0) {
      const postalRate = calculateRate(weightNumber);
      setRate(postalRate);  // Set the calculated rate
    } else {
      alert('Please enter a valid weight!');  // Display error if input is invalid
    }
  };

  return (
    <div>
      <NavBar />  {/* Add NavBar here */}
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
          type="number"  // Set type to number for better user experience
          inputProps={{ min: "0" }}  // Prevent negative values
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
