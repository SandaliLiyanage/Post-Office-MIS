import { ColumnDef } from "@tanstack/react-table"
import {Button} from  "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export interface IReturnMail{
    mailID: string;
    customerName: string;
    customerTelephone: string;
    customerAddressID: string
  }
const columns: ColumnDef<IReturnMail>[] = [
    {
      accessorKey: "mailID",
      header: "Mail ID",
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
  
    {
      accessorKey: "customerTelephone",
      header: "Telephone Number",
    },
    { 
      
      header: "Change Address",
      id: "actions",
      cell: ({ row }) => {
        const navigate = useNavigate()

        const returnMail = row.original
        function changeAddress(){

        }
        
        return(
          <div>
            <Button className="rounded-sm bg-sky-600" size={"sm"} onClick={()=>{changeAddress();  navigate(`/dashboard/retaddress?mailID=${returnMail.mailID}`);} }>Change Address</Button>
          </div>
        )
      }
    },
    { 
      
      header: "Return to the customer",
      id: "actions",
      cell: ({ row }) => {
        const navigate = useNavigate()

        const returnMail = row.original
        function changeAddress(){

        }
        
        return(
          <div>
            <Button className="rounded-sm bg-green-500" size={"sm"} onClick={()=>{changeAddress();  navigate(`/dashboard/retaddress?mailID=${returnMail.mailID}`);} }>Return </Button>
          </div>
        )
      }
    },
  
  ]


export { columns}