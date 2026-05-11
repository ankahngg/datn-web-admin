"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { formatUsdc, isNotProcessing, shortAddress } from "@/utils";
import { applicationStatusVariantMap, applicationStatusLabelMap, LoanApplication } from "@/model/LoanApplication";
import { LoanOffer } from "@/model/LoanOffer";
import { useDataTableState, sortableHeader, DataTableCard, DataTableToolbar, DataTableContent, DataTablePagination } from "@/components/data-table";


type LenderLoanRequestTableProps = {
  application : LoanApplication;
  requests: LoanOffer[];
  title?: string;
  emptyText?: string;
  hilightRowId?: string;
};

export function LenderLoanRequestTable({
  application,
  requests,
  title,
  emptyText,
  hilightRowId,
}: LenderLoanRequestTableProps) {
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    clearFilters,
  } = useDataTableState();
  const columns = React.useMemo<ColumnDef<LoanOffer>[]>(
    () => [
      {
        accessorKey: "offerId",
        header: sortableHeader<LoanOffer>("ID"),
      },
      {
        accessorKey: "requester",
        header: sortableHeader<LoanOffer>("Người đề nghị"),
        cell: ({ row }) => (
          <span className="font-mono text-foreground">{shortAddress(row.original.requester)}</span>
        ),
      },
      {
        accessorKey: "loanAmount",
        header: sortableHeader<LoanOffer>("Số tiền vay"),
        cell: ({ row }) => {
          return formatUsdc(row.original.loanAmount);
        }
      },
      {
        accessorKey: "interestRate",
        header: sortableHeader<LoanOffer>("Lãi suất (%)"),
      },
      {
        accessorKey: "duration",
        header: sortableHeader<LoanOffer>("Kỳ hạn"),
      },
      {
        accessorKey: "status",
        header: sortableHeader<LoanOffer>("Trạng thái"),
        cell: ({ row }) => {
          const status = row.original.status;
          return <Badge variant={applicationStatusVariantMap[status]}>{applicationStatusLabelMap[status]}</Badge>;
        },
      },
      {
        accessorKey: "timeCreated",
        header: sortableHeader<LoanOffer>("Ngày tạo"),
      },
      
    ],
    []
  );

  const table = useReactTable({
    data: requests,
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
    <DataTableCard title={title ?? "Danh sách offer của người cho vay"}>
      <DataTableToolbar
        searchPlaceholder="Tìm theo ID, người đề nghị, số tiền vay..."
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        statusFilter={{
          value: (table.getColumn("status")?.getFilterValue() as string) ?? "all",
          onChange: (value) =>
            table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value),
          options: [
            { value: "all", label: "Tất cả trạng thái" },
            { value: "PENDING_CREATED", label: applicationStatusLabelMap.PENDING_CREATED },
            { value: "CREATED", label: applicationStatusLabelMap.CREATED },
            { value: "PENDING_CANCELED", label: applicationStatusLabelMap.PENDING_CANCELED },
            { value: "CANCELED", label: applicationStatusLabelMap.CANCELED },
            { value: "PENDING_ACCEPTED", label: applicationStatusLabelMap.PENDING_ACCEPTED },
            { value: "ACCEPTED", label: applicationStatusLabelMap.ACCEPTED },
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
        emptyMessage={emptyText ?? "Chưa có offer nào"}
        highlightRowId={hilightRowId}
      />

      <DataTablePagination table={table} />
    </DataTableCard>
  );
}