import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import NavBar from '../components/ui/NavBar';  // Import the NavBar component
import {IP} from '../../config'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PayMoneyOrder: React.FC = () => {
const stripe = useStripe();
const elements = useElements();

const [recipientName, setRecipientName] = useState<string>('');  // Stores the recipient's name
const [recipientAddress, setRecipientAddress] = useState<string>('');  // Stores the recipient's address
const [recipientNIC, setRecipientNIC] = useState<string>('');  // Stores the recipient's NIC
const [amount, setAmount] = useState<string>('');  // Stores the money order amount
const [senderName, setSenderName] = useState<string>('');  // Stores the sender's name
const [senderPhoneNumber, setPhoneNumber] = useState<string>('');  // Stores the sender's phone number
const [error, setError] = useState<string | null>(null);  // Stores validation errors


const resetForm = () => {
  setRecipientName('');
  setRecipientAddress('');
  setRecipientNIC('');
  setAmount('');
  setSenderName('');
  setPhoneNumber('');
  setError(null);  // Reset error state
};


// Function to handle payment processing
const handlePayment = async () => {
  const amountNumber = Number(amount);

  // Validate form inputs
  if (!recipientName || !recipientAddress || !recipientNIC || !amount || !senderName || !senderPhoneNumber) {
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

  try {
      // Call your backend to create the payment intent using Axios
      const response = await axios.post(`http://${IP}/money-order`, {
          recipientName,
          recipientAddress,
          recipientNIC,
          amount: amountNumber,
          senderName,
          senderPhoneNumber,
      });

      const paymentIntentData = response.data;

      if (stripe && elements) {
          const cardElement = elements.getElement(CardElement);

          if (!cardElement) {
              setError('Card element is not available.');
              return;
          }

          // Confirm the card payment with the client secret returned from your backend
          const result = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
              payment_method: {
                  card: cardElement,
                  billing_details: {
                      name: senderName,
                      phone: senderPhoneNumber,
                  },
              },
          });

          if (result.error) {
              setError(result.error.message || 'An unknown error occurred.');
          } else {
              // Payment successful
              if (result.paymentIntent.status === 'succeeded') {
                alert('Payment succeeded!');
            
                try {
                    const webhookResponse = await axios.post(`http://${IP}/money-order/stripe-webhook`, 
                      {
                        id: "evt_test_webhook", // This is a test webhook event ID
                        type: "payment_intent.succeeded",
                        data: {
                          object: {
                            id: `${paymentIntentData.id}`, // Payment intent ID from your paymentIntentData
                            metadata: {
                              orderId: `${paymentIntentData.orderID}`, // Replace with your actual order ID from your DB
                            },
                            status: "succeeded",
                          },
                        },
                      }
                    );
            
                    console.log(webhookResponse.data); // Log the response from the webhook
                    resetForm();
                    cardElement.clear();

                } catch (error) {
                    console.error('Error sending webhook:', error);
                    setError('Failed to send webhook after payment success.');
                }
              }

            }
          
      } else {
          setError('Stripe or elements not initialized.');
      }
} catch (error) {
    // Handle errors from the Axios request
    if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Failed to create payment intent.');
    } else {
        setError('An unknown error occurred.');
    }
  }
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

            <TextField
              data-cy="sender-name"  
              label="Sender's Name"
              variant="outlined"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            <TextField
              data-cy="phone-number"  
              label="Phone Number"
              variant="outlined"
              value={senderPhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
          </Paper>

          {/* Box for Recipient's Information */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', width: '30%' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Recipient's Information
            </Typography>

            <TextField
              data-cy="recipient-name"  
              label="Recipient Name"
              variant="outlined"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            <TextField
              data-cy="recipient-address"  
              label="Recipient Address"
              variant="outlined"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            <TextField
              data-cy="recipient-nic"  
              label="NIC Number"
              variant="outlined"
              value={recipientNIC}
              onChange={(e) => setRecipientNIC(e.target.value)}
              sx={{ marginBottom: '20px', width: '100%' }}
            />

            <TextField
              data-cy="amount"  
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

            {/* Card Element for Stripe */}
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />


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
