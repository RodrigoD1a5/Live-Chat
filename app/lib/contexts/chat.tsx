"use client";

import { createContext, useState } from "react";
import { Message } from "../definitions";

export type ChatContextValue = {
    messages: Set<Message>;
};

export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
});

const mockMessages = new Set([
    {
        id: "1",
        user: {
            id: "another-user",
            name: "Jennifer",
        },
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consectetur corporis culpa nobis exercitationem maxime at, asperiores amet laborum doloremque corrupti impedit velit magni animi magnam, cum officiis, itaque provident.",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        user: {
            id: "user-1",
            name: "Samuel",
        },
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consectetur corporis culpa nobis exercitationem maxime at, asperiores amet laborum doloremque corrupti impedit velit magni animi magnam, cum officiis, itaque provident.",
        createdAt: new Date().toISOString(),
    },
]);

export function ChatContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] =
        useState<ChatContextValue["messages"]>(mockMessages);

    return (
        <ChatContext.Provider value={{ messages }}>{children}</ChatContext.Provider>
    );
}