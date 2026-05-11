import {
  DataTableCard,
  DataTableContent,
  DataTablePagination,
  defaultHeader,
  sortableHeader,
} from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LOAN_ADMIN_ACTION, LoanAdminAction } from "@/model/Loan";
import { applicationStatusLabelMap, applicationStatusVariantMap } from "@/model/LoanApplication";
import { LOAN_TRANSFER_ADMIN_ACTIONS, LoanTransferAdminAction, UserLoanTransfer } from "@/model/LoanTransfer";
import { User, UserFilter } from "@/model/User";
import { formatDate, formatEther, formatUsdc, shortAddress } from "@/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


export type LoanTransferTableProps = {
  title: string;
  emptyText: string;
  data: UserLoanTransfer[];
  onTableAction: (action: LoanTransferAdminAction, transfer: UserLoanTransfer) => void;
};

function LoanTransferTable(props: LoanTransferTableProps) {
  const { title, emptyText, data, 
      onTableAction
   } = props;

  const columns: ColumnDef<UserLoanTransfer>[] = [
    {
      accessorKey: "transferId",
      header: defaultHeader("ID"),
    },
    {
      accessorKey: "loanId",
      header: defaultHeader("ID khoản vay"),
    },
    {
      accessorKey: "seller",
      header: defaultHeader("Người bán"),
      cell: ({ row }) => {
        return shortAddress(row.original.seller);
      },
    },
    {
      accessorKey: "buyer",
      header: defaultHeader("Người mua"),
      cell: ({ row }) => {
        return shortAddress(row.original.buyer);
      },
    },
    {
      accessorKey: "price",
      header: defaultHeader("Giá chuyển nhượng"),
      cell: ({ row }) => {
        return formatUsdc(row.original.price);
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
        id: "actions",
        header: () => <span className="text-foreground">Hành động</span>,
        cell: ({ row }) => {
          const loan = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Mở menu thao tác</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-sidebar border border-border text-foreground">
                <DropdownMenuLabel className="text-foreground">Hành động</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    Object.entries(LOAN_TRANSFER_ADMIN_ACTIONS).map(([actionKey, actionLabel]) => (
                        <DropdownMenuItem
                            key={actionKey}
                            onSelect={() => onTableAction(actionKey as LoanTransferAdminAction, loan)}
                        >
                            {actionLabel}
                        </DropdownMenuItem>
                    ))
                }
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
    <DataTableCard title={title ?? "Danh sách"}>
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={emptyText ?? "Chưa có dữ liệu nào"}
      />
      <DataTablePagination table={table} />
    </DataTableCard>
  );
}

export default LoanTransferTable;
