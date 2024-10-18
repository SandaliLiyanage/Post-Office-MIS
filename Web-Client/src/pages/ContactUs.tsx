import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';
import img4 from '../assets/image4.png'; // Assuming you have image4 in the assets folder

const ContactUs: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginTop: '20px' }}>
          {/* Introductory Text */}
          <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
            If you have any queries or clarifications on Sri Lanka Post or the services offered by the Department,
            please feel free to contact us using any of the following methods.
          </Typography>

          {/* Image */}
          <img src={img4} alt="Contact Us" style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }} />

          {/* Contact Details */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Head Office:
            </Typography>
            <Typography variant="body1">
              TelePhone No: +94 0112328301-3
            </Typography>
            <Typography variant="body1">
              (Fax): +94 011 2440555
            </Typography>
            <Typography variant="body1">
              Email: info@slpost.lk / pmg@slpost.lk
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              Address:
              <br />
              Post Master General,
              <br />
              Postal Head Quarters,
              <br />
              D.R Wijewardena Mawatha,
              <br />
              Colombo 10, 001000,
              <br />
              Sri Lanka.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ContactUs;
