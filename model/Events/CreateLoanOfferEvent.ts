import { BlockchainEventBase } from "./BlockchainEventBase";

export type CreateLoanOfferEvent = BlockchainEventBase & {
    id: number;
    offerId: bigint;
    applicationId?: bigint;
    lender: string;
    loanAmount : bigint;
    interestRate: bigint;
    duration: bigint;
    totalAmountHaveToPay : bigint;
    status : bigint;
    timestamp : bigint;
};