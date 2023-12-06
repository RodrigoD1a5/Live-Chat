"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Message } from "../definitions";
import { selectRandomColor } from "../utils/selectRandomColor";
import { SocketContext } from "./socket";

export type ChatContextValue = {
  messages: Set<Message>;
  colorMapping: Map<string, string>;
  onlineUsersCount: number;
  sendMessage(draft: Omit<Message, "id">): void;
};

export const ChatContext = createContext<ChatContextValue>({
  messages: new Set(),
  colorMapping: new Map(),
  onlineUsersCount: 0,
  sendMessage: () => {},
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

  const { socket } = useContext(SocketContext);

  const addMessageToLocalSet = useCallback(
    (message: Message) => {
      setMessages(new Set(messages.add(message)));
    },
    [setMessages, messages],
  );

  const sendMessage = useCallback<ChatContextValue["sendMessage"]>(
    (draft) => {
      if (socket) {
        socket.emit("message", JSON.stringify(draft));

        const message = {
          id: new Date().getTime().toString(),
          ...draft,
        };

        addMessageToLocalSet(message);
      }
    },
    [addMessageToLocalSet, socket],
  );

  useEffect(() => {
    if (socket) {
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
    }
  }, [addMessageToLocalSet, colorMapping, socket]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        onlineUsersCount,
        colorMapping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
