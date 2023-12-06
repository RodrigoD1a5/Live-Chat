"use server";

import { randomUUID } from "crypto";
import { ZodError, z } from "zod";
import { Message } from "../definitions";

const sendMessageSchema = z.object({
    user: z.object({
        id: z.string().uuid(),
        name: z.string(),
    }),
    content: z.string().min(1),
    createdAt: z.string().datetime(),
});

export async function sendMessage(_prevState: any, formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        data["user"] = JSON.parse(data["user"].toString());

        const parsedData = sendMessageSchema.parse(data);

        const message: Message = {
            id: randomUUID(),
            ...parsedData,
        };

        console.log(message);

        /* Websocket here */
        await new Promise((resolve) => setTimeout(() => resolve, 3000));
    } catch (error) {
        if (error instanceof ZodError) {
            console.error(error);
            return { message: "Formato de mansagem incorreto." };
        }
        return { message: "Não foi possível enviar mensagem." };
    }
}