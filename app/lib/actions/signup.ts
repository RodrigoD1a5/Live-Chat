"use server";

import { ZodError, z } from "zod";
import { api } from "../api/axios";
import { login } from "./login";

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export async function signup(_prevState: any, formData: FormData) {
  try {
    const { name, email, password } = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    await api.post("/signup", { name, email, password });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = [];

      for (const key in error.format()) {
        switch (key) {
          case "name":
            errors.push("Nome inválido.");
            break;
          case "email":
            errors.push("Email inválido.");
            break;
          case "password":
            errors.push("Senha inválida. Precisa ter entre 6 e 16 caracteres.");
            break;
          case "confirmPassword":
            errors.push("Senhas precisam ser iguais.");
            break;
        }
      }

      return { message: errors.join("\n") };
    }

    return { message: "Falha ao fazer cadastro." };
  }

  return login(null, formData);
}
