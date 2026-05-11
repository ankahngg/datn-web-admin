import { BlockchainEventBase } from "./BlockchainEventBase";

export type WithdrawUsdcEvent = BlockchainEventBase & {
    id: number;
    user: string;
    amount: bigint;
    timestamp : bigint;
};