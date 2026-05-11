import { BlockchainEventBase } from "./BlockchainEventBase";

export type CreateLoanTransferApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    loanId: bigint;
    seller: string;
    price : bigint;
    status : bigint;
    timestamp : bigint;
};

export interface PayLoanEvent extends BlockchainEventBase {
  lender: string;
  amount: number;
}