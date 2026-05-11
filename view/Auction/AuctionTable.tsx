

import { sortableHeader, useDataTableState, DataTableCard, DataTableToolbar, DataTableContent } from "@/components/data-table";
import ActionButton from "@/components/MyComponent/ActionButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Auction,
  AUCTION_ADMIN_ACTIONS,
  AuctionAction,
  AuctionAdminAction,
  AuctionResponse,
  AuctionStatusLabelMap,
  AuctionStatusVariantMap,
} from "@/model/Auction";
import {
  applicationStatusVariantMap,
  applicationStatusLabelMap,
} from "@/model/LoanApplication";
import {
  LoanTransferActionLabelMap,
  UserLoanTransfer,
} from "@/model/LoanTransfer";
import { formatUsdc, formatDate, shortAddress } from "@/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { WalletCards, XCircle } from "lucide-react";



type Props = {
  data: Auction[];
  onAuctionTableAction: (action: AuctionAdminAction, auction: Auction) => void;
};

function AuctionTable(props: Props) {
  const { data, onAuctionTableAction } = props;

  const columns: ColumnDef<Auction>[] = [
    {
      accessorKey: "auctionId",
      header: sortableHeader<Auction>("ID"),
    },
    {
      accessorKey: "loanId",
      header: sortableHeader<Auction>("Khoản vay"),
    },
    {
      accessorKey: "startPrice",
      header: sortableHeader<Auction>("Giá khởi điểm"),
      cell: ({ row }) => {
        return formatUsdc(row.original.startPrice);
      },
    },

    {
      accessorKey: "timeStart",
      header: sortableHeader<Auction>("Thời gian bắt đầu"),
      cell: ({ row }) => {
        return formatDate(row.original.timeStart);
      },
    },
    {
      accessorKey: "timeEnd",
      header: sortableHeader<Auction>("Thời gian kết thúc"),
      cell: ({ row }) => {
        return formatDate(row.original.timeEnd);
      },
    },
    {
      accessorKey: "highestBid",
      header: sortableHeader<Auction>("Giá cao nhất"),
      cell: ({ row }) => {
        return formatUsdc(row.original.highestBid);
      },
    },
    {
      accessorKey: "highestBidder",
      header: sortableHeader<Auction>("Người đặt giá cao nhất"),
      cell: ({ row }) => {
        return shortAddress(row.original.highestBidder);
      },
    },

    {
      accessorKey: "status",
      header: sortableHeader<Auction>("Trạng thái"),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={AuctionStatusVariantMap[status]}>
            {AuctionStatusLabelMap[status]}
          </Badge>
        );
      },
    },
    {
      header: "Hành động",
      cell: ({ row }) => {
        const auction = row.original;
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
                {Object.entries(AUCTION_ADMIN_ACTIONS).map(([actionKey, actionLabel]) => (
                    <DropdownMenuItem
                        key={actionKey}
                        onSelect={() => onAuctionTableAction(actionKey as AuctionAdminAction, auction)}
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

  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    clearFilters,
  } = useDataTableState();

  const table = useReactTable({
    data: data,
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
    <DataTableCard title="Danh sách đấu giá">
      <DataTableToolbar
        searchPlaceholder="Tìm theo ID, người yêu cầu, giá..."
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        onClearFilters={() => {
          clearFilters();
          table.setPageIndex(0);
        }}
        statusFilter={{
          value:
            (table.getColumn("status")?.getFilterValue() as string) ?? "all",
          onChange: (value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? undefined : value),
          options: [
            { label: "Tất cả", value: "all" },
            ...Object.entries(AuctionStatusLabelMap).map(([value, label]) => ({
              label,
              value,
            })),
          ],
        }}
      />
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage="Không có dữ liệu phù hợp."
      />
    </DataTableCard>
  );
}

export default AuctionTable;
