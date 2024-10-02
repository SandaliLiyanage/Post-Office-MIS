import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import NavBar from '../components/ui/NavBar'; 

interface TrackingInfo {
  status: string;
  location: string;
}

const TrackYourMail: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>(''); // Stores user input for tracking number
  const [status, setStatus] = useState<string | null>(null); // Stores the status of the mail
  const [location, setLocation] = useState<string | null>(null); // Stores the location of the mail

  // Simulate fetching tracking information
  const fetchTrackingInfo = async (trackingNumber: string): Promise<TrackingInfo> => {
    // Simulate an API call
    // Replace this with an actual API call to fetch tracking info
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'In Transit',
          location: 'Post Office 123, Colombo'
        });
      }, 1000); // Simulate network delay
    });
  };

  // Event handler when the user clicks 'Track'
  const handleTrack = async () => {
    if (trackingNumber.trim()) {
      try {
        const trackingInfo = await fetchTrackingInfo(trackingNumber);
        setStatus(trackingInfo.status);
        setLocation(trackingInfo.location);
      } catch (error) {
        console.error('Error fetching tracking info:', error);
        alert('Failed to fetch tracking information.');
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
            {status && (
              <Typography variant="h6">
                <strong>Status:</strong> {status}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {location && (
              <Typography variant="h6">
                <strong>Location:</strong> {location}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TrackYourMail;
