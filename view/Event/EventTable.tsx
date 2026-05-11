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

import { formatDate, formatUsdc, shortAddress } from "@/utils";

import { LOAN_ADMIN_ACTION, LoanAdminAction, UserLoan, UserLoanStatusLabelMap, UserLoanStatusVariantMap } from "@/model/Loan";
import { useDataTableState, sortableHeader, DataTableCard, DataTableToolbar, DataTableContent, DataTablePagination } from "@/components/data-table";
import { EVENT_ADMIN_ACTIONS, EventAdminAction, EventResponse, EventType } from "@/model/Event";
import { BlockchainEventBase, EventProcessingStatusLabelMap, EventProcessingStatusVariantMap } from "@/model/Events/BlockchainEventBase";
import ActionButton from "@/components/MyComponent/ActionButton";


type EventTableProps = {
    title : string;
  data: EventResponse;
  isLoading?: boolean;
  onTableAction: (action: EventAdminAction, loan: EventType) => void;
};

export function EventTable({ data, isLoading = false, onTableAction, title }: EventTableProps) {
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    clearFilters,
  } = useDataTableState();

  const columns = React.useMemo<ColumnDef<EventType, any>[]>(
    () => [
      {
        accessorKey: "blockNumber",
        header: sortableHeader<EventType>("Số Block"),
      },
      {
        accessorKey: "logIndex",
        header: sortableHeader<EventType>("Chỉ số Log"),
        
      },
      {
        accessorKey: "txHash",
        header: sortableHeader<EventType>("Hash Giao dịch"),
        cell: ({ row }) => shortAddress(row.original.txHash),
        
      },
      {
        accessorKey: "createdAt",
        header: sortableHeader<EventType>("Thời gian"),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "eventStatus",
        header: sortableHeader<EventType>("Trạng thái"),
        cell: ({ row }) => {
            return (
                <Badge variant={EventProcessingStatusVariantMap[row.original.eventStatus]}>
                    {EventProcessingStatusLabelMap[row.original.eventStatus]}
                </Badge>
            );
        }
      },
      {
      header: "Hành động",
      cell: ({ row }) => {
        const data = row.original;
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
                {Object.entries(EVENT_ADMIN_ACTIONS).map(([actionKey, actionLabel]) => (
                    <DropdownMenuItem
                        key={actionKey}
                        onSelect={() => onTableAction(actionKey as EventAdminAction, data)}
                        className="cursor-pointer"
                    >
                        {actionLabel}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    ],
    [onTableAction],
  );

  const table = useReactTable({
    data: data.data.content,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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
    <DataTableCard title={title}>
      <DataTableToolbar
        searchPlaceholder="Tìm kiếm theo hash giao dịch, số block, chỉ số log..."
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        statusFilter={{
          value: (table.getColumn("loanStatus")?.getFilterValue() as string) ?? "all",
          onChange: (value) =>
            table.getColumn("loanStatus")?.setFilterValue(value === "all" ? undefined : value),
          options: [
            { label: "Tất cả", value: "all" },
            { label: "Đang chờ xử lý", value: "PROCESSING" },
            { label: "Thành công", value: "DONE" },
            { label: "Thất bại", value: "FAILED" },
          ],
        }}
        onClearFilters={() => {
          clearFilters();
          table.setPageIndex(0);
        }}
      />

      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={isLoading ? "Đang tải dữ liệu..." : "Không có khoản cho vay phù hợp."}
      />

      <DataTablePagination table={table} />
    </DataTableCard>
  );
}