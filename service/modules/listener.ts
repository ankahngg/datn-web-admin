import { ListenerStatusResponse, mockListenerStatus } from "@/model/Manage/ListenerStatus";
import { request } from "../api";


export async function getListenerStatus() {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log("Returning mock listener status");
        return mockListenerStatus;
    }

    const data = await request<ListenerStatusResponse[]>({
        path: "/admin/listener/status",
        method: "GET",
    });

    return data;
}

export async function restartListener(eventName: string) {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log(`Mock restart listener for event: ${eventName}`);
        return { success: true };
    }

    const data = await request<string>({
        path: `/admin/listener/restart/${eventName}`,
        method: "POST",
    });

    return data;
}

export async function stopListener(eventName: string) {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log(`Mock stop listener for event: ${eventName}`);
        return { success: true };
    }

    const data = await request<string>({
        path:  `/admin/listener/stop/${eventName}`,
        method: "POST",
    });

    return data;
}