"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Draft, Message } from "../definitions";
import { selectRandomColor } from "../utils/selectRandomColor";
import { SessionContext } from "./session";
import { SocketContext } from "./socket";

export type ChatContextValue = {
  messages: Set<Message>;
  setInitialMessages(messages: Set<Message>): void;
  colorMapping: Map<string, string>;
  onlineUsersCount: number;
  sendMessage(draft: Draft): void;
};

export const ChatContext = createContext<ChatContextValue>({
  messages: new Set(),
  setInitialMessages: () => { },
  colorMapping: new Map(),
  onlineUsersCount: 0,
  sendMessage: () => { },
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
  const { session } = useContext(SessionContext);
  const addMessageToLocalSet = useCallback(
    (message: Message) => {
      setMessages(new Set(messages.add(message)));
    },
    [setMessages, messages],
  );

  const setInitialMessages = useCallback<
    ChatContextValue["setInitialMessages"]
  >(
    (messages) => {
      setMessages(messages);
    },
    [setMessages],
  );

  const sendMessage = useCallback<ChatContextValue["sendMessage"]>(
    (draft) => {
      if (socket && session) {
        socket.emit("message", JSON.stringify(draft));
        const message: Message = {
          id: new Date().getTime().toString(),
          content: draft.content,
          createdAt: new Date().toISOString(),
          user: {
            id: session.user.id,
            name: session.user.name,
          },
          room: {
            id: session.user.id,
            name: session.user.name,
          },
        };
        addMessageToLocalSet(message);
      }
    },
    [addMessageToLocalSet, socket, session],
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
        setInitialMessages,
        sendMessage,
        onlineUsersCount,
        colorMapping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}