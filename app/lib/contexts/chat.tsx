"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { initializeSocket } from "../api/socket";
import { Message } from "../definitions";

export type ChatContextValue = {
    messages: Set<Message>;
    addMessage(message: Message): void;
};
export const ChatContext = createContext<ChatContextValue>({
    messages: new Set(),
    addMessage: () => { },
});