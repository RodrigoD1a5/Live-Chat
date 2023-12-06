"use client";

import { Loader } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

import { ChatContext } from "@/app/lib/contexts/chat";
import { SessionContext } from "@/app/lib/contexts/session";
import { Message } from "@/app/lib/definitions";
import { ChatMessage } from "./message";

export function ChatList() {
  const { messages } = useContext(ChatContext);
  const { session } = useContext(SessionContext);

  return (
    <ul className="scrollbar-hide flex w-full max-w-screen-md flex-1 flex-col gap-6 overflow-y-scroll px-4 pb-8 pt-28">
      {session ? (
        Array.from(messages).map((message) => {
          return <ChatListItem key={message.id} message={message} />;
        })
      ) : (
        <li className="flex h-full w-full flex-col items-center justify-center text-slate-300">
          <Loader className="animate-duration-[6000ms] h-2/5 w-2/5 animate-spin" />
        </li>
      )}
    </ul>
  );
}

function ChatListItem({ message }: { message: Message }) {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <li ref={itemRef}>
      <ChatMessage {...message} />
    </li>
  );
}
