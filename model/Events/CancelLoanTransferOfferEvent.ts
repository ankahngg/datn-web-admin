import { BlockchainEventBase } from "./BlockchainEventBase";

export type CancelLoanTransferOfferEvent = BlockchainEventBase & {
    id: number;
    offerId: bigint;
    buyer: string;
    timestamp : bigint;
};