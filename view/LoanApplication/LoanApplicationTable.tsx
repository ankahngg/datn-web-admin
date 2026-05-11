import {
  DataTableCard,
  DataTableContent,
  DataTablePagination,
  defaultHeader,
  sortableHeader,
} from "@/components/data-table";
import ActionButton from "@/components/MyComponent/ActionButton";
import header from "@/components/MyComponent/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  applicationStatusLabelMap,
  applicationStatusVariantMap,
  LOAN_APPLICATION_ADMIN_ACTION,
  LoanApplication,
  LoanApplicationAdminAction,
  LoanApplicationAdminActionLabelMap,
} from "@/model/LoanApplication";
import { User, UserFilter } from "@/model/User";
import { formatDate, formatEther, formatUsdc } from "@/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";



export type LoanApplicationTableProps = {
  title: string;
  emptyText: string;
  data: LoanApplication[];
  onAction: (
    action: LoanApplicationAdminAction,
    application: LoanApplication,
  ) => void;
};

function LoanApplicationTable(props: LoanApplicationTableProps) {
  const { title, emptyText, data, onAction } = props;

  const columns: ColumnDef<LoanApplication>[] = [
    {
      accessorKey: "applicationId",
      header: defaultHeader("ID"),
    },
    {
      accessorKey: "borrower",
      header: defaultHeader("Địa chỉ Người vay"),
    },
    {
      accessorKey: "collateralType",
      header: defaultHeader("Loại thế chấp"),
    },
    {
      accessorKey: "collateralAmount",
      header: defaultHeader("Số lượng thế chấp"),
      cell: ({ row }) => {
        if (row.original.collateralType === "ETHER") {
          return formatEther(row.original.collateralAmount);
        } else return row.original.collateralAmount.toString();
      },
    },
    {
      accessorKey: "status",
      header: defaultHeader("Trạng thái"),
      cell: ({ row }) => {
        return (
          <Badge variant={applicationStatusVariantMap[row.original.status]}>
            {applicationStatusLabelMap[row.original.status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "timeCreated",
      header: defaultHeader("Ngày tạo"),
      cell: ({ row }) => {
        return formatDate(row.original.timeCreated);
      },
    },
    {
      header: defaultHeader("Hành động"),
      id: "actions",
      cell: ({ row }) => {
        const application = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ActionButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-sidebar border border-border text-foreground"
            >
              <DropdownMenuLabel className="text-foreground">
                Hành động
              </DropdownMenuLabel>
              {LOAN_APPLICATION_ADMIN_ACTION.map((action) => (
                <DropdownMenuItem
                  key={action}
                  onSelect={() => onAction(action, application)}
                  className="cursor-pointer"
                >
                  {LoanApplicationAdminActionLabelMap[action]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <DataTableCard title={title ?? "Danh sách đơn vay"}>
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={emptyText ?? "Chưa có đơn vay nào"}
      />
      <DataTablePagination table={table} />
    </DataTableCard>
  );
}

export default LoanApplicationTable;
