"use client";
import clsx from "clsx";
import dayjs from "dayjs";
import { useContext } from "react";
import { SessionContext } from "@/app/lib/contexts/session";
import { Message } from "@/app/lib/definitions";
export function ChatMessage({ user, content, createdAt }: Message) {
    const { session } = useContext(SessionContext);
    const isFromCurrentUser = user.id === session?.user.id;
    return (
        <div
            className={clsx("flex items-end justify-start gap-3", {
                "flex-row-reverse": isFromCurrentUser,
            })}
        >
            <div className="mb-4 hidden h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/50 font-bold text-white md:flex">
                {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex w-fit flex-col gap-1">
                <p
                    className={clsx(
                        "max-w-[90%] break-words p-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:max-w-[80%]",
                        {
                            "rounded-r-3xl rounded-bl-md rounded-tl-3xl bg-white":
                                !isFromCurrentUser,
                            "self-end rounded-l-3xl rounded-br-md rounded-tr-3xl bg-lightBlue text-white":
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
                    <strong>{isFromCurrentUser ? "You" : user.name}</strong>
                    <div className="h-2 w-2 rounded-full bg-black/10" />
                    {dayjs(createdAt).format("hh:mm")}
                </span>
            </div>
        </div>
    );
}