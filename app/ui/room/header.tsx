"use client";
import { SessionContext } from "@/app/lib/contexts/session";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export function RoomHeader({ title }: { title: string }) {
    const { logout } = useContext(SessionContext);
    const router = useRouter();

    return (
        <header className="fixed left-0 top-0 z-10 flex w-full justify-center bg-white px-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <div className="flex h-20 w-full max-w-screen-md items-center justify-between text-slate-800 md:h-24">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{title}</h1>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        <span>
                            <strong>200</strong> Online
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        const response = window.confirm("Tem certeza que quer sair?");
                        if (response) {
                            logout();
                            router.push("/");
                        }
                    }}
                    className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-slate-300 text-slate-400"
                >
                    <LogOut className="translate-x-[1px]" height={18} />
                </button>
            </div>
        </header>
    );
}