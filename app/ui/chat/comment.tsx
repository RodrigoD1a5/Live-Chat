"use client";

import { Comment } from "@/app/lib/definitions";
import dayjs from "dayjs";

export function ChatComment({ user, content, createdAt }: Comment) {
    return (
        <div className="flex items-end justify-start gap-3">
            <div className="mb-4 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-black/50"></div>
            <div className="flex w-fit flex-col gap-1">
                <p className="break-all rounded-r-3xl rounded-bl-md rounded-tl-3xl bg-white p-4">
                    {content}
                </p>
                <span className="flex items-center gap-2 text-sm">
                    <strong>{user.name}</strong>
                    <div className="h-2 w-2 rounded-full bg-black/10" />
                    {dayjs(createdAt).format("hh:mm")}
                </span>
            </div>
        </div>
    );
}