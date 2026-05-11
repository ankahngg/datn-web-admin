import { BlockchainEventBase } from "./BlockchainEventBase";

export type CreateLoanApplicationEvent = BlockchainEventBase & {
    id: number;
    applicationId: bigint;
    borrower: string;
   collateralType: bigint;
   collateralAmount : bigint;
   nftId? : bigint;
   status : bigint;
   timestamp : bigint;
};