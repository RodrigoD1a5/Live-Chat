"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../definitions";

export type SessionContextValue = {
    user: User | null;
    updateSession(props: User | null): void;
};

export const SessionContext = createContext<SessionContextValue>({
    user: null,
    updateSession: () => { },
});

export function SessionContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<SessionContextValue["user"]>({
        id: "2",
        email: "",
        name: "samuel",
    });

    useEffect(() => {
        const localSession = localStorage.getItem("session");
        if (localSession) setUser(JSON.parse(localSession));
    }, []);

    const updateSession = useCallback<SessionContextValue["updateSession"]>(
        (value) => {
            localStorage.setItem("session", JSON.stringify(value));
            setUser(null);
        },
        [setUser],
    );

    return (
        <SessionContext.Provider value={{ user, updateSession }}>
            {children}
        </SessionContext.Provider>
    );
}