import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Printer } from 'lucide-react';


export interface IBundle {
    destPostCode: string;
    bundleId: string;
    barcodeId: string;	
  }
const columns: ColumnDef<IBundle>[] = [
    {
      accessorKey: "destPostalCode",
      header: "Destination Post Code",
      },
    {
      accessorKey: "bundleID",
      header: "Bundle ID",
    },
    {
      accessorKey: "route",
      header: "Bundle Route",
    },
    { 
      accessorKey: "PrintBarcode",
      header: "Print Barcode",
      id: "actions",
      cell: ({ row }) => {
        const bundle = row.original
   
        return (
          <Button className="btn bg-white "  size="icon" ><Printer color="black" size={18} /></Button>
        )
      },
    },
    // ...
  
  ]
export { columns }