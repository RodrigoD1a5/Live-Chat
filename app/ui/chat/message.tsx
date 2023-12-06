"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import { useContext } from "react";

import { ChatContext } from "@/app/lib/contexts/chat";
import { SessionContext } from "@/app/lib/contexts/session";
import { Message } from "@/app/lib/definitions";

export function ChatMessage({ user, content, createdAt }: Message) {
  const { colorMapping } = useContext(ChatContext);
  const { session } = useContext(SessionContext);

  const isFromCurrentUser = user.id === session?.user.id;
  const color = colorMapping.get(user.id) ?? "#5762e1";

  return (
    <div
      className={clsx(
        "animate-duration-300 flex items-end justify-start gap-3",
        {
          "animate-fade-right": !isFromCurrentUser,
          "animate-fade-left flex-row-reverse": isFromCurrentUser,
        },
      )}
    >
      <div
        className="mb-4 hidden h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-500 font-bold text-white md:flex "
        style={{ background: color }}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex w-full flex-col gap-1">
        <p
          className={clsx(
            "w-fit max-w-[90%] break-words p-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:max-w-[80%]",
            {
              "rounded-r-3xl rounded-bl-md rounded-tl-3xl bg-white":
                !isFromCurrentUser,
              "self-end rounded-l-3xl rounded-br-md rounded-tr-3xl bg-lightBlue text-white selection:bg-white/70 selection:text-lightBlue":
                isFromCurrentUser,
            },
          )}
        >
          {content}
        </p>

        <span
          className={clsx("flex items-center gap-2 text-sm", {
            "flex-row-reverse": isFromCurrentUser,
          })}
        >
          <strong style={{ color: isFromCurrentUser ? "#1e293b" : color }}>
            {isFromCurrentUser ? "You" : user.name}
          </strong>

          <div className="h-2 w-2 rounded-full bg-slate-300" />

          {dayjs(createdAt).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}
