import type {Message} from "../types";
import "./MessageBubble.css";

type MessageBubbleProps  = {
    message: Message,
    tail: boolean,
}

export default function MessageBubble({message, tail}: MessageBubbleProps) {
    const time = new Date(message.timestamp * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`bubble ${message.direction}${tail ? ' tail' : ''}`}>
            <div className="bubble-text">{message.message}</div>
            <div className="bubble-time">{time}</div>
        </div>
    );
}