import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import NavBar from "../components/ui/NavBar";
import axios from "axios"; // Import axios for HTTP requests
import {IP} from '../../config'


const CalculatePostalRates: React.FC = () => {
  const [weight, setWeight] = useState<string>(""); // Stores the weight input by the user
  const [rate, setRate] = useState<string | null>(null); // Stores the calculated rate
  const [mailType, setMailType] = useState<string>("normal mail"); // Stores the selected mail type

  // Event handler when the user clicks 'Calculate'
  const handleCalculate = async () => {
    const weightNumber = Number(weight);

    if (!weight || isNaN(weightNumber) || weightNumber <= 0) {
      alert("Please enter a valid weight!");
      return;
    }

    try {
      // Make a POST request to the backend to calculate the postal rate
      const response = await axios.post(
        `http://${IP}/mail/calculatePrice`,
        {
          mailType,
          weight: weightNumber,
        }
      );

      console.log(response.data);

      // Set the rate based on the backend response
      setRate(response.data);
    } catch (error) {
      console.error("Error calculating postal rate:", error);
      alert("Failed to calculate postal rate");
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
        sx={{ marginTop: "64px" }} // Adjust margin to ensure content is below the NavBar
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Calculate Postal Rates
        </Typography>

        {/* Dropdown for selecting mail type */}
        <FormControl
          variant="outlined"
          sx={{ marginBottom: "20px", width: "300px" }}
        >
          <InputLabel id="mail-type-label">Mail Type</InputLabel>
          <Select
            labelId="mail-type-label"
            value={mailType}
            onChange={(e) => setMailType(e.target.value as string)}
            label="Mail Type"
          >
            <MenuItem value="normal mail">Normal Mail</MenuItem>
            <MenuItem value="registered mail">Registered Mail</MenuItem>
            <MenuItem value="courier">Courier</MenuItem>
          </Select>
        </FormControl>

        {/* Input field for weight */}
        <TextField
          label="Weight (in grams)"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          sx={{ marginBottom: "20px", width: "300px" }}
          type="number" // Set type to number for better user experience
          inputProps={{ min: "0" }} // Prevent negative values
        />

        {/* Calculate Button */}
        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{ backgroundColor: "#884343" }}
        >
          Calculate
        </Button>

        {/* Display the calculated rate */}
        {rate && (
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Calculated Postal Rate: {rate} LKR
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CalculatePostalRates;
