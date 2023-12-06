"use client";

import { useCookies } from "next-client-cookies";
import { createContext, useCallback, useEffect, useState } from "react";
import { Session } from "../definitions";

export type SessionContextValue = {
  session: Session | null;
  logout(): void;
};

export const SessionContext = createContext<SessionContextValue>({
  session: null,
  logout: () => {},
});

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionContextValue["session"]>(null);
  const cookie = useCookies();

  useEffect(() => {
    const sessionData = cookie.get("session");
    if (sessionData) setSession(JSON.parse(sessionData));
    // eslint-disable-next-line
  }, []);

  const logout = useCallback<SessionContextValue["logout"]>(() => {
    cookie.remove("session");
    setSession(null);
  }, [setSession, cookie]);

  return (
    <SessionContext.Provider value={{ session, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
