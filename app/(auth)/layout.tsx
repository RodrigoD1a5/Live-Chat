import { Logo } from "../ui/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <Logo />
      <div className="flex w-2/3 min-w-fit max-w-xs flex-col gap-8">
        {children}
      </div>
    </main>
  );
}
