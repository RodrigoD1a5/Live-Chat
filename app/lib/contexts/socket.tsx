"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Socket } from "socket.io-client";
import { initializeSocket } from "../api/socket";
import { SessionContext } from "./session";

export type SocketContextValue = {
  socket: Socket | null;
  disconnect(): void;
};

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  disconnect: () => {},
});

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { session } = useContext(SessionContext);

  const disconnect = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    if (session) setSocket(initializeSocket(session.token));
  }, [session, setSocket]);

  return (
    <SocketContext.Provider value={{ socket, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
}
