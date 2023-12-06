"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { initializeSocket } from "../api/socket";
import { Message } from "../definitions";

const socket = initializeSocket();

export type ChatContextValue = {
    messages: Set<Message>;
    sendMessage(draft: Omit<Message, "id">): void;
};

export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
    sendMessage: () => { },
});

export function ChatContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<ChatContextValue["messages"]>(
        new Set(),
    );

    const addMessageToLocalSet = useCallback(
        (message: Message) => {
            setMessages(new Set(messages.add(message)));
        },
        [setMessages, messages],
    );

    const sendMessage = useCallback<ChatContextValue["sendMessage"]>(
        (draft) => {
            socket.emit("message", JSON.stringify(draft));

            const message = {
                id: new Date().getTime().toString(),
                ...draft,
            };

            addMessageToLocalSet(message);
        },
        [addMessageToLocalSet],
    );

    useEffect(() => {
        socket.on("chat", (data) => {
            const message = JSON.parse(data) as Message;
            addMessageToLocalSet(message);
        });
    }, [addMessageToLocalSet]);

    return (
        <ChatContext.Provider value={{ messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
}