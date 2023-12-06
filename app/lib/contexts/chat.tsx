"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { initializeSocket } from "../api/socket";
import { Message } from "../definitions";

let socket: any;

export type ChatContextValue = {
    messages: Set<Message>;
    onlineUsersCount: number;
    sendMessage(draft: Omit<Message, "id">): void;
    disconnect(): void;
};

export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
    onlineUsersCount: 0,
    sendMessage: () => { },
    disconnect: () => { },
});

export function ChatContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<Set<Message>>(new Set());

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

    const disconnect = useCallback(() => {
        socket.disconnect();
    }, []);

    const [onlineUsersCount, setOnlineUsersCount] = useState(0);

    useEffect(() => {
        socket = initializeSocket();
    }, []);

    useEffect(() => {
        socket.on("chat", (data: string) => {
            const message = JSON.parse(data) as Message;
            addMessageToLocalSet(message);
        });

        socket.on("online", (data: string) => {
            const { count } = JSON.parse(data) as { count: number };
            setOnlineUsersCount(count);
        });
    }, [addMessageToLocalSet]);

    return (
        <ChatContext.Provider
            value={{ messages, onlineUsersCount, sendMessage, disconnect }}
        >
            {children}
        </ChatContext.Provider>
    );
}