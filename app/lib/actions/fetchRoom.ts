"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "../api/axios";
import { Room } from "../definitions";

export async function fetchRoom(roomId: string) {
    try {
        const session = cookies().get("session");
        if (!session) throw new Error("Unauthorized.");

        const { token } = JSON.parse(session.value);

        const { data } = await api.get<{ room: Room }>("/room/" + roomId, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return data;
    } catch (error) {
        redirect("/room");
    }
}