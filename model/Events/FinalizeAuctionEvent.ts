import { BlockchainEventBase } from "./BlockchainEventBase";

export type FinalizeAuctionEvent = BlockchainEventBase & {
    id: number;
    auctionId: bigint;
    winner: string;
    winningBid: bigint;
    endTime : string;
    timestamp : bigint;
};