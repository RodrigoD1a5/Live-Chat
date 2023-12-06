import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export function initializeSocket(token: string) {
  if (!SOCKET_URL) throw new Error("Websocket server URL is missing.");

  const socket = io(SOCKET_URL, { auth: { token } });

  socket.on("connect", () => {
    console.log("Connected to WebSocket!");
  });

  return socket;
}
