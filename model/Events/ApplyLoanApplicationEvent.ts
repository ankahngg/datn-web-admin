import { BlockchainEventBase } from "./BlockchainEventBase";

export type ApplyLoanApplicationEvent = BlockchainEventBase & {
    id: number;
    loanId: bigint;
    offerId: bigint;
    applicationId : bigint;
    borrower: string;
    lender: string;
    loanAmount: bigint;
    amountHaveToPay: bigint;
    status : bigint;
    timestamp : bigint;
};