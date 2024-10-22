import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "../../auth/usercontext";
import { IP } from "../../../../config";
export interface IBundle {
  destPostCode: string;
  bundleID: number;
  barcodeId: string;
}

const columnsforDelivery: ColumnDef<IBundle>[] = [
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
    header: "Confirm for delivery",
    id: "actions",
    cell: ({ row }) => {
      const bundle = row.original;
      const { user } = useUser();

      const sendForDistribution = async (bundleID: number) => {
        if (user) {
          console.log(bundle, "bundleID");
          const response = await axios.post(
            `http:/${IP}/bundles/updateBundleStatus`,
            { postalCode: user.postalCode, bundleID: bundleID }
          );
          console.log(response);
        }
      };
      return (
        <Button
          className="btn rounded-xl bg-blue-300 text-gray-600"
          size={"sm"}
          onClick={() => sendForDistribution(bundle.bundleID)}
        >
          Send for Distribution
        </Button>
      );
    },
  },
];
export { columnsforDelivery };
