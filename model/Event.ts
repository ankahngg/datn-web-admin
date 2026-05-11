import { Page } from "@/service/api";
import { AcceptLoanTransferApplicationEvent } from "./Events/AcceptLoanTransferApplicationEvent";
import { ApplyLoanApplicationEvent } from "./Events/ApplyLoanApplicationEvent";
import { BidEvent } from "./Events/BidEvent";
import { CancelLoanApplicationEvent } from "./Events/CancelLoanApplicationEvent";
import { CancelLoanOfferEvent } from "./Events/CancelLoanOfferEvent";
import { CancelLoanTransferApplicationEvent } from "./Events/CancelLoanTransferApplicationEvent";
import { CancelLoanTransferOfferEvent } from "./Events/CancelLoanTransferOfferEvent";
import { CreateLoanApplicationEvent } from "./Events/CreateLoanApplicationEvent";
import { CreateLoanOfferEvent } from "./Events/CreateLoanOfferEvent";
import {
  CreateLoanTransferApplicationEvent,
  PayLoanEvent,
} from "./Events/CreateLoanTransferApplicationEvent";
import { DepositEtherEvent } from "./Events/DepositEtherEvent";
import { DepositNftEvent } from "./Events/DepositNftEvent";
import { DepositUsdcEvent } from "./Events/DepositUsdcEvent";
import { EndLoanEvent } from "./Events/EndLoanEvent";
import { FinalizeAuctionEvent } from "./Events/FinalizeAuctionEvent";
import { StartAuctionEvent } from "./Events/StartAuctionEvent";
import { UpdateLoanTransferApplicationEvent } from "./Events/UpdateLoanTransferApplicationEvent";
import { WithdrawEtherEvent } from "./Events/WithdrawEtherEvent";
import { WithdrawNftEvent } from "./Events/WithdrawNftEvent";
import { WithdrawUsdcEvent } from "./Events/WithdrawUsdcEvent";

export type EventResponse = {
  eventName: string;
  data: Page<EventType>;
  lastProcessedBlock: bigint;
};

export type EventType =
  | AcceptLoanTransferApplicationEvent
  | ApplyLoanApplicationEvent
  | BidEvent
  | CancelLoanApplicationEvent
  | CancelLoanOfferEvent
  | CancelLoanTransferApplicationEvent
  | CancelLoanTransferOfferEvent
  | CreateLoanApplicationEvent
  | CreateLoanOfferEvent
  | CreateLoanTransferApplicationEvent
  | DepositEtherEvent
  | DepositNftEvent
  | DepositUsdcEvent
  | EndLoanEvent
  | FinalizeAuctionEvent
  | PayLoanEvent
  | StartAuctionEvent
  | UpdateLoanTransferApplicationEvent
  | WithdrawEtherEvent
  | WithdrawNftEvent
  | WithdrawUsdcEvent;

export const EVENT_ADMIN_ACTIONS = {
  VIEW_DETAIL: "Xem chi tiết",
};

export type EventAdminAction = keyof typeof EVENT_ADMIN_ACTIONS;

export const EVENT_OPTIONS = [
  {
    label: "Chấp nhận yêu cầu chuyển khoản vay",
    value: "ACCEPT_LOAN_TRANSFER_APPLICATION",
  },
  {
    label: "Đăng ký đơn vay",
    value: "APPLY_LOAN_APPLICATION",
  },
  {
    label: "Đặt giá đấu giá",
    value: "BID",
  },
  {
    label: "Hủy đơn vay",
    value: "CANCEL_LOAN_APPLICATION",
  },
  {
    label: "Hủy offer cho vay",
    value: "CANCEL_LOAN_OFFER",
  },
  {
    label: "Hủy yêu cầu chuyển khoản vay",
    value: "CANCEL_LOAN_TRANSFER_APPLICATION",
  },
  {
    label: "Hủy offer chuyển khoản vay",
    value: "CANCEL_LOAN_TRANSFER_OFFER",
  },
  {
    label: "Tạo đơn vay",
    value: "CREATE_LOAN_APPLICATION",
  },
  {
    label: "Tạo offer cho vay",
    value: "CREATE_LOAN_OFFER",
  },
  {
    label: "Tạo yêu cầu chuyển khoản vay",
    value: "CREATE_LOAN_TRANSFER_APPLICATION",
  },
  {
    label: "Nạp Ether",
    value: "DEPOSIT_ETHER",
  },
  {
    label: "Nạp NFT",
    value: "DEPOSIT_NFT",
  },
  {
    label: "Nạp USDC",
    value: "DEPOSIT_USDC",
  },
  {
    label: "Kết thúc khoản vay",
    value: "END_LOAN",
  },
  {
    label: "Hoàn tất đấu giá",
    value: "FINALIZE_AUCTION",
  },
  {
    label: "Thanh toán khoản vay",
    value: "PAY_LOAN",
  },
  {
    label: "Bắt đầu đấu giá",
    value: "START_AUCTION",
  },
  {
    label: "Cập nhật yêu cầu chuyển khoản vay",
    value: "UPDATE_LOAN_TRANSFER_APPLICATION",
  },
  {
    label: "Rút Ether",
    value: "WITHDRAW_ETHER",
  },
  {
    label: "Rút NFT",
    value: "WITHDRAW_NFT",
  },
  {
    label: "Rút USDC",
    value: "WITHDRAW_USDC",
  },
];

