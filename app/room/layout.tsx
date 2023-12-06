import { SessionContextProvider } from "../lib/contexts/session";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SessionContextProvider>{children}</SessionContextProvider>;
}