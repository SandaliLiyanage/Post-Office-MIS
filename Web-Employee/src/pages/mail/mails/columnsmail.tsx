import { ColumnDef } from "@tanstack/react-table"
import {Badge} from  "../../../components/ui/badge"
export interface IMail{
    category: string;
    barcodeID: string;
    mailstatus: string;
    weight: number;
    bundleID: number;
    price: number;	
  }
const columns: ColumnDef<IMail>[] = [
    {
      accessorKey: "mailType",
      header: "Category",
      },
    {
      accessorKey: "bundleID",
      header: "BundleID",
    },
    
    
    {
      accessorKey: "weight",
      header: "Weight",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "currentPostOffice",
      header: "Current Post Office",
    },
    {
      accessorKey: "recepientAddressID",
      header: "Address ID",
    },
    { 
      
      header: "Delivery Status",
      id: "actions",
      cell: ({ row }) => {
        const mailStatus = row.original.mailstatus; // Access mail status from the row data
    
        // Define the badge style or label based on the mail status
        const getStatusBadge = (status: string) => {
          switch (status) {
            case "DELIVERED":
              return <Badge className="bg-green-500 text-white">Delivered</Badge>;
            case "IN_TRANSIT":
              return <Badge className="bg-sky-600 text-white">In Transit</Badge>;
            case "RETURNED":
              return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
            case "Failed":
              return <Badge className="bg-red-500 text-white">Failed</Badge>;
            default:
              console.log(status)
              return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
          }
          
        }
        
        return getStatusBadge(mailStatus); 
      }
    },
  ]


export { columns}