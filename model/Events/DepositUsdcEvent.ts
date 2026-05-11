import { BlockchainEventBase } from "./BlockchainEventBase";

export type DepositUsdcEvent = BlockchainEventBase & {
    id: number;
    user: string;
    amount: bigint;
    timestamp : bigint;
};