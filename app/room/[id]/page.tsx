import { fetchRecentMessages } from "@/app/lib/actions/fetchRecentMessages";
import { fetchRoom } from "@/app/lib/actions/fetchRoom";
import { ChatForm } from "../../ui/chat/form";
import { ChatList } from "../../ui/chat/list";
import { RoomHeader } from "../../ui/room/header";

export default async function Page({ params }: { params: { id: string } }) {
    const { messages } = await fetchRecentMessages(params.id);
    const { room } = await fetchRoom(params.id);

    return (
        <>
            <RoomHeader title={room.name} />

            <main className="flex h-screen w-full flex-col items-center text-slate-800">
                <ChatList initialMessagesList={messages} />
                <ChatForm roomId={room.id} />
            </main>
        </>
    );
}