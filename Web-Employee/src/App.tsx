import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './auth/login';
import MailOrder from './pages/mail/mailorder/mailorder2';
import Layout from './navigation/layout';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path = "/" element={<Login />}/>
        <Route element={<Layout/>}>
          <Route path = "/mailorder" element= {<MailOrder />}/>
        </ Route>
      </Routes>
    </Router>
  );
}


export default App;