import Link from "next/link";
import { Logo } from "./ui/logo";

export default function Home() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
            <Logo />

            <div className="flex w-2/3 flex-col gap-3">
                <Link
                    href="/signin"
                    className="flex h-10 items-center justify-center rounded-md bg-lightBlue text-lg font-bold text-white"
                >
                    Entrar
                </Link>

                <Link
                    href="/signup"
                    className="flex h-10 items-center justify-center rounded-md border border-lightBlue bg-transparent text-lg font-bold text-lightBlue"
                >
                    Cadastrar
                </Link>
            </div>
        </main>
    );
}