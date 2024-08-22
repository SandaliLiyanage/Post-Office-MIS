import { ColumnDef } from "@tanstack/react-table"

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
      accessorKey: "barcodeID",
      header: "barcode ID",
    }
  ]
export { columns }