"use client";

import { useCallback, useEffect, useState } from "react";
import { SessionContext, SessionContextValue } from "../lib/contexts/session";

export default function Layout({ children }: { children: React.ReactNode }) {
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