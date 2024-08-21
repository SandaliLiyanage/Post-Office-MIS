import { ColumnDef } from "@tanstack/react-table"

export interface Employee {
    employeeId: number;
    employeeName: string;
    email: string;
    telephone: string;
    role: string;
  }

const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "employeeID",
        header: "Employee ID",
      },
    {
      accessorKey: "employeeName",
      header: "Employee Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "telephone",
      header: "Telephone",
    },
    {
        accessorKey: "role",
        header: "Role",
      },
  ]

export { columns }