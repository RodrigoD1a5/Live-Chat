import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function initializeSocket(token: string) {
  if (!API_URL) throw new Error("Websocket server URL is missing.");

  const socket = io(API_URL, { auth: { token } });

  socket.on("connect", () => {
    console.log("Connected to WebSocket!");
  });
  return socket;
}