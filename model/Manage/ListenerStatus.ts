export type ListenerStatusResponse = {
    eventName: string;
    isRunning: boolean;
    lastProcessedBlock: number;
    lastHeartbeat: number;
}

export type ListenerStatus = {
    eventName: string;
    isRunning: boolean;
    lastProcessedBlock: number;
    lastHeartbeat: string;
}

export const LISTENER_ACTIONS = [
    "RESTART",
    "STOP"
]

export type ListenerActions = typeof LISTENER_ACTIONS[number];

export const ListenerActionLabelMap: Record<ListenerActions, string> = {
    RESTART: "Khởi động lại / chạy",
    STOP: "Dừng",
}

export const mockListenerStatus: ListenerStatusResponse[] = [
    {
        eventName: "AuctionFinalized",
        isRunning: true,
        lastProcessedBlock: 123456,
        lastHeartbeat: Date.now(),
    },
    {
        eventName: "BidPlaced",
        isRunning: false,
        lastProcessedBlock: 123450,
        lastHeartbeat: Date.now() - 60000,
    },
    {
        eventName: "LoanCreated",
        isRunning: true,    
        lastProcessedBlock: 123460,
        lastHeartbeat: Date.now(),
    },
]