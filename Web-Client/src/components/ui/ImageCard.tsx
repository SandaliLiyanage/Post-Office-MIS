import React from 'react';
import { Card, CardMedia, CardContent, Button, Box } from '@mui/material';

interface ImageCardProps {
  image: string;
  title: string;
  buttonText: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, title, buttonText }) => {
    
  return (
    <Card sx={{ borderRadius: '16px', overflow: 'hidden', margin: '20px', width:'450px'}} >
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#884343',
              borderRadius: '50px',
              textTransform: 'none',
              padding: '10px 20px',
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
