"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";
import { api } from "../api/axios";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export async function login(_prevState: any, formData: FormData) {
  try {
    const { email, password } = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { data } = await api.post("/signin", { email, password });

    cookies().set("session", JSON.stringify(data), {
      maxAge: 60 * 60 * 24, // one day
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return { message: "Email ou senha inválidos." };
    }
    return { message: "Falha ao fazer login." };
  }

  redirect("/room");
}