export const EVENT_LABEL_MAP: Record<string, string> = {
  ACCEPT_LOAN_TRANSFER_APPLICATION:
    "Chấp nhận yêu cầu chuyển khoản vay",

  APPLY_LOAN_APPLICATION:
    "Đăng ký đơn vay",

  BID:
    "Đặt giá đấu giá",

  CANCEL_LOAN_APPLICATION:
    "Hủy đơn vay",

  CANCEL_LOAN_OFFER:
    "Hủy offer cho vay",

  CANCEL_LOAN_TRANSFER_APPLICATION:
    "Hủy yêu cầu chuyển khoản vay",

  CANCEL_LOAN_TRANSFER_OFFER:
    "Hủy offer chuyển khoản vay",

  CREATE_LOAN_APPLICATION:
    "Tạo đơn vay",

  CREATE_LOAN_OFFER:
    "Tạo offer cho vay",

  CREATE_LOAN_TRANSFER_APPLICATION:
    "Tạo yêu cầu chuyển khoản vay",

  DEPOSIT_ETHER:
    "Nạp Ether",

  DEPOSIT_NFT:
    "Nạp NFT",

  DEPOSIT_USDC:
    "Nạp USDC",

  END_LOAN:
    "Kết thúc khoản vay",

  FINALIZE_AUCTION:
    "Hoàn tất đấu giá",

  PAY_LOAN:
    "Thanh toán khoản vay",

  START_AUCTION:
    "Bắt đầu đấu giá",

  UPDATE_LOAN_TRANSFER_APPLICATION:
    "Cập nhật yêu cầu chuyển khoản vay",

  WITHDRAW_ETHER:
    "Rút Ether",

  WITHDRAW_NFT:
    "Rút NFT",

  WITHDRAW_USDC:
    "Rút USDC",
};

export const collateralTypeMap = {
  "1": "ETH",
  "2": "NFT",
};

export const mockEvents: EventResponse = {
  eventName: "CREATE_LOAN_APPLICATION",
  data: {
      content: [
          {
              id: 1,
              applicationId: BigInt("1001"),
              borrower: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7098",
              collateralType: BigInt("1"),
              collateralAmount: BigInt("50000000000000000"), // 0.05 ETH
              status: BigInt("2"),
              timestamp: BigInt(1624000000000), // Timestamp in milliseconds
              createdAt: "2024-04-01T12:00:00Z",
              logIndex: 0,
              blockNumber: BigInt("12345678"),
              txHash: "0xSampleTransactionHash",
              eventStatus: "PROCESSING",
          },
          {
              id: 2,
              applicationId: BigInt("1002"),
              borrower: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
              collateralType: BigInt("2"),
              collateralAmount: BigInt("1"), // 1 NFT
              nftId: BigInt("1001"),
              status: BigInt("3"),
              timestamp: BigInt(1624000000000), // Timestamp in milliseconds
              createdAt: "2024-03-01T12:00:00Z",
              logIndex: 1,
              blockNumber: BigInt("12345679"),
              txHash: "0xSampleTransactionHash2",
              eventStatus: "PROCESSING",
          },
      ],
      totalElements: 1,
      totalPages: 1,
      size: 10,
      number: 0
  },
  lastProcessedBlock: BigInt("12345678"),
};
