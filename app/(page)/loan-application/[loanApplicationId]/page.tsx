"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeft, LoaderCircle, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { Badge } from "@/components/ui/badge";


import {
  LoanApplication,
  applicationStatusLabelMap,
  applicationStatusVariantMap,
} from "@/model/LoanApplication";
import { LoanOffer, LoanOfferSubmitValues } from "@/model/LoanOffer";
import {
  useLoanOffersByApplicationId,
  useLoanOffersByApplicationId2,
  useUserLoanApplicationById,
  useUserLoanApplicationById2,
} from "@/hooks/use-get-loan-application";

import { useUserBalance, useUserNFTById, useUserNFTById2 } from "@/hooks/use-user-asset";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { LenderLoanRequestTable } from "@/view/LoanApplication/LenderLoanRequestTable";
import { BorrowerLoanRequestTable } from "@/view/LoanApplication/BorrowerLoanRequestTable";
import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import BackButton from "@/components/MyComponent/BackButton";
import { DetailCard } from "@/components/MyComponent/DetailCard";
import { formatEther, formatUsdc } from "@/utils";


export default function LoanOffersPage() {
  const router = useRouter();
  const params = useParams<{ loanApplicationId: string }>();
  console.log("LoanOffersPage params:", params);

  const loanApplicationId = BigInt(params.loanApplicationId);

  // Data fetching
  const { data: userLoanApplication, isLoading: isLoadingLoanApplication } =
    useUserLoanApplicationById2(loanApplicationId);
  const { data: userLoanOffers, isLoading: isLoadingLoanOffers } =
    useLoanOffersByApplicationId2(loanApplicationId);
  const { data: userNft, isLoading: isLoadingUserNft } = useUserNFTById2(
    userLoanApplication?.nftId,
  );
  
  if (
    isLoadingLoanApplication ||
    isLoadingLoanOffers ||
    isLoadingUserNft 
  )
    return <FullScreenLoading message="Đang tải dữ liệu" />;
  if (!userLoanApplication || !userLoanOffers ) {
    return (
      <FullScreenError
        message={`Có lỗi xảy ra khi tải dữ liệu cho đơn vay với ID ${loanApplicationId}. Vui lòng thử lại sau.`}
      />
    );
  }

  if (userLoanApplication.nftId && !userNft) {
    return (
      <FullScreenError
        message={`Không tìm thấy thông tin NFT với ID ${userLoanApplication.nftId}`}
      />
    );
  }

  const application = userLoanApplication;

  const nft = userNft;

  const offers = userLoanOffers;

  const borrowerOffers = offers.filter(
    (item) =>
      item.requester?.toLowerCase() == application.borrower?.toLowerCase(),
  );

  const lenderOffers = offers.filter(
    (item) =>
      item.requester?.toLowerCase() != application.borrower?.toLowerCase(),
  );

  const accpeptedOffer = application.acceptedOfferId
    ? offers.find((offer) => offer.offerId === application.acceptedOfferId)
    : null;

  return (
    
      <main className="space-y-6">
        <BackButton title="Quay lại " />

        {application ? (
          <>
            <Card className="bg-sidebar text-foreground">
              <CardHeader>
                <CardTitle>
                  Chi tiết đơn vay #{application.applicationId}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accpeptedOffer && (
                  <>
                    <div className="sm:col-span-2 lg:col-span-4">
                      <p className="text-green-600 font-heading bg-foreground/10 px-3 py-2 rounded-xl w-fit">
                        Đơn vay này đã được chấp nhận bởi đề nghị với Offer -{" "}
                        {accpeptedOffer.id}
                      </p>
                    </div>
                  </>
                )}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <DetailCard
                    label="Người vay"
                    value={application.borrower}
                    className="col-span-4 detail-card-bg"
                    valueClassName="break-all font-medium"
                  />
                  <DetailCard
                    label="Tài sản thế chấp"
                    value={application.collateralType}
                    valueClassName="font-medium"
                    className="detail-card-bg"
                  />
                  <DetailCard
                    label="Số lượng thế chấp"
                    value={
                      application.collateralType === "ETHER"
                        ? formatEther(application.collateralAmount)
                        : application.collateralAmount.toString()
                    }
                    valueClassName="font-medium"
                    className="detail-card-bg"
                  />
                  <DetailCard
                    label="Trạng thái"
                    value={
                      <Badge
                        variant={
                          applicationStatusVariantMap[application.status]
                        }
                      >
                        {applicationStatusLabelMap[application.status]}
                      </Badge>
                    }
                    className="detail-card-bg"
                  />

                  {accpeptedOffer && (
                    <>
                      <DetailCard
                        label="Số tiền vay"
                        value={formatUsdc(accpeptedOffer.loanAmount)}
                        valueClassName="font-medium"
                        className="detail-card-bg"
                      />
                      <DetailCard
                        label="Lãi suất"
                        value={accpeptedOffer.interestRate}
                        valueClassName="font-medium"
                        className="detail-card-bg"
                      />
                      <DetailCard
                        label="Thời hạn vay"
                        value={`${accpeptedOffer.duration} tháng`}
                        valueClassName="font-medium"
                        className="detail-card-bg"
                      />
                      <DetailCard
                        label="Thời điểm chấp nhận"
                        value={
                          application.timeAccepted
                            ? application.timeAccepted
                            : "N/A"
                        }
                        valueClassName="font-medium"
                        className="detail-card-bg"
                      />
                    </>
                  )}
                </div>

                {/* NFT Details Section */}
                {nft && (
                  <div className="border-t border-muted pt-4">
                    <h3 className="mb-3 font-semibold text-foreground">
                      Thông tin NFT thế chấp
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {nft.name && (
                        <DetailCard
                          label="Tên NFT"
                          value={nft.name}
                          valueClassName="font-medium"
                          className="detail-card-bg"
                        />
                      )}
                      {nft.collectionName && (
                        <DetailCard
                          label="Tên bộ sưu tập"
                          value={nft.collectionName}
                          valueClassName="font-medium"
                          className="detail-card-bg"
                        />
                      )}
                      {nft.nftAddress && (
                        <DetailCard
                          label="Địa chỉ NFT"
                          value={nft.nftAddress}
                          valueClassName="break-all font-mono text-sm font-medium"
                          className="detail-card-bg"
                        />
                      )}
                      {nft.tokenId && (
                        <DetailCard
                          label="Token ID"
                          value={nft.tokenId}
                          valueClassName="font-medium"
                          className="detail-card-bg"
                        />
                      )}
                      {nft.description && (
                        <DetailCard
                          label="Mô tả"
                          value={nft.description}
                          className="sm:col-span-2 lg:col-span-3"
                          valueClassName="font-medium text-sm"
                        />
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <section className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Wallet className="size-4" />
                  <span>Đề nghị vay của người tạo đơn</span>
                </div>
              </div>
              <BorrowerLoanRequestTable
                title="Danh sách offer của người tạo đơn"
                requests={borrowerOffers}
                application={application}
                emptyText="Chưa có offer nào từ người tạo đơn"
                hilightRowId={
                  accpeptedOffer ? accpeptedOffer.id.toString() : undefined
                }
              />
            </section>

            <section className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Wallet className="size-4" />
                  <span>Đề nghị vay của người cho vay</span>
                </div>
              </div>
              <LenderLoanRequestTable
                title="Danh sách offer của người cho vay"
                requests={lenderOffers}
                application={application}
                emptyText="Chưa có offer nào từ người cho vay"
                hilightRowId={
                  accpeptedOffer ? accpeptedOffer.id.toString() : undefined
                }
              />
            </section>
          </>
        ) : (
          <Card className="bg-sidebar text-foreground">
            <CardHeader>
              <CardTitle>Không tìm thấy đơn vay</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Không thể tìm thấy đơn vay với ID {loanApplicationId}. Vui lòng kiểm
                tra lại đường dẫn hoặc quay lại trang danh sách đơn vay.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
   
  );
}
