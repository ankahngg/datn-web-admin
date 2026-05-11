import { BlockchainEventBase } from "./BlockchainEventBase";

export type UpdateLoanTransferApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    newPrice: bigint;
    timestamp : bigint;
};