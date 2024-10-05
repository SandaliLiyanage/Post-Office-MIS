"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
    return (
      <div>
      <div className="flex items-center py-4 gap-2">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("mailID")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("mailID")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <Input
        placeholder="Sort by mail ID"
        value={(table.getColumn("mailType" )?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("mailType")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                         {typeof cell.getValue() === 'string'?(cell.getValue() as string).toLowerCase(): flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                      <TableCell>
                </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        </div>
      )
    }
