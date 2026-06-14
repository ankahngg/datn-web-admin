"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, History, MoreHorizontal } from "lucide-react";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { formatUsdc, shortAddress } from "@/utils";

import { LOAN_ADMIN_ACTION, LoanAdminAction, UserLoan, UserLoanStatusLabelMap, UserLoanStatusVariantMap } from "@/model/Loan";
import { useDataTableState, sortableHeader, DataTableCard, DataTableToolbar, DataTableContent, DataTablePagination, defaultHeader } from "@/components/data-table";


type LoanTableProps = {
  loans: UserLoan[];
  isLoading?: boolean;
  onTableAction: (action: LoanAdminAction, loan: UserLoan) => void;
};

export function LoanTable({ loans, isLoading = false, onTableAction }: LoanTableProps) {
  

  const columns = React.useMemo<ColumnDef<UserLoan>[]>(
    () => [
      {
        accessorKey: "borrower",
        header: defaultHeader("Người vay"),
        cell: ({ row }) => (
          <span className="font-mono text-foreground">
            {shortAddress(row.original.borrower)}
          </span>
        ),
      },
      {
        accessorKey: "loanAmount",
        header: defaultHeader("Số tiền vay"),
        cell: ({ row }) => <span className="text-foreground">{formatUsdc(row.original.loanAmount)}</span>,
      },
      {
        accessorKey: "totalAmountHaveToPay",
        header: defaultHeader("Tổng phải trả"),
        cell: ({ row }) => <span className="text-foreground">{formatUsdc(row.original.totalAmountHaveToPay)}</span>,
      },
      {
        accessorKey: "amountPaid",
        header: defaultHeader("Đã trả"),
        cell: ({ row }) => <span className="text-foreground">{formatUsdc(row.original.amountPaid)}</span>,
      },
      {
        accessorKey: "loanStatus",
        header: defaultHeader("Trạng thái"),
        cell: ({ row }) => {
          const status = row.original.loanStatus;
          return <Badge variant={UserLoanStatusVariantMap[status]}>{UserLoanStatusLabelMap[status]}</Badge>;
        },
      },
      {
        accessorKey: "timeCreated",
        header: defaultHeader("Thời gian tạo"),
        cell: ({ row }) => (
          <span className="text-foreground">
            {new Date(row.original.timeCreated).toLocaleDateString("vi-VN")}
          </span>
        ),
      },
      {
        accessorKey: "duration",
        header: defaultHeader("Thời hạn"),
        cell: ({ row }) => <span className="text-foreground">{row.original.duration.toString()}</span>,
      },
      {
        id: "actions",
        header: () => <span className="">Hành động</span>,
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
                    Object.entries(LOAN_ADMIN_ACTION).map(([actionKey, actionLabel]) => (
                        <DropdownMenuItem
                            key={actionKey}
                            onSelect={() => onTableAction(actionKey as LoanAdminAction, loan)}
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
    ],
    [onTableAction],
  );

  const table = useReactTable({
    data: loans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <DataTableCard title="Danh sách khoản cho vay">
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={isLoading ? "Đang tải dữ liệu..." : "Không có khoản cho vay phù hợp."}
      />

      <DataTablePagination table={table} />
    </DataTableCard>
  );
}