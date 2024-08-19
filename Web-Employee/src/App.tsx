import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import MailOrder from "./pages/mail/mailorder/mailorder";
import Layout from "./navigation/layout";
import EmpRegistration from "./pages/registration/registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/mailorder" element={<MailOrder />} />
          <Route path="/register" element={<EmpRegistration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
