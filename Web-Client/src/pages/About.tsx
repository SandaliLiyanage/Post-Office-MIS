import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import NavBar from '../components/ui/NavBar';

const About: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Typography variant="h3" gutterBottom align="center" sx={{ marginY: '20px' }}>
          About Us
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Services
        </Typography>
        <Typography paragraph>
          At Sri Lanka Post, we provide a variety of postal services tailored to meet your needs. Our key services include:
        </Typography>
        
        <Typography paragraph>
          <strong>Money Orders:</strong> Easily send money to anyone across Sri Lanka through our online system. The maximum amount for a money order is Rs. 50,000.
        </Typography>
        
        <Typography paragraph>
          <strong>Estimate Delivery Time:</strong> By analyzing historical data and current delivery conditions, we provide estimated delivery times for your mail items, ensuring transparency and enhancing customer satisfaction.
        </Typography>
        
        <Typography paragraph>
          <strong>Mail Tracking:</strong> Track your mail in real time using our tracking service to stay updated on your mail’s journey from dispatch to delivery.
        </Typography>
        
        <Typography paragraph>
          <strong>Calculate Postal Rates:</strong> Use our postal rate table below to estimate the cost based on the weight of your mail item.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Postal Rates (SL Post Courier)
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Weight (g)</strong></TableCell>
              <TableCell><strong>Rate (Rs.)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>0 &lt; W ≤ 250</TableCell><TableCell>200.00</TableCell></TableRow>
            <TableRow><TableCell>250 &lt; W ≤ 500</TableCell><TableCell>250.00</TableCell></TableRow>
            <TableRow><TableCell>500 &lt; W ≤ 1000</TableCell><TableCell>350.00</TableCell></TableRow>
            <TableRow><TableCell>1000 &lt; W ≤ 2000</TableCell><TableCell>400.00</TableCell></TableRow>
            <TableRow><TableCell>2000 &lt; W ≤ 3000</TableCell><TableCell>450.00</TableCell></TableRow>
            <TableRow><TableCell>3000 &lt; W ≤ 4000</TableCell><TableCell>500.00</TableCell></TableRow>
            <TableRow><TableCell>4000 &lt; W ≤ 5000</TableCell><TableCell>550.00</TableCell></TableRow>
            <TableRow><TableCell>5000 &lt; W ≤ 6000</TableCell><TableCell>600.00</TableCell></TableRow>
            <TableRow><TableCell>6000 &lt; W ≤ 7000</TableCell><TableCell>650.00</TableCell></TableRow>
            <TableRow><TableCell>7000 &lt; W ≤ 8000</TableCell><TableCell>700.00</TableCell></TableRow>
            <TableRow><TableCell>8000 &lt; W ≤ 9000</TableCell><TableCell>750.00</TableCell></TableRow>
            <TableRow><TableCell>9000 &lt; W ≤ 10000</TableCell><TableCell>800.00</TableCell></TableRow>
            <TableRow><TableCell>10000 &lt; W ≤ 15000</TableCell><TableCell>850.00</TableCell></TableRow>
            <TableRow><TableCell>15000 &lt; W ≤ 20000</TableCell><TableCell>1100.00</TableCell></TableRow>
            <TableRow><TableCell>20000 &lt; W ≤ 25000</TableCell><TableCell>1600.00</TableCell></TableRow>
            <TableRow><TableCell>25000 &lt; W ≤ 30000</TableCell><TableCell>2100.00</TableCell></TableRow>
            <TableRow><TableCell>30000 &lt; W ≤ 35000</TableCell><TableCell>2600.00</TableCell></TableRow>
            <TableRow><TableCell>35000 &lt; W ≤ 40000</TableCell><TableCell>3100.00</TableCell></TableRow>
          </TableBody>
        </Table>

      </Container>
    </div>
  );
};

export default About;
