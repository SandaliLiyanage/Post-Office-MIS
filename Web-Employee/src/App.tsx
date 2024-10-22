import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/PageLogin";
import MailOrder from "./pages/mail/mailorder/PageCustomerDetails";
import MailDetails from "./pages/mail/mailorder/PageMailDetails";
import Layout from "./navigation/layout";
import EmpRegistration from "./pages/employees/PageEmpRegistrations";
import Emp from "./pages/employees/PageEmpRecords";
import Bundle from "./pages/mail/bundles/PageBundles";
import Mails from "./pages/mail/mails/PageViewMail";
import Employeeupdate from "./pages/employees/PageEmpUpdate";
import RevenueReports from  "./pages/reports/PageRevenueReports";
import ForgotPassword from "./pages/auth/PageForgotPassword";
import ValidateOTP from "./pages/auth/PageValidateOTP";
import SetPassword from "./pages/auth/PageSetPassword";
import MailDelivery from "./pages/mail/mails/PageMailAssignment";
import EndTransaction from "./pages/mail/mailorder/PageMailDetails";
import ReturnMail from "./pages/mail/mails/PageReturnMail";
import Addaddress from "./pages/mail/mailorder/PageAddAddress";
import { ProtectedRoute } from "./pages/auth/protectedroutes";
import { useUser } from "./pages/auth/usercontext";
import Unauthorized from "./pages/auth/PageUnauthorized";
import Retaddress from "./pages/mail/mails/PageReturnAddress";
import PageReceipt from "./pages/mail/mailorder/PageReceipt";
import PageDashboard from "./pages/PageDashboard";
import PageViewLeaves from "./pages/employees/PageViewLeaves";
import LeaveRequest from "./pages/employees/PageLeaveRequests";
function App() {
  
  const {user} = useUser()

  // const  role = user?.role
  const role = user?.role
  return (
    <Router>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/validateOTP" element={< ValidateOTP/>} />
        <Route path="/setPassword" element={< SetPassword/>} />
      {role &&
        <Route path= "/dashboard" element={<Layout/>}>
          <Route path="" element={<PageDashboard/>}/>
          <Route path="register" element={<ProtectedRoute allowedRoles={['POSTMASTER']} userRole={role}>
          <EmpRegistration /></ProtectedRoute>}/>
          <Route path="mailorder" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}>
          <MailOrder /></ProtectedRoute>}/>
          <Route path="maildetails" element={<ProtectedRoute allowedRoles={['POSTMASTER', 'RECEPTIONIST', 'SUPERVISOR']} userRole={role}>
          <MailDetails /></ProtectedRoute>}/>
          <Route path="employeerecords" element={<ProtectedRoute allowedRoles={['POSTMASTER']} userRole={role}>
            <Emp /></ProtectedRoute>}/>
          <Route path="mailbundles" element={<ProtectedRoute allowedRoles={['POSTMAN','SUPERVISOR']} userRole={role}>
          <Bundle /></ProtectedRoute>}/>
          <Route path="leaverequests" element={<ProtectedRoute allowedRoles={['RECEPTIONIST','SUPERVISOR']} userRole={role}>
          <LeaveRequest /></ProtectedRoute>}/>
          <Route path="revenuereports"element={<ProtectedRoute allowedRoles={['POSTMASTER','SUPERVISOR']} userRole={role}>
          <RevenueReports /></ProtectedRoute>}/>
          <Route path="employeeregistrations" element={<ProtectedRoute allowedRoles={['POSTMASTER']} userRole={role}>
          <EmpRegistration /></ProtectedRoute>}/>
          <Route path="mailassignments" element={<ProtectedRoute allowedRoles={['POSTMASTER','SUPERVISOR']} userRole={role}>
          < MailDelivery/></ProtectedRoute>}/>
          <Route path="viewmail" element={<ProtectedRoute allowedRoles={['POSTMASTER','SUPERVISOR', 'RECEPTIONIST']} userRole={role}>
          <Mails/></ProtectedRoute>}/>
          <Route path="view"element={<ProtectedRoute allowedRoles={['POSTMASTER']} userRole={role}>
          < Employeeupdate/></ProtectedRoute>}/>
          <Route path ="postmanAssignments" element={<ProtectedRoute allowedRoles={['POSTMASTER','SUPERVISOR']} userRole={role}>
          <MailDelivery/></ProtectedRoute>}/>
          <Route path ="endtransaction" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}>
          < EndTransaction/></ProtectedRoute>}/>
          <Route path="failedtoDeliver" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}>
          <ReturnMail/></ProtectedRoute>}/>
          <Route path = "retaddress" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}>
          < Retaddress/></ProtectedRoute>}/>
          <Route path = "addaddress" element={<ProtectedRoute allowedRoles={['POSTMASTER','SUPERVISOR', 'RECEPTIONIST']} userRole={role}>
          <Addaddress/></ProtectedRoute>}/>
          <Route path = "receipt" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}> <PageReceipt/></ProtectedRoute>}/>
          <Route path = "addAddress" element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} userRole={role}> <Addaddress/></ProtectedRoute>}/>
          <Route path="veiwleaves" element={<ProtectedRoute allowedRoles={['POSTMASTER']} userRole={role}><PageViewLeaves/></ProtectedRoute>}/>
        </Route>}
        <Route path="not-authorized" element={<Unauthorized/>}/>


      </Routes>
    </Router>
  );
}
export default App;
