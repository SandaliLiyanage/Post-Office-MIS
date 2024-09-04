import NavButton from "../components/custom/sidebutton";
import { useState } from "react";
import { useUser } from "@/pages/authentication/usercontext"
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const clickedColour: string = 'bg-slate-400 text-white';
  const normalColour: string = 'hover:bg-violet-300 text-black hover:bg-opacity-15';
  const [activeButton, setActiveButton] = useState('');
  const {user} = useUser();
  const navigate = useNavigate();

  const handleClick = (button: string) => {
    setActiveButton(button);
  };
  const EmployeeRecords = <NavButton className={`${activeButton === 'Employee Records' ? clickedColour : normalColour}`}
                          onClick={() =>{
                            handleClick('Employee Records');
                            navigate("/dashboard/employeeRecords")
                          }}> Employee Accounts</NavButton>

  const MailAssignments = <NavButton className={`${activeButton === 'Mail Assignments'? clickedColour : normalColour}`}
                          onClick={() => {
                            handleClick('Mail Assignments');
                            navigate("/dashboard/mailAssignments");
                            }}>Mail Assignments</NavButton>

  const RevenueReports = <NavButton className={`${activeButton === 'Revenue Reports'? clickedColour : normalColour}`}
                        onClick={() => {
                          handleClick('Revenue Reports')
                          navigate("/dashboard/revenueReports")
                        }}>Revenue Reports</NavButton>

  const MailOrder = <NavButton className={`${activeButton === 'Mail Order' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('Mail Order');
                          navigate("/dashboard/mailorder");
                        }
                         }>Mail Order</NavButton>

  const ViewMail = <NavButton className={`${activeButton === 'View Mail' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('View Mail')
                          navigate("/dashboard/viewMail")
                        } }>View Mail</NavButton>

  const LeaveRequest = <NavButton className={`${activeButton === 'Leave Requests' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('Leave Requests')
                          navigate("/dashboard/leaveRequest")
                        } }>Leave Requests</NavButton>

  const ViewLeaveRequests = <NavButton className={`${activeButton === 'Mail Bundles' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('Mail Bundles')
                          navigate("/dashboard/mailBundles")
                        } }>Mail Bundles</NavButton>

  const PostmanAssignments = <NavButton className={`${activeButton === 'Assigned Postmen' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('Assigned Postmen')
                          navigate("/dashboard/postmanAssignments")
                        }}>Assigned Postmen</NavButton>

  const EmployeeRegistrations = <NavButton className={`${activeButton === 'Employee Registrations' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('Employee Registrations')
                          navigate("/dashboard/employeeRegistrations")
                        } }>Employee Registrations</NavButton>
  return (
    <div className="mt-16 fixed left-0 top-0 h-full">
      <nav className="w-60 h-full bg-slate-300 bg-opacity-25">
      {user?.role === 'POSTMASTER' && (
          <>
            {EmployeeRecords}
            {ViewLeaveRequests}
            {EmployeeRegistrations}
            {MailOrder}
            {ViewMail}
            {LeaveRequest}
          </>
        )}
        {user?.role === 'SUPERVISOR' && (
          <>
            {MailAssignments}
            {RevenueReports}
            {ViewMail}
          </>
        )}
        {user?.role === 'RECEPTIONIST' && (
          <>
            {MailOrder}
            {ViewMail}
            {LeaveRequest}
          </>
        )}
      </nav>
    </div>
  );
};

