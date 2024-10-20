import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import NavBar from '../components/ui/NavBar';  // Import the NavBar component
import {IP} from '../../config'

const PayMoneyOrder: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>('');  // Stores the recipient's name
  const [recipientAddress, setRecipientAddress] = useState<string>('');  // Stores the recipient's address
  const [recipientNIC, setRecipientNIC] = useState<string>('');  // Stores the recipient's NIC
  const [amount, setAmount] = useState<string>('');  // Stores the money order amount
  const [senderName, setSenderName] = useState<string>('');  // Stores the sender's name
  const [phoneNumber, setPhoneNumber] = useState<string>('');  // Stores the sender's phone number
  const [cardNumber, setCardNumber] = useState<string>('');  // Stores the card number
  const [expiryDate, setExpiryDate] = useState<string>('');  // Stores the card expiry date
  const [pin, setPin] = useState<string>('');  // Stores the card pin
  const [error, setError] = useState<string | null>(null);  // Stores validation errors

  // Function to handle formatting of the card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, ''); // Remove any spaces
    if (value.length > 16) {
      return; // Restrict card number to 16 digits
    }
    // Add a space after every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  // Function to handle PIN input and ensure it is only 3 digits
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 3) {
      setPin(value); // Restrict PIN to 3 digits
    }
  };

  // Function to handle payment processing
  const handlePayment = () => {
    const amountNumber = Number(amount);

    // Validate form inputs
    if (!recipientName || !recipientAddress || !recipientNIC || !amount || !senderName || !phoneNumber || !cardNumber || !expiryDate || !pin) {
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
    alert(`Processing payment of Rs. ${amountNumber} to ${recipientName}. Payment made by ${senderName}.`);
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
          Pay Money Order
        </Typography>

        {/* Box for form fields in a row layout */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ width: '100%', maxWidth: '1200px' }}
        >
          {/* Box for Sender's Information */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', width: '30%' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Sender's Information
            </Typography>

            {/* Input field for sender's name */}
            <TextField
              label="Sender's Name"
              variant="outlined"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            {/* Input field for phone number */}
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
          </Paper>

          {/* Box for Recipient's Information */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', width: '30%' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Recipient's Information
            </Typography>

            {/* Input field for recipient name */}
            <TextField
              label="Recipient Name"
              variant="outlined"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            {/* Input field for recipient address */}
            <TextField
              label="Recipient Address"
              variant="outlined"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            {/* Input field for recipient NIC */}
            <TextField
              label="NIC Number"
              variant="outlined"
              value={recipientNIC}
              onChange={(e) => setRecipientNIC(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            {/* Input field for amount */}
            <TextField
              label="Amount (Rs.)"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
          </Paper>

          {/* Box for Card Details */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', width: '30%' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Card Details
            </Typography>

            {/* Input field for card number */}
            <TextField
              label="Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={handleCardNumberChange}
              sx={{ marginBottom: '20px', width: '100%' }}
              inputProps={{ maxLength: 19 }}  
            />

            {/* Input field for expiry date */}
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              value={expiryDate}
              onChange={(e) => {
                let input = e.target.value.replace(/\D/g, '');  // Remove any non-digit characters
                if (input.length > 2) {
                  input = input.slice(0, 2) + '/' + input.slice(2);  // Insert '/' after first 2 digits
                }
                setExpiryDate(input);
              }}
              sx={{ marginBottom: '20px', width: '100%' }}
              inputProps={{ maxLength: 5 }}  // Max length of MM/YY
            />


            {/* Input field for PIN */}
            <TextField
              label="PIN"
              variant="outlined"
              type="password"
              value={pin}
              onChange={handlePinChange}
              sx={{ marginBottom: '20px', width: '100%' }}
              inputProps={{ maxLength: 3 }}  
            />
          </Paper>
        </Box>

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
