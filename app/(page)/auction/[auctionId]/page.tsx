"use client";

import BackButton from "@/components/MyComponent/BackButton";
import { DetailCard } from "@/components/MyComponent/DetailCard";
import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuctionById2 } from "@/hooks/use-auction";
import { useAuctionTransactions2 } from "@/hooks/use-auction-transaction";
import { useUserBalance2 } from "@/hooks/use-user-asset";
import {
  AuctionStatusVariantMap,
  AuctionStatusLabelMap,
  Auction,
} from "@/model/Auction";
import {
  AuctionBidSubmit,
  AuctionTransaction,
  AuctionTransactionAction,
} from "@/model/AuctionTransaction";
import { formatUsdc, formatDate } from "@/utils";
import AuctionTransactionTable from "@/view/Auction/AuctionTransactionTable";

import { Wallet } from "lucide-react";

import { useParams } from "next/navigation";
import { useState } from "react";

import { fi } from "zod/v4/locales";

function Page() {
 
  const params = useParams<{ auctionId: string }>();
  const auctionId = BigInt(params.auctionId);

  const { data: auction, isLoading, error } = useAuctionById2(auctionId);
  const { data: auctionTransactions, isLoading: auctionTransactionsIsLoading } =
    useAuctionTransactions2({
      filter: {
        auctionId: Number(auctionId),
      },
      pageable: {
        page: 0,
        size: 100,
        sort: "eventTimestamp,DESC",
      },
    });
 

  if (isLoading  || auctionTransactionsIsLoading)
    return <FullScreenLoading />;

  if (!auction || !auctionTransactions )
    return (
      <FullScreenLoading message="Không thể tải dữ liệu đấu giá. Vui lòng thử lại sau." />
    );

  function handleAuctionTransactionAction(
    auctionTransactionAction: AuctionTransactionAction,
    auctionTransaction: AuctionTransaction,
  ) {
    switch (auctionTransactionAction) {
      case "VIEW_DETAILS":
        // router.push(`/auction/${auction.auctionId}`);
        alert(
          `Xem chi tiết giao dịch đấu giá #${auctionTransaction.auctionId}`,
        );
        break;
      default:
        break;
    }
  }

  function onBid(submitData: AuctionBidSubmit) {
    // Gọi API để thực hiện đặt giá
    alert(
      `Đặt giá ${formatUsdc(submitData.bidAmount)} cho đấu giá #${submitData.auctionId}`,
    );
  }

  function onFinalize() {
    // Gọi API để chốt đấu giá
    alert(`Chốt đấu giá #${auction?.auctionId}`);
  }

  return (
   
      <div className="space-y-6 pb-8">
        <BackButton title="Quay lại" />

        <Card className="bg-sidebar text-foreground">
          <CardHeader>
            <CardTitle>Chi tiết đấu giá #{auction.auctionId}</CardTitle>
          </CardHeader>

          <CardContent className="gap-3 grid sm:grid-cols-2 lg:grid-cols-4">
            <DetailCard
              label="Người trả giá cao nhất"
              value={auction.highestBidder || "Chưa có người mua"}
              className="col-span-4"
            />
            <DetailCard label="Khoản vay đấu giá" value={auction.loanId} />
            <DetailCard
              label="Giá khởi điểm"
              value={formatUsdc(auction.startPrice)}
            />
            <DetailCard
              label="Giá cao nhất hiện tại"
              value={formatUsdc(auction.highestBid)}
            />

            <DetailCard
              label="Trạng thái"
              value={
                <Badge variant={AuctionStatusVariantMap[auction.status]}>
                  {AuctionStatusLabelMap[auction.status]}
                </Badge>
              }
            />
            <DetailCard
              label="Thời gian bắt đầu"
              value={formatDate(auction.timeStart)}
            />
            <DetailCard
              label="Thời gian kết thúc"
              value={formatDate(auction.timeEnd)}
            />
            <DetailCard
              label="Thời gian kết thúc"
              value={formatDate(auction.timeFinalized)}
            />
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="size-4" />
              <span>Lịch sử đấu giá </span>
            </div>
          </div>
          <AuctionTransactionTable
            data={auctionTransactions}
            onAuctionTransactionAction={handleAuctionTransactionAction}
          />
        </section>

      </div>
   
  );
}

export default Page;
