import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';  // Import loadStripe
import Home from './pages/Home';
import CalculatePostalRates from './pages/Rates';
import EstimateDeliveryTime from './pages/EstimateDeliveryTime';
import PayMoneyOrder from './pages/MoneyOrder';
import TrackMailItem from './pages/Tracking'; 
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Feedback from './pages/Feedback';

// Load your publishable key from Stripe
const stripePromise = loadStripe('pk_test_51QBsL1GhXMGZ3V9gwb1DsAGvR0HgUYokgug0GLlU79ov39KzR2bVPOMvRYpnFAbmFnlsj22PWiN0fFn155Z7DqKq00bsPiBdhw');

const App: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>  {/* Wrap routes with Elements */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track-mail-item" element={<TrackMailItem />} /> 
        <Route path="/calculate-postal-rates" element={<CalculatePostalRates />} />
        <Route path="/estimate-delivery-time" element={<EstimateDeliveryTime />} />
        <Route path="/pay-money-order" element={<PayMoneyOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Elements>
  );
};

export default App;
