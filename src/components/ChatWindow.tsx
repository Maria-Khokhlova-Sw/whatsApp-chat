import type {Chat} from "../types";
import MessageBubble from "./MessageBubble.tsx";
import MessageInput from "./MessageInput.tsx";

type ChatWindowProps = {
    chat: Chat;
    onSend: (text: string) => void;
}

export default function ChatWindow({chat, onSend}: ChatWindowProps) {
    return (
        <div className="ChatWindow">
            <header className="ChatWindow-header">+{chat.phone}</header>
            <div className="messages">
                {chat.message.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
            </div>

            <MessageInput onSend={onSend} />
        </div>
    )
}