import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ marginY: '20px' }}>
        About Us
      </Typography>

      <Typography variant="h5" gutterBottom>
        Our Services
      </Typography>
      <Typography paragraph>
        We offer a range of postal services to cater to your needs. Our services include:
      </Typography>
      <Typography paragraph>
        <strong>Service 1:</strong> Description of Service 1. This includes detailed information about what the service offers.
      </Typography>
      <Typography paragraph>
        <strong>Service 2:</strong> Description of Service 2. This includes detailed information about what the service offers.
      </Typography>
      {/* Add more service descriptions as needed */}

      <Typography variant="h5" gutterBottom>
        Postal Rates
      </Typography>
      <Typography paragraph>
        Our postal rates are calculated based on the weight and destination of the item. Here is a brief overview of our rates:
      </Typography>
      <Typography paragraph>
        <strong>Domestic Rates:</strong> Details about domestic postal rates. This section includes rates for various weights and services.
      </Typography>
      <Typography paragraph>
        <strong>International Rates:</strong> Details about international postal rates. This section includes rates for various destinations and weights.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography paragraph>
        If you have any questions or need further information, please feel free to contact us at:
      </Typography>
      <Typography paragraph>
        Email: contact@postoffice.com
      </Typography>
      <Typography paragraph>
        Phone: +1 234 567 890
      </Typography>
    </Container>
  );
};

export default About;
