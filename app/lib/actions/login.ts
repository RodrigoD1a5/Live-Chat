"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";
import { Session } from "../definitions";
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(16),
});
export async function login(_prevState: any, formData: FormData) {
    try {
        const data = loginSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        /* Replace axios API request here to get credentials */
        const session = await new Promise<Session>((resolve) =>
            setTimeout(
                () =>
                    resolve({
                        user: {
                            id: "874faec2-cc31-4bf4-8999-4d33ac5a3ca8",
                            name: "samuel",
                        },
                        token: "token-1",
                    }),
                3000,
            ),
        );

        cookies().set("session", JSON.stringify(session), {
            maxAge: 60 * 60 * 24, // one day
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return { message: "Email ou senha inválidos." };
        }
        return { message: "Falha ao fazer login." };
    }
    redirect("/room");
}