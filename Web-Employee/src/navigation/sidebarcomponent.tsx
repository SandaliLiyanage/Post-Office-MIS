import NavButton from "../components/custom/sidebutton";
import { useState } from "react";
import { useUser } from "@/pages/authentication/usercontext"

export default function SideBarComponent() {
  const clickedColour: string = 'bg-slate-400 text-white';
  const normalColour: string = 'hover:bg-slate-300 hover:text-black';
  const [activeButton, setActiveButton] = useState('Employee Records');
  const {user} = useUser();

  const handleClick = (button: string) => {
    setActiveButton(button);
  };
  const EmployeeRecords = <NavButton className={`${activeButton === 'Employee Records' ? clickedColour : normalColour}`}
                          onClick={() => handleClick('Employee Records') }>Employee Records</NavButton>

  const MailAssignments = <NavButton className={`${activeButton === 'Mail Assignments'? clickedColour : normalColour}`}
                          onClick={() => handleClick('Mail Assignments')}>Mail Assignments</NavButton>

  const RevenueReports = <NavButton className={`${activeButton === 'Revenue Reports'? clickedColour : normalColour}`}
                        onClick={() => handleClick('Revenue Reports')}>Revenue Reports</NavButton>

  const MailOrder = <NavButton className={`${activeButton === 'Mail Order' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('Mail Order') }>Mail Order</NavButton>

  const ViewMail = <NavButton className={`${activeButton === 'View Mail' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('View Mail') }>View Mail</NavButton>

  const LeaveRequest = <NavButton className={`${activeButton === 'Leave Requests' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('Leave Requests') }>Leave Requests</NavButton>

  const ViewLeaveRequests = <NavButton className={`${activeButton === 'Mail Assignments' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('Mail Assignments') }>Mail Assignments</NavButton>

  const PostmanAssignments = <NavButton className={`${activeButton === 'Assigned Postmen' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('Assigned Postmen') }>Assigned Postmen</NavButton>

  const EmployeeRegistrations = <NavButton className={`${activeButton === 'Employee Registrations' ? clickedColour : normalColour}`} 
                        onClick={() => handleClick('Employee Registrations') }>Employee Registrations</NavButton>
  

  return (
    <div className="fixed left-0 h-full">
      <nav className="w-60 h-full bg-slate-300 bg-opacity-25">
      {user?.role === 'POSTMASTER' && (
          <>
            {EmployeeRecords}
            {PostmanAssignments}
            {RevenueReports}
            {ViewLeaveRequests}
            {EmployeeRegistrations}
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