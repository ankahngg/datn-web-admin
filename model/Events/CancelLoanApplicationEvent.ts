import { BlockchainEventBase } from "./BlockchainEventBase";

export type CancelLoanApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    borrower: string;
    timestamp : bigint;
};