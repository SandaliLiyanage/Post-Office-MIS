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
      accessorKey: "customerAddressID",
      header: "Address ID",
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
            <Button className="rounded-sm bg-sky-600" size={"sm"} onClick={()=>{changeAddress();  navigate(`/dashboard/retaddress?mailID=${returnMail.mailID}`);} }>Add Return Address</Button>
          </div>
        )
      }
    },
  
  ]


export { columns}