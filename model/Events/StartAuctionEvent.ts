import { BlockchainEventBase } from "./BlockchainEventBase";

export type StartAuctionEvent = BlockchainEventBase & {
    id: number;
    loanId: bigint;
    auctionId: bigint;
    startPrice : bigint;
    startTime : string;
    endTime : string;
    timestamp : bigint;
};