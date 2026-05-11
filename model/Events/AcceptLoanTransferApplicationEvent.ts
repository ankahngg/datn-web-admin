import { BlockchainEventBase } from "./BlockchainEventBase";

export type AcceptLoanTransferApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    loanId: bigint;
    buyer: string;
    seller: string;
    price: bigint;
    status : bigint;
    timestamp : bigint;
};