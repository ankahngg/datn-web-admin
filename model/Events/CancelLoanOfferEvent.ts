import { BlockchainEventBase } from "./BlockchainEventBase";

export type CancelLoanOfferEvent = BlockchainEventBase & {
    id: number;
    offerId: bigint;
    lender: string;
    timestamp : bigint;
};