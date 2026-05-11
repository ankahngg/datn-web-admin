import { BlockchainEventBase } from "./BlockchainEventBase";

export type CancelLoanTransferApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    seller: string;
    timestamp : bigint;
};