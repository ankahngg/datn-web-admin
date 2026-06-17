export type ListenerStatusResponse = {
    listeners: ListenerStatus[];
    totalListeners: number;
    activeListeners: number;
    webSocketConnect: boolean;
}

export type ListenerStatus = {
    eventName: string;
    isRunning: boolean;
    lastProcessedBlock: number;
    lastHeartbeat: number;
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

export const mockListenerStatus: ListenerStatusResponse = {
    listeners: [
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
    ],
    totalListeners: 3,
    activeListeners: 2,
    webSocketConnect: true,
}
