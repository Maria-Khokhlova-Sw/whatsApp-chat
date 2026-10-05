import {useState} from "react";
import "./MessageInput.css";

type MessageInputProps = {
    onSend: (text: string) => void;
}

export default function MessageInput({onSend}: MessageInputProps) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = text.trim();
        if (!value) return;
        onSend(value);
        setText("");
    }

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <div className="input-field">
                <input
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    placeholder="Введите сообщение" />
                {text.trim() && (
                    <button type="submit" aria-label="Отправить">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path fill="currentColor" d="M5.4 19.43a.99.99 0 0 1-.95-.1.93.93 0 0 1-.45-.83V14l8-2-8-2V5.5c0-.37.15-.65.45-.84a1 1 0 0 1 .95-.09l15.4 6.5c.42.19.63.5.63.93 0 .43-.21.74-.63.93l-15.4 6.5Z"></path>
                        </svg>
                    </button>
                )}
            </div>
        </form>
    )

}