import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProfileForm from './pages/mail/mailorder/mailorder'; 
import MailOrder from './pages/mail/mailorder/mailorder';
import Layout from './navigation/layout';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path = "/" element={<ProfileForm />}/>
        <Route element={<Layout/>}>
          <Route path = "/mailorder" element= {<MailOrder />}/>
        </ Route>
      </Routes>
    </Router>
  );
}


export default App;