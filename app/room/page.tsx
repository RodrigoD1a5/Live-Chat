import { fetchRoomList } from "../lib/actions/fetchRoomList";

export default async function Page() {
  const rooms = await fetchRoomList();

  return (
    <main className="flex h-screen w-full flex-col items-center text-slate-800"></main>
  );
}