export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-8">
            <h1 className="before:w-30 from-lightBlue to-lightPurple bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                Live Chat
            </h1>
            <div className="flex w-2/3 flex-col gap-8">{children}</div>
        </main>
    );
}