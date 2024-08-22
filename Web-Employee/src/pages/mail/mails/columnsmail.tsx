import { ColumnDef } from "@tanstack/react-table"

export interface IMail{
    category: string;
    barcodeID: string;
    mailStatus: string;	
  }
const columns: ColumnDef<IMail>[] = [
    {
      accessorKey: "category",
      header: "Category",
      },
    {
      accessorKey: "barcodeID",
      header: "Barcode ID",
    },
    {
      accessorKey: "mailStatus",
      header: "Mail Status",
    }
  ]
export { columns}