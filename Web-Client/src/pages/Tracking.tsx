import React, { useState } from 'react'; 
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import NavBar from '../components/ui/NavBar'; 
import axios from 'axios'; // Import axios for making HTTP requests

interface TrackingInfo {
  recepientName: string; // Assuming you also want to display recipient name
  mailstatus: string;
  postOfficeName: string;
}

const TrackYourMail: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>(''); // Stores user input for tracking number
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null); // Stores the tracking info

  // Function to fetch tracking information from the backend API
  const fetchTrackingInfo = async (transactionID: string): Promise<TrackingInfo | null> => {
    try {
      const response = await axios.get(`/trackMail/${transactionID}`); // Adjust the URL as necessary
      return response.data.data; // Access the data returned from the backend
    } catch (error) {
      console.error('Error fetching tracking info:', error);
      throw new Error('Failed to fetch tracking information.');
    }
  };

  // Event handler when the user clicks 'Track'
const handleTrack = async () => {
  if (trackingNumber.trim()) {
    try {
      const info = await fetchTrackingInfo(trackingNumber);
      setTrackingInfo(info); // Set the tracking information
    } catch (error) {
      // Use type assertion to tell TypeScript that error is of type Error
      const errorMessage = (error as Error).message || 'Failed to fetch tracking information.';
      alert(errorMessage); // Show the error message
    }
  } else {
    alert('Please enter a valid tracking number!');
  }
};


  return (
    <div>
      <NavBar /> 
      <Container>
        <Typography variant="h3" gutterBottom align="center" sx={{ marginY: '20px' }}>
          Track Your Mail
        </Typography>

        {/* Input field for tracking number */}
        <TextField
          label="Tracking Number"
          variant="outlined"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          sx={{ marginBottom: '20px', width: '100%' }}
        />

        {/* Track Button */}
        <Button
          variant="contained"
          onClick={handleTrack}
          sx={{ backgroundColor: '#884343' }}
        >
          Track
        </Button>

        {/* Display tracking information */}
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            {trackingInfo && (
              <Typography variant="h6">
                <strong>Recipient Name:</strong> {trackingInfo.recepientName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {trackingInfo && (
              <Typography variant="h6">
                <strong>Status:</strong> {trackingInfo.mailstatus}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {trackingInfo && (
              <Typography variant="h6">
                <strong>Location:</strong> {trackingInfo.postOfficeName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TrackYourMail;
