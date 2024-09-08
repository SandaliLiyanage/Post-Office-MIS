import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalculatePostalRates from './pages/Rates';
import EstimateDeliveryTime from './pages/EstimateDeliveryTime';
import PayMoneyOrder from './pages/MoneyOrder';
import TrackMailItem from './pages/Tracking'; // Import this if you have it
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Notices from './pages/Notices';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/track-mail-item" element={<TrackMailItem />} /> {/* Add this */}
      <Route path="/calculate-postal-rates" element={<CalculatePostalRates />} />
      <Route path="/estimate-delivery-time" element={<EstimateDeliveryTime />} />
      <Route path="/pay-money-order" element={<PayMoneyOrder />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/notices" element={<Notices />} />
    </Routes>
  );
};

export default App;
