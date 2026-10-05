import type {Chat} from "../types";
import MessageBubble from "./MessageBubble.tsx";
import MessageInput from "./MessageInput.tsx";
import {useEffect, useRef} from "react";
import "./ChatWindow.css";

type ChatWindowProps = {
    chat: Chat;
    onSend: (text: string) => void;
}

export default function ChatWindow({chat, onSend}: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chat.message.length]);

    return (
        <div className="ChatWindow">
            <header className="ChatWindow-header">+{chat.phone}</header>
            <div className="messages">
                {chat.message.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        tail={index === 0 || chat.message[index - 1].direction !== msg.direction}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <MessageInput onSend={onSend} />
        </div>
    )
}