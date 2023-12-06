"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";

import { ChatContext } from "@/app/lib/contexts/chat";
import { SessionContext } from "@/app/lib/contexts/session";
import { SocketContext } from "@/app/lib/contexts/socket";

export function RoomHeader({ title }: { title: string }) {
  const { onlineUsersCount } = useContext(ChatContext);
  const { disconnect } = useContext(SocketContext);
  const { logout } = useContext(SessionContext);

  const router = useRouter();

  const logoutAndDisconnect = useCallback(() => {
    const response = window.confirm("Tem certeza que quer sair?");

    if (response) {
      logout();
      disconnect();
      router.push("/");
    }
  }, [logout, disconnect, router]);

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
              <strong>{onlineUsersCount}</strong> Online
            </span>
          </div>
        </div>

        <button
          onClick={logoutAndDisconnect}
          className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-colors hover:border-red-500 hover:text-red-500"
        >
          <LogOut className="translate-x-[1px]" height={18} />
        </button>
      </div>
    </header>
  );
}
