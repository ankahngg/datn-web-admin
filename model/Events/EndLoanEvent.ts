import { BlockchainEventBase } from "./BlockchainEventBase";

export type EndLoanEvent = BlockchainEventBase & {
    id: number;
    loanId: bigint;
    borrower : string;
    lender : string;
    amountPaid : bigint;
    amountHaveToPay : bigint;
    remainingDebt : bigint;
    status : bigint;
    timestamp : bigint;
};