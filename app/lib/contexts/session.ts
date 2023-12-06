import { createContext } from "react";
import { User } from "./definitions";

export type SessionContextValue = {
    user: User | null;
    updateSession(props: User | null): void;
};

export const SessionContext = createContext<SessionContextValue>({
    user: null,
    updateSession: () => { },
});