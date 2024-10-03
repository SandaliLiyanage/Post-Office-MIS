import NavButton from "../components/custom/sidebutton";
import { useState, useEffect } from "react";
import { useUser } from "@/pages/authentication/usercontext"
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const clickedColour: string = 'bg-blue-200 bg-opacity-90 text-black';
  const normalColour: string = 'hover:bg-blue-200 text-white hover:bg-opacity-90';

  // const clickedColour: string = 'bg-slate-800   rounded text-white';
  // const normalColour: string = 'hover:bg-slate-500 text-white hover:bg-opacity-90 hover:text-black';
  const [activeButton, setActiveButton] = useState('');
  const {user} = useUser();
  const navigate = useNavigate();
  const handleClick = (button: string) => {
    setActiveButton(button);
  };

  useEffect(()=>{
    const path = window.location.pathname
    console.log(path)
    const lastPart = path.substring(path.lastIndexOf('/') + 1);
    setActiveButton(lastPart)
    
  })
  const EmployeeRecords = <NavButton className={`${activeButton === 'employeeRecords' ? clickedColour : normalColour}`}
                          onClick={() =>{
                            handleClick('employeeRecords');
                            navigate("/dashboard/employeeRecords")
                          }}> Employee Accounts</NavButton>

  const MailAssignments = <NavButton className={`${activeButton === 'mailAssignments'? clickedColour : normalColour}`}
                          onClick={() => {
                            handleClick('mailAssignments');
                            navigate("/dashboard/mailAssignments");
                            }}>Mail Assignments</NavButton>

  const RevenueReports = <NavButton className={`${activeButton === 'revenueReports'? clickedColour : normalColour}`}
                        onClick={() => {
                          handleClick('revenueReports')
                          navigate("/dashboard/revenueReports")
                        }}>Revenue Reports</NavButton>

  const MailOrder = <NavButton className={`${activeButton === 'mailorder' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('mailorder');
                          navigate("/dashboard/mailorder");
                        }
                         }>Mail Order</NavButton>

  const ViewMail = <NavButton className={`${activeButton === 'viewMail' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('View Mail')
                          navigate("/dashboard/viewMail")
                        } }>View Mail</NavButton>

  const LeaveRequest = <NavButton className={`${activeButton === 'leaveRequest' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('leaveRequest')
                          navigate("/dashboard/leaveRequest")
                        } }>Request Leaves</NavButton>

  const ViewLeaveRequests = <NavButton className={`${activeButton === 'viewLeaveRequests' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('ViewLeaveRequests')
                          navigate("/dashboard/viewLeaveRequests")
                        } }>View Leave Requests</NavButton>
const MailBundles = <NavButton className={`${activeButton === 'mailBundles' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('mailBundles')
                          navigate("/dashboard/mailBundles")
                        } }>Mail Bundles</NavButton>

  const PostmanAssignments = <NavButton className={`${activeButton === 'postmanAssignments' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('postmanAssignments')
                          navigate("/dashboard/postmanAssignments")
                        }}>Assigned Postmen</NavButton>

  const EmployeeRegistrations = <NavButton className={`${activeButton === 'employeeRegistrations' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('employeeRegistrations')
                          navigate("/dashboard/employeeRegistrations")
                        } }>Employee Registrations</NavButton>
  const FailedToDeliver = <NavButton className={`${activeButton === 'failedtoDeliver' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('failedtoDeliver')
                          navigate("/dashboard/failedtoDeliver")
                        } }>Return Mail</NavButton>

  return (
    <div className="mt-16 fixed left-0 top-0 h-full">
      <nav className="w-60 h-full bg-slate-800 ">

      {user?.role === 'POSTMASTER' && (
          <>
            {EmployeeRecords}
            {EmployeeRegistrations}
            {MailOrder}
            {ViewMail}
            {RevenueReports}
            {PostmanAssignments}
            {MailBundles}
            {FailedToDeliver}
          </>
        )}
        {user?.role === 'SUPERVISOR' && (
          <>
            {ViewMail}
            {MailBundles}
            {PostmanAssignments}
            {LeaveRequest}
            {RevenueReports}
          </>
        )}
        {user?.role === 'RECEPTIONIST' && (
          <>
            {MailOrder}
            {ViewMail}
            {LeaveRequest}
            {FailedToDeliver}
          </>
        )}
      </nav>
    </div>
  );
};

