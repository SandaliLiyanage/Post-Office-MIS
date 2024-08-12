import './App.css'
import Nav from './navigation/nav'
import Sidebar from './navigation/sidebar';
import { BrowserRouter} from 'react-router-dom';
import Mainarea from './mainarea';

function App() {
  return (
      <div>
      <BrowserRouter>
        <Nav/>
        <Sidebar/>
        <Mainarea/>
      </BrowserRouter>
      </div>
  );
}

export default App;