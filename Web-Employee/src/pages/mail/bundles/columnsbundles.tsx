import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Printer } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export interface IBundle {
    destPostCode: string;
    bundleID: number;
    barcodeId: string;	
  }
const columnstoTransfer: ColumnDef<IBundle>[] = [
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
        const generateBarcode =(bundleID: number)=>{
          console.log("generating ")
          const barcodeElement = document.getElementById(`barcode-${bundleID}`);
          const ID =  bundle.bundleID.toString();
          console.log(barcodeElement)
          JsBarcode(barcodeElement, ID);
          console.log("generating barcode")}
        return (
          <div>
                <Dialog>
                      <DialogTrigger asChild>
            <Button className="btn bg-white "  size="icon"  ><Printer color="black" size={18} /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                  </DialogHeader>
                  <div>
                  <svg id={`barcode-${bundle.bundleID}`}></svg>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={()=> generateBarcode(bundle.bundleID)}>Generate and Print Barcode</Button>
                  </DialogFooter>
                </DialogContent>
          </Dialog>


          </div>
        )
      },
    },  
  ]
export { columnstoTransfer }