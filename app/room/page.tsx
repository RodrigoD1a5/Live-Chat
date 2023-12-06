import { ChatForm } from "../ui/chat/form";
import { ChatList } from "../ui/chat/list";
import { RoomHeader } from "../ui/room/header";

export default function Page() {
  return (
    <>
      <RoomHeader title="Global Room" />

      <main className="flex h-screen w-full flex-col items-center text-slate-800">
        <ChatList />
        <ChatForm />
      </main>
    </>
  );
}
