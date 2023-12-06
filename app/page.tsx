import Link from "next/link";
import { Logo } from "./ui/logo";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 md:gap-14">
      <Logo size="big" />

      <div className="animate-infinite animate-duration-[3000ms] animate-ease-linear absolute right-1/3 top-1/4 -z-10 h-48 w-48 animate-pulse bg-lightPurple/20 blur-2xl" />
      <div className="animate-infinite animate-duration-[3000ms] animate-ease-linear animate-delay-75 absolute bottom-1/4 left-1/3 -z-10 h-48 w-48 animate-pulse bg-lightBlue/20 blur-2xl" />

      <div className="flex w-2/3 min-w-[168px] max-w-xs flex-col gap-3 md:flex-row md:gap-4">
        <Link
          href="/signin"
          className="flex h-10 items-center justify-center rounded-md bg-lightBlue text-lg font-bold text-white transition-all hover:scale-105 md:flex-1"
        >
          Entrar
        </Link>

        <Link
          href="/signup"
          className="flex h-10 items-center justify-center rounded-md border border-lightBlue bg-transparent text-lg font-bold text-lightBlue transition-all hover:scale-105 md:flex-1"
        >
          Cadastrar
        </Link>
      </div>
    </main>
  );
}
