import { ColumnDef } from "@tanstack/react-table"
import {Badge} from  "../../../components/ui/badge"
import { formatDate } from "./formatdate"
export interface IMail{
    mailType: string;
    barcodeID: string;
    mailstatus: string;
    weight: number;
    bundleID: number;
    price: number;	
    transaction: {
      date: string;
    }
  }
const columns: ColumnDef<IMail>[] = [
    {
    accessorKey: "mailID",
    header: "Mail ID",
    },    
    {
      id: "actions",
      header: "Category",
      cell: ({ row }) => {
        const getTypeBadge = (type: string) => {
          switch (type) {
            case "NORMAL_MAIL":
              return "Normal Mail"
            case "REGISTERED_MAIL":
              return "Registered Mail"
            case "COURIER":
              return "Courier"
            default:
              return null;
          }
        };
    
        return getTypeBadge(row.original.mailType); // Return the badge here
      },
    },  
    {
      accessorKey: "transaction.date",
      header: "Date",
      cell: ({ row }) => {

        const date = new Date(row.original.transaction.date);
        return formatDate(date);
      }
      
    },

    {
      accessorKey: "price",
      header: "Price",
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
              return <Badge className="bg-yellow-500 text-white">Returned</Badge>;
            case "Failed":
              return <Badge className="bg-red-500 text-white">Failed</Badge>;
            default:
              console.log(status)
              return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
          }
          
        }
        const sortByStatus = (status: string) => {
          
        }
        return getStatusBadge(mailStatus); 
      }
    },
  ]


export { columns}