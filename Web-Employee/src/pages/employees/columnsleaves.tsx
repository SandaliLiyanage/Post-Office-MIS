import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CheckCheck, X } from "lucide-react";
import { useUser } from '../auth/usercontext';
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../mail/mails/formatdate"
import { IP } from "../../../config"
export interface Leave {
  employeeID: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  requestedDATE: string;
  RequestStatus: string;


} 

const columns: ColumnDef<Leave>[] = [
    {
        accessorKey: "employeeID",
        header: "Employee ID",
      },
    {
      accessorKey: "employee.employeeName",  
      header: "Employee Name",
    },
    {
      id: "actions3",
      header: "Leave Type",
      cell: ({ row }) => {
        const getLeaveType = (type:string)=>{
          switch (type) {
            case "FULL_DAY":
              return "Full Day"
            case "HALF_DAY":
              return "Registered Mail"
            case "VACATION":
              return "Vacation"
            default:
              return null;
          }
        }
        return getLeaveType(row.original.leaveType)
      }
    },
    {
      accessorKey: "requstedDate",
      header: "Requested Date",
    },
    
   
    {   id: "actions1",
        accessorKey: "startDate",
        header: "Leave Date",
        cell: ({ row }) => {
          const date = new Date(row.original.startDate);
          
          return formatDate(date)// Format the date as needed
        },
    },
    {   id: "actions2",
      header: "Request Status",
      cell: ({ row }) => {
        const status = row.original.RequestStatus
       
        const getStatusBadge = (status: string) => {
          switch (status) {
            case "PENDING":
              return <Badge className="bg-green-500 text-white">Pending</Badge>;
            case "APPROVED":
              return <Badge className="bg-sky-500 text-white">Approved</Badge>;
            case "REJECTED":
              return <Badge className="bg-red-500 text-white">Rejected</Badge>;
            default:
              return null;
          }
        }
        return getStatusBadge(status)

      },
  },
    
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const employeeID = row.original.employeeID; // Assigning employeeID
          const {user} = useUser()
          async function changeStatus(status: string) {
            const res = await axios.post(`http://${IP}/employee/updateStatus`, 
              {status: status, employeeID: employeeID},
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`, 
                },
              })
          return res
        }

          return (
            <div>
              {row.original.RequestStatus === "PENDING" && <div> 
              <Button className="btn bg-white hover:bg-slate-300" size="icon" onClick={()=>{changeStatus("APPROVED");  location.reload(); }}>
                <CheckCheck color="black" size={16} />
              </Button>
              <Button className="btn bg-white hover:bg-slate-300" size="icon" onClick={()=>{changeStatus("REJECTED"); location.reload()}}>
                <X color="black" size={16} />
              </Button>
            </div>}
            </div>
          );
        },
      },
      
  ]

export { columns }