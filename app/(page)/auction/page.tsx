"use client";

import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { useGetUsers, useGetUsers2 } from "@/hooks/use-get-users";

import { User, UserFilter } from "@/model/User";
import { TableFilter } from "@/components/data-table/TableFilter";
import { useState } from "react";
import UserTable from "@/view/User/UserTable";
import { LoanApplication, LoanApplicationAdminAction, LoanApplicationFilter } from "@/model/LoanApplication";
import { useUserLoanApplications2 } from "@/hooks/use-get-loan-application";
import LoanApplicationTable from "@/view/LoanApplication/LoanApplicationTable";
import { useRouter } from "next/navigation";
import { LoanAdminAction, LoanFilter, UserLoan } from "@/model/Loan";
import { useGetLoans2 } from "@/hooks/use-get-loans";
import { LoanTable } from "@/view/Loan/LoanTable";
import { Auction, AuctionAdminAction, AuctionFilter } from "@/model/Auction";
import AuctionTable from "@/view/Auction/AuctionTable";
import { useAuctions2 } from "@/hooks/use-auction";

function AuctionPage() {
    const router = useRouter();
  const [auctionFilter, setAuctionFilter] = useState<AuctionFilter>({});
  
    const {
        data: auctionData,
        error: auctionError,
        isLoading: auctionIsLoading,
    } = useAuctions2({ filter: auctionFilter, pageable: { page: 0, size: 10, sort: "createdAt,DESC" } });

  if (auctionIsLoading) {
    return <FullScreenLoading />;
  }

  if (!auctionData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu." />
    );
  }

  function onFilter(filter: AuctionFilter) {
    setAuctionFilter(filter);
  }

  function onTableAction(
    action: AuctionAdminAction,
    auction: Auction,
  ) {
    console.log("Action:", action, "on auction:", auction);

    switch (action) {
        case "VIEW_DETAIL": 
            router.push(`/auction/${auction.auctionId}`);
            break;
        default:
            console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý đấu giá</h2>
            </div>
      <TableFilter<AuctionFilter>
        config={[
          {
            name: "startPrice",
            label: "Giá khởi điểm",
            type: "number",
            required: false,
          },
          {
            name: "highestBid",
            label: "Giá cao nhất",
            type: "number",
            required: false,
          },
          {
            name: "highestBidder",
            label: "Người đặt giá cao nhất",
            type: "text",
            required: false,
          },
          {
            name: "status",
            label: "Trạng thái",
            type: "select",
             options: [
              { label: "Đang chờ tạo", value: "PENDING_CREATED" },
                { label: "Đã tạo", value: "CREATED" },
                { label: "Đang chờ kết thúc", value: "PENDING_FINALIZED" },
                { label: "Đã kết thúc", value: "FINALIZED" },
            ],
            required: false,
          },
          
          {
            name: "fromTimeCreated",
            label: "Ngày tạo từ",
            type: "date",
            required: false,
          },
          {
            name: "toTimeCreated",
            label: "Ngày tạo đến",
            type: "date",
            required: false,
          },
        ]}
        onFilter={(filter: UserFilter) => onFilter(filter)}
      />

      <AuctionTable 
        data={auctionData}
        onAuctionTableAction={onTableAction}

       />
    </div>
  );
}

export default AuctionPage;
