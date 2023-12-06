"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { initializeSocket } from "../api/socket";
import { Message } from "../definitions";
import { selectRandomColor } from "../utils/selectRandomColor";

let socket: any;

export type ChatContextValue = {
    messages: Set<Message>;
    colorMapping: Map<string, string>;
    onlineUsersCount: number;
    sendMessage(draft: Omit<Message, "id">): void;
    disconnect(): void;
};

export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
    colorMapping: new Map(),
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
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);

    const [colorMapping, setColorMapping] = useState<Map<string, string>>(
        new Map(),
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
    const disconnect = useCallback(() => {
        socket.disconnect();
    }, []);

    useEffect(() => {
        socket = initializeSocket();
    }, []);

    useEffect(() => {
        socket.on("chat", (data: string) => {
            const message = JSON.parse(data) as Message;
            const userId = message.user.id;

            if (!colorMapping.has(userId)) {
                const color = selectRandomColor();
                setColorMapping(new Map(colorMapping.set(userId, color)));
            }

            addMessageToLocalSet(message);
        });

        socket.on("online", (data: string) => {
            const { count } = JSON.parse(data) as { count: number };
            setOnlineUsersCount(count);
        });
    }, [addMessageToLocalSet, colorMapping]);

    return (
        <ChatContext.Provider
            value={{
                messages,
                disconnect,
                sendMessage,
                onlineUsersCount,
                colorMapping,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}