import type {Message} from "../types";

type MessageBubbleProps  = {
    message: Message,
}

export default function MessageBubble({message}: MessageBubbleProps) {
    const time = new Date(message.timestamp * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`bubble ${message.direction}`}>
            <div className="bubble-text">{message.message}</div>
            <div className="bubble-time">{time}</div>
        </div>
    );
}