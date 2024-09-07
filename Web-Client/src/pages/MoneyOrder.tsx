import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';  // Import the NavBar component

const PayMoneyOrder: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>('');  // Stores the recipient's name
  const [recipientAddress, setRecipientAddress] = useState<string>('');  // Stores the recipient's address
  const [amount, setAmount] = useState<string>('');  // Stores the money order amount
  const [error, setError] = useState<string | null>(null);  // Stores validation errors

  // Function to handle payment processing
  const handlePayment = () => {
    const amountNumber = Number(amount);
    // Validate form inputs
    if (!recipientName || !recipientAddress || !amount) {
      setError('All fields are required.');
      return;
    }
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (amountNumber > 50000) {
      setError('The maximum amount for a Money Order is Rs. 50,000.');
      return;
    }

    // Reset error if validation passes
    setError(null);

    // Handle payment logic here
    alert(`Processing payment of Rs. ${amountNumber} to ${recipientName}.`);
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
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Pay Money Order
        </Typography>

        {/* Input field for recipient name */}
        <TextField
          label="Recipient Name"
          variant="outlined"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Input field for recipient address */}
        <TextField
          label="Recipient Address"
          variant="outlined"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Input field for amount */}
        <TextField
          label="Amount (Rs.)"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Display error message if any */}
        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {/* Payment Button */}
        <Button
          variant="contained"
          onClick={handlePayment}
          sx={{ backgroundColor: '#884343' }}
        >
          Pay Now
        </Button>
      </Box>
    </div>
  );
};

export default PayMoneyOrder;
