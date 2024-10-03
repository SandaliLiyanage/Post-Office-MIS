import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Printer } from 'lucide-react';
import { Barcode } from 'lucide-react';

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
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
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
        const contentRef = useRef<HTMLDivElement>(null);
        const reactToPrintFn = useReactToPrint({ contentRef });
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
                  <DialogTitle>Barcode for the Bundle</DialogTitle>
                <DialogDescription>
                  The barcode to be pasted on the bundle will be generated.
                </DialogDescription>
                  </DialogHeader>
                  <div ref={contentRef}>
                  <svg id={`barcode-${bundle.bundleID}`}></svg>
                  </div>
                  <DialogFooter>
                    <Button type="submit"className="btn bg-white "  size="icon"  onClick={()=> generateBarcode(bundle.bundleID)}><Barcode color="black" size={18}></Barcode></Button>
                    <Button className="btn bg-white "  size="icon" onClick={()=>reactToPrintFn()}><Printer color="black" size={18} /></Button>
                  </DialogFooter>
                </DialogContent>
          </Dialog>


          </div>
        )
      },
    },  
  ]
export { columnstoTransfer }