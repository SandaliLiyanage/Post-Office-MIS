import React from 'react';
import { Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';  
import NavBar from '../components/ui/NavBar';
import ImageCard from '../components/ui/ImageCard';
import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';  
import img from '../assets/image.png';

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap"
          flexDirection={'row'}
          sx={{ marginTop: '10px' }}
        >
          {/* Link to Track Mail Page */}
          <Link to="/track-mail-item" style={{ textDecoration: 'none' }}>
            <ImageCard
              image={img1}
              title="Track your mail item now!"
              buttonText="Track your mail item now!"
            />
          </Link>

          {/* Link to Calculate Postal Rates Page */}
          <Link to="/calculate-postal-rates" style={{ textDecoration: 'none' }}>
            <ImageCard
              image={img2}
              title="Calculate Postal Rates"
              buttonText="Calculate Postal Rates"
            />
          </Link>

          {/* Link to Estimate Delivery Time Page */}
          <Link to="/estimate-delivery-time" style={{ textDecoration: 'none' }}>
            <ImageCard
              image={img}
              title="Estimate Delivery Time"
              buttonText="Estimate Delivery Time"
            />
          </Link>

          {/* Link to Pay Money Order Page */}
          <Link to="/pay-money-order" style={{ textDecoration: 'none' }}>
            <ImageCard
              image={img3}
              title="Send a Money Order"
              buttonText="Send a Money Order"
            />
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
