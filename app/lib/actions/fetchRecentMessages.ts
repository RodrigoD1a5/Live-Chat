"use server";

import { cookies } from "next/headers";
import { api } from "../api/axios";
import { Message } from "../definitions";

export async function fetchRecentMessages(roomId: string) {
    try {
        const session = cookies().get("session");
        if (!session) throw new Error("Unauthorized.");

        const { token } = JSON.parse(session.value);

        const { data } = await api.get<{ messages: Message[] }>(
            `/room/${roomId}/messages/recent`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        return data;
    } catch (error) {
        return { messages: [] };
    }
}