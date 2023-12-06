import { ChatContextProvider } from "../lib/contexts/chat";
import { SessionContextProvider } from "../lib/contexts/session";
import { SocketContextProvider } from "../lib/contexts/socket";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider>
      <SocketContextProvider>
        <ChatContextProvider>{children}</ChatContextProvider>
      </SocketContextProvider>
    </SessionContextProvider>
  );
}
