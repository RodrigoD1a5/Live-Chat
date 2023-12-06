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
                <Input name="password" type="password" placeholder="senha" />
                <Input name="confirm" type="password" placeholder="confirme a senha" />

                <Submit>Cadastrar</Submit>
            </form>

            <p className="text-center text-red-500">{state?.message}</p>

            <Link
                href="/signin"
                className="text-darkGray/60 hover:text-darkGray text-center text-sm hover:underline"
            >
                Já tenho uma conta.
            </Link>
        </>
    );
}