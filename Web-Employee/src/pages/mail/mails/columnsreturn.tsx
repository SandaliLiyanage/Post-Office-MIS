import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
export interface IReturnMail {
  mailID: string;
  customerName: string;
  customerTelephone: string;
  customerAddressID: string;
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
      const navigate = useNavigate();

      const returnMail = row.original;
      function changeAddress() {}

      return (
        <div>
          <Button
            className="rounded-sm bg-stone-300 bg-opacity-5 hover:bg-stone-300 hover:bg-opacity-5"
            size={"md"}
            onClick={() => {
              changeAddress();
              navigate(`/dashboard/retaddress?mailID=${returnMail.mailID}`);
            }}
          >
            <Pencil color="black" size={20} />
          </Button>
        </div>
      );
    },
  },
];

export { columns };
