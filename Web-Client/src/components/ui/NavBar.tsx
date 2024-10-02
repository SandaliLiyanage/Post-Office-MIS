import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ backgroundColor: '#884343' }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <img
          src={logo}
          alt="Sri Lanka Post Logo"
          style={{ marginRight: '20px', width: '150px', height: 'auto' ,filter: 'invert(50%) brightness(300%)'}}
          
        />
        
        <Box  gap={10} ml={100} color={'white'}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About Us</Button>
          <Button color="inherit" component={Link} to="/notices">Notices</Button>
          <Button color="inherit" component={Link} to="/contact-us">Contact Us</Button>
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
