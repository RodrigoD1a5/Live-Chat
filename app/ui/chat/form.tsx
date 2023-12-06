"use client";

import { Forward } from "lucide-react";

export function ChatForm() {
    return (
        <form
            action="#"
            className="flex w-full items-center gap-4 bg-white px-4 py-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        >
            <input
                type="text"
                placeholder="Escreva uma mensagem..."
                className="bg-lightGray border-darkGray/10 placeholder:text-darkGray/50 flex-1 rounded-full border px-4 py-2 outline-none"
            />

            <button
                type="submit"
                className="bg-lightBlue flex h-full items-center justify-center rounded-full px-4"
            >
                <Forward color="white" className="mb-1" />
            </button>
        </form>
    );
}