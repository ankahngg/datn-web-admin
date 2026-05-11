import { BlockchainEventBase } from "./BlockchainEventBase";

export type BidEvent = BlockchainEventBase & {  
    id: number;
    auctionId: bigint;
    bidder: string;
    bidAmount: bigint;
    endTime : bigint;
    timestamp : bigint;
};