import { ChatForm } from "../ui/chat/form";
import { ChatMessage } from "../ui/chat/message";

const mock = [
    {
        id: "1",
        user: {
            id: "1",
            name: "Jennifer",
        },
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consectetur corporis culpa nobis exercitationem maxime at, asperiores amet laborum doloremque corrupti impedit velit magni animi magnam, cum officiis, itaque provident.",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        user: {
            id: "2",
            name: "samuel",
        },
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consectetur corporis culpa nobis exercitationem maxime at, asperiores amet laborum doloremque corrupti impedit velit magni animi magnam, cum officiis, itaque provident.",
        createdAt: new Date().toISOString(),
    },
];

export default function Page() {
    return (
        <main className="text-darkGray flex h-screen w-full flex-col items-center">
            <ul className="flex flex-1 flex-col gap-6 overflow-y-scroll p-4">
                <li>
                    <ChatMessage {...mock[0]} />
                </li>
                <li>
                    <ChatMessage {...mock[1]} />
                </li>
                <li>
                    <ChatMessage {...mock[0]} />
                </li>
                <li>
                    <ChatMessage {...mock[1]} />
                </li>
            </ul>

            <ChatForm />
        </main>
    );
}