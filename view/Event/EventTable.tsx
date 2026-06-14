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
import {DataTableCard, DataTableToolbar, DataTableContent, DataTablePagination, defaultHeader } from "@/components/data-table";
import { EVENT_ADMIN_ACTIONS, EventAdminAction, EventResponse, EventType } from "@/model/Event";
import { BlockchainEventBase, EventProcessingStatusLabelMap, EventProcessingStatusVariantMap } from "@/model/Events/BlockchainEventBase";
import ActionButton from "@/components/MyComponent/ActionButton";


type EventTableProps = {
    title : string;
  data: EventType[];
  isLoading?: boolean;
  onTableAction: (action: EventAdminAction, loan: EventType) => void;
};

export function EventTable({ data, isLoading = false, onTableAction, title }: EventTableProps) {
 
  const columns: ColumnDef<EventType>[] = [
      {
        accessorKey: "blockNumber",
        header: defaultHeader("Số Block"),
      },
      {
        accessorKey: "logIndex",
        header: defaultHeader("Chỉ số Log"),
        
      },
      {
        accessorKey: "txHash",
        header: defaultHeader("Hash Giao dịch"),
        cell: ({ row }) => shortAddress(row.original.txHash),
      },
      {
        accessorKey: "createdAt",
        header: defaultHeader("Thời gian"),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "eventStatus",
        header: defaultHeader("Trạng thái"),
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
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
    
  return (
    <DataTableCard title={title}>
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={isLoading ? "Đang tải dữ liệu..." : "Không có khoản cho vay phù hợp."}
      />

      <DataTablePagination table={table} />
    </DataTableCard>
  );
}