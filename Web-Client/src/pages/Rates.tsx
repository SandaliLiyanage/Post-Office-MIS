import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';

const CalculatePostalRates: React.FC = () => {
  const [weight, setWeight] = useState<string>(''); // Stores the weight input by the user
  const [rate, setRate] = useState<string | null>(null); // Stores the calculated rate

  // Function to determine the postal rate based on the weight table provided
  const calculateRate = (weight: number): string => {
    if (weight > 0 && weight <= 250) return '200.00';
    if (weight > 250 && weight <= 500) return '250.00';
    if (weight > 500 && weight <= 1000) return '350.00';
    if (weight > 1000 && weight <= 2000) return '400.00';
    if (weight > 2000 && weight <= 3000) return '450.00';
    if (weight > 3000 && weight <= 4000) return '500.00';
    if (weight > 4000 && weight <= 5000) return '550.00';
    if (weight > 5000 && weight <= 6000) return '600.00';
    if (weight > 6000 && weight <= 7000) return '650.00';
    if (weight > 7000 && weight <= 8000) return '700.00';
    if (weight > 8000 && weight <= 9000) return '750.00';
    if (weight > 9000 && weight <= 10000) return '800.00';
    if (weight > 10000 && weight <= 15000) return '850.00';
    if (weight > 15000 && weight <= 20000) return '1100.00';
    if (weight > 20000 && weight <= 25000) return '1600.00';
    if (weight > 25000 && weight <= 30000) return '2100.00';
    if (weight > 30000 && weight <= 35000) return '2600.00';
    if (weight > 35000 && weight <= 40000) return '3100.00';

    return 'Rate not available for the entered weight';
  };

  // Event handler when the user clicks 'Calculate'
  const handleCalculate = () => {
    const weightNumber = Number(weight);
    if (weight && !isNaN(weightNumber) && weightNumber > 0) {
      const postalRate = calculateRate(weightNumber);
      setRate(postalRate); // Set the calculated rate
    } else {
      alert('Please enter a valid weight!'); // Display error if input is invalid
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
