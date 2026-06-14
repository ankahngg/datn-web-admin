"use client";

import BackButton from "@/components/MyComponent/BackButton";
import { DetailCard } from "@/components/MyComponent/DetailCard";
import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useUserBalance2 } from "@/hooks/use-user-asset";
import {
  useGetLoanTransferById2,
  useLoanTransferOffersByTransferId2,
} from "@/hooks/uset-get-loan-transfer";
import {
  applicationStatusVariantMap,
  applicationStatusLabelMap,
} from "@/model/LoanApplication";
import {
  CreateLoanTransferOfferSubmitValues,
  LoanTransferOfferAction,
  UserLoanTransferOffer,
} from "@/model/LoanTransferOffer";
import { formatDate, formatUsdc } from "@/utils";
import TransferOfferTable from "@/view/LoanTransfer/TransferOfferTable";

import { Wallet } from "lucide-react";

import { useParams } from "next/navigation";
import { format } from "path";
import { useState } from "react";

function Page() {
  const params = useParams<{ transferId: string }>();
  const transferId = BigInt(params.transferId);
  // alert(`Transfer ID: ${transferId}`);

  const {
    data: loanTransfer,
    isLoading: loanTransferIsLoading,
    error,
  } = useGetLoanTransferById2(transferId);

  const {
    data: userLoanTransferOffers,
    isLoading: userLoanTransferOffersIsLoading,
    error: userLoanTransferOffersError,
  } = useLoanTransferOffersByTransferId2(transferId);

  if (loanTransferIsLoading || userLoanTransferOffersIsLoading)
    return <FullScreenLoading />;
  if (!loanTransfer || !userLoanTransferOffers)
    return (
      <FullScreenError message="Không thể tải dữ liệu chuyển nhượng vay. Vui lòng thử lại sau." />
    );

  return (
    <div className="space-y-6 pb-8">
      <BackButton title="Quay lại" />

      <Card className="bg-sidebar text-foreground">
        <CardHeader>
          <CardTitle>
            Chi tiết đơn chuyển nhượng vay #{loanTransfer.transferId}
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-3 grid sm:grid-cols-2 lg:grid-cols-4">
          <DetailCard
            label="Người bán"
            value={loanTransfer.seller}
            className="col-span-4"
          />
          <DetailCard
            label="Người mua"
            value={loanTransfer.buyer || "Chưa có người mua"}
            className="col-span-4"
          />

          <DetailCard
            label="Khoản vay chuyển nhượng"
            value={loanTransfer.loanId}
          />
          <DetailCard
            label="Giá chuyển nhượng"
            value={formatUsdc(loanTransfer.price)}
          />

          <DetailCard
            label="Trạng thái"
            value={
              <Badge variant={applicationStatusVariantMap[loanTransfer.status]}>
                {applicationStatusLabelMap[loanTransfer.status]}
              </Badge>
            }
          />
          <DetailCard
            label="Thời gian tạo"
            value={formatDate(loanTransfer.timeCreated)}
          />
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="size-4" />
            <span>Danh sách đề nghị </span>
          </div>
        </div>
        <TransferOfferTable
          transferApplication={loanTransfer}
          data={userLoanTransferOffers}
        />
      </section>
    </div>
  );
}

export default Page;
