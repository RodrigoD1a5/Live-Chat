"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { login } from "@/app/lib/actions/login";
import { Input } from "@/app/ui/forms/input";
import { Submit } from "@/app/ui/forms/submit";

export default function Page() {
  const [state, dispatch] = useFormState(login, { message: "" });

  return (
    <>
      <form
        action={dispatch}
        className="animate-fade-up animate-duration-300 flex flex-col gap-2"
      >
        <Input name="email" type="email" placeholder="email" />
        <Input
          name="password"
          type="password"
          min={6}
          max={16}
          placeholder="senha"
        />

        <Submit>Entrar</Submit>
      </form>

      <p className="text-center text-red-500">{state?.message}</p>

      <Link
        href="/signup"
        className="text-center text-sm text-slate-500 transition-colors hover:text-slate-800 hover:underline md:text-base"
      >
        Não tenho uma conta.
      </Link>
    </>
  );
}
