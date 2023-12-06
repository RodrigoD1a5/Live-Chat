"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/app/lib/actions/signup";
import { Input } from "@/app/ui/forms/input";
import { Submit } from "@/app/ui/forms/submit";
export default function Page() {
    const [state, dispatch] = useFormState(signup, { message: "" });
    return (
        <>
            <form action={dispatch} className="flex flex-col gap-2">
                <Input name="name" type="text" placeholder="nome" />
                <Input name="email" type="email" placeholder="email" />
                <Input
                    name="password"
                    type="password"
                    min={6}
                    max={16}
                    placeholder="senha"
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    min={6}
                    max={16}
                    placeholder="confirme a senha"
                />

                <Submit>Cadastrar</Submit>
            </form>
            <p className="text-center text-red-500">{state?.message}</p>

            <Link
                href="/signin"
                className="text-center text-sm text-darkGray/60 hover:text-darkGray hover:underline"
            >
                Já tenho uma conta.
            </Link>
        </>
    );
}