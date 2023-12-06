"use client";

import { ChatContext } from "@/app/lib/contexts/chat";
import { useContext } from "react";
import { ChatMessage } from "./message";

export function ChatList() {
    const { messages } = useContext(ChatContext);

    return (
        <ul className="flex flex-1 flex-col gap-6 overflow-y-scroll px-4 pb-8 pt-28">
            {Array.from(messages).map((message) => {
                return (
                    <li key={message.id}>
                        <ChatMessage {...message} />
                    </li>
                );
            })}
        </ul>
    );
}