import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import NavBar from '../components/ui/NavBar';  // Import your NavBar component

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    postID: '',
    postOffice: '',
    issue: ''
  });
  
  const [error, setError] = useState<string | null>(null);

  // Updated list of post offices for the dropdown
  const postOffices = ['Colombo Main', 'Galle', 'Jaffna', 'Negombo', 'Kandy']; 

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const { name, email, contactNumber, postID, postOffice, issue } = formData;

    // Basic validation
    if (!name || !email || !contactNumber || !postID || !postOffice || !issue) {
      setError('All fields are required.');
      return;
    }
    
    // Handle form submission logic here (e.g., send data to backend)
    alert('Feedback submitted successfully!');
    setError(null);  // Clear any previous errors
  };

  return (
    <div>
      <NavBar />  {/* Add NavBar at the top */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Feedback Form
        </Typography>

        {/* Input for Name */}
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          required
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Input for Email Address */}
        <TextField
          label="Email Address"
          name="email"
          variant="outlined"
          required
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Input for Contact Number */}
        <TextField
          label="Contact Number"
          name="contactNumber"
          variant="outlined"
          required
          value={formData.contactNumber}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Input for Post ID */}
        <TextField
          label="Post ID"
          name="postID"
          variant="outlined"
          required
          value={formData.postID}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Dropdown for Post Office */}
        <TextField
          select
          label="Post Office"
          name="postOffice"
          variant="outlined"
          required
          value={formData.postOffice}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        >
          {postOffices.map((office) => (
            <MenuItem key={office} value={office}>
              {office}
            </MenuItem>
          ))}
        </TextField>

        {/* Input for Issue Description */}
        <TextField
          label="What did you experience?"
          name="issue"
          variant="outlined"
          required
          multiline
          rows={4}
          value={formData.issue}
          onChange={handleChange}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Display error message */}
        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#884343', width: '150px' }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Feedback;
