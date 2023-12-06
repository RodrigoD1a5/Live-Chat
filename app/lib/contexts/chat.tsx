"use client";

import { createContext, useCallback, useState } from "react";
import { Message } from "../definitions";

export type ChatContextValue = {
    messages: Set<Message>;
    addMessage(message: Message): void;
};

export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
    addMessage: () => { },
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
            id: "874faec2-cc31-4bf4-8999-4d33ac5a3ca8",
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

    const addMessage = useCallback<ChatContextValue["addMessage"]>(
        (message) => {
            setMessages(new Set(messages.add(message)));
        },
        [setMessages, messages],
    );

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
}