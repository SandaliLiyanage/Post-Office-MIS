import NavButton from "../components/custom/sidebutton";
import { useState, useEffect } from "react";
import { useUser } from "@/pages/authentication/usercontext"
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const clickedColour: string = 'bg-slate-500 bg-blue-300 bg-opacity-90 text-black rounded-sm ';
  const normalColour: string = 'hover:bg-slate-90 text-white hover:bg-opacity-90 rounded-sm p-2';

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
  const EmployeeRecords = <NavButton className={`${activeButton === 'employeeRecords' || activeButton === 'view' ?  clickedColour : normalColour}`}
                          onClick={() =>{
                            handleClick('employeeRecords');
                            navigate("/dashboard/employeeRecords")
                          }}> Employee Accounts</NavButton>

  const RevenueReports = <NavButton className={`${activeButton === 'revenueReports'? clickedColour : normalColour}`}
                        onClick={() => {
                          handleClick('revenueReports')
                          navigate("/dashboard/revenueReports")
                        }}>Reports</NavButton>

  const MailOrder = <NavButton className={`${activeButton === 'mailorder'|| activeButton === 'maildetails' || activeButton === 'receipt'? clickedColour : normalColour}`} 
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
  const FailedToDeliver = <NavButton className={`${activeButton === 'failedtoDeliver'|| activeButton === 'retaddress' ? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('failedtoDeliver')
                          navigate("/dashboard/failedtoDeliver")
                        } }>Return Mail</NavButton>
const AddNewAddress = <NavButton className={`${activeButton === 'addAddress'? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('addaddress')
                          navigate("/dashboard/addAddress")
                        } }>Add New Address</NavButton>
const ViewLeaves = <NavButton className={`${activeButton === 'veiwleaves'? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('veiwleaves')
                          navigate("/dashboard/veiwleaves")
                        } }>Approve Leaves</NavButton>
const LeaveRequests = <NavButton className={`${activeButton === 'leaverequests'? clickedColour : normalColour}`} 
                        onClick={() => {
                          handleClick('leaverequests')
                          navigate("/dashboard/leaverequests")
                        } }>Request Leaves</NavButton>

  return (
    <div className="mt-16 fixed left-0 top-0 h-full shadow-lg">
      <nav className="w-60 h-full bg-slate-800 shadow-xl">

      {user?.role === 'POSTMASTER' && (
          <>
            {ViewMail}
            {EmployeeRecords}
            {EmployeeRegistrations}
            {RevenueReports}
            {PostmanAssignments}
            {ViewLeaves}
          </>
        )}
        {user?.role === 'SUPERVISOR' && (
          <>
            {ViewMail}
            {MailBundles}
            {PostmanAssignments}
            {RevenueReports}
            {LeaveRequests}
          </>
        )}
        {user?.role === 'RECEPTIONIST' && (
          <>
            {ViewMail}
            {MailOrder}
            {FailedToDeliver}
            {AddNewAddress}
            {LeaveRequests}
          </>
        )}
      </nav>
    </div>
  );
};

