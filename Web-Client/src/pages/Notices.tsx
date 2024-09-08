import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import NavBar from '../components/ui/NavBar';

const Notices: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h4" align="center">
            Notices
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Notices;
