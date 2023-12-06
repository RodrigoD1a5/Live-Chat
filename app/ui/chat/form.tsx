"use client";

import { Forward } from "lucide-react";
import { useCallback, useContext } from "react";
import { useFormState } from "react-dom";

import { sendMessage } from "@/app/lib/actions/sendMessage";
import { ChatContext } from "@/app/lib/contexts/chat";
import { SessionContext } from "@/app/lib/contexts/session";
import { Message } from "@/app/lib/definitions";

export function ChatForm() {
    const [state, dispatch] = useFormState(sendMessage, { message: "" });

    const { session } = useContext(SessionContext);
    const { addMessage } = useContext(ChatContext);

    const submit = useCallback<React.FormEventHandler<HTMLFormElement>>(
        (e) => {
            if (!session) return;
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            formData.append("user", JSON.stringify(session.user));
            formData.append("createdAt", new Date().toISOString());

            const data = Object.fromEntries(formData);

            const placeholderMessage: Message = {
                id: new Date().getTime().toString(),
                user: session.user,
                content: data.content.toString(),
                createdAt: data.createdAt.toString(),
            };

            addMessage(placeholderMessage);
            dispatch(formData);

            e.currentTarget.reset();
        },
        [session, addMessage, dispatch],
    );

    return (
        <form
            onSubmit={submit}
            className="flex w-full items-center gap-4 bg-white px-4 py-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        >
            <input
                type="text"
                name="content"
                placeholder="Escreva uma mensagem..."
                className="flex-1 rounded-full border border-darkGray/10 bg-lightGray px-4 py-2 outline-none placeholder:text-darkGray/50"
            />

            <button
                type="submit"
                className="flex h-full items-center justify-center rounded-full bg-lightBlue px-4"
            >
                <Forward color="white" className="mb-1" />
            </button>
        </form>
    );
}