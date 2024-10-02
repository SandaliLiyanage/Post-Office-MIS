import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/PageLogin";
import MailOrder from "./pages/mail/mailorder/PageCustomerDetails";
import MailDetails from "./pages/mail/mailorder/PageMailDetails";
import Layout from "./navigation/layout";
import EmpRegistration from "./pages/employees/PageEmpRegistrations";
import LeaveRequest from "./pages/employees/PageLeaveRequests";
import Emp from "./pages/employees/PageEmpRecords";
import Bundle from "./pages/mail/bundles/PageBundles";
import Mails from "./pages/mail/mails/PageViewMail";
import Employeeupdate from "./pages/employees/PageEmpUpdate";
import RevenueReports from  "./pages/reports/PageRevenueReports";
import ForgotPassword from "./pages/authentication/PageForgotPassword";
import ValidateOTP from "./pages/authentication/PageValidateOTP";
import SetPassword from "./pages/authentication/PageSetPassword";
import MailDelivery from "./pages/mail/mails/PageMailDelivery";
import EndTransaction from "./pages/mail/mailorder/PageMailDetails";
import ReturnMail from "./pages/mail/mails/PageReturnMail";
import RetAddress from "./pages/mail/mails/retaddress"
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/validateOTP" element={< ValidateOTP/>} />
        <Route path="/setPassword" element={< SetPassword/>} />
        <Route path= "/dashboard" element={<Layout/>}>
          <Route path="register" element={<EmpRegistration />} />
          <Route path="mailorder" element={<MailOrder/>} />
          <Route path="maildetails" element={<MailDetails/>} />
          <Route path="leaverequest" element={<LeaveRequest/>}/>
          <Route path="employeerecords" element={<Emp/>}/>
          <Route path="mailbundles" element={<Bundle/>}/>
          <Route path="viewleaverequests" element={<></>}></Route>
          <Route path="viewmailassignments" element={<Mails/>}></Route>
          <Route path="revenuereports" element={<RevenueReports/>}></Route>
          <Route path="employeeregistrations" element={<EmpRegistration/>}></Route>
          <Route path="mailassignments" element={<></>}></Route>
          <Route path="viewmail" element={<Mails/>}></Route>
          <Route path="view" element={<Employeeupdate/>}></Route>
          <Route path ="postmanAssignments" element={<MailDelivery/>}></Route>
          <Route path ="endtransaction" element={<EndTransaction/>}></Route>
          <Route path="failedtoDeliver" element={<ReturnMail/>}></Route>
          <Route path = "retaddress" element={<RetAddress/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
