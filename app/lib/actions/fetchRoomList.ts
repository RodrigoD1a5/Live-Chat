"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "../api/axios";
import { Room } from "../definitions";

export async function fetchRoomList() {
    let id = "";

    try {
        const session = cookies().get("session");
        if (!session) throw new Error("Unauthorized.");

        const { token } = JSON.parse(session.value);

        const { data } = await api.get<{ rooms: Room[] }>("/room", {
            headers: { Authorization: `Bearer ${token}` },
        });

        id = data.rooms[0].id;
    } catch (error) {
        return { rooms: [] };
    }

    redirect("/room/" + id);
}