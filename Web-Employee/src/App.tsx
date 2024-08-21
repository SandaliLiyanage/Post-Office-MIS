import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import MailOrder from "./pages/mail/mailorder/customerdetails";
import MailDetails from "./pages/mail/mailorder/maildetails";
import Layout from "./navigation/layout";
import EmpRegistration from "./pages/employees/registration";
import LeaveRequest from "./pages/employees/leaverequets";
import EmployeeRecords from "./pages/employees/employeerecords";
import Emp from "./pages/employees/emp";
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path= "/dashboard" element={<Layout/>}>
          <Route path="register" element={<EmpRegistration />} />
          <Route path="mailorder" element={<MailOrder/>} />
          <Route path="maildetails" element={<MailDetails/>} />
          <Route path="leaverequest" element={<LeaveRequest/>}/>
          <Route path="employeerecords" element={<Emp/>}/>
          <Route path="viewMail" element={<></>}></Route>
          <Route path="viewleaverequests" element={<></>}></Route>
          <Route path="viewmailassignments" element={<></>}></Route>
          <Route path="revenuereports" element={<></>}></Route>
          <Route path="employeeregistrations" element={<EmpRegistration/>}></Route>
          <Route path="postmanassignments" element={<></>}></Route>
          <Route path="mailassignments" element={<></>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
