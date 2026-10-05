import {useState} from "react";

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
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                placeholder="Введите сообщение" />
            <button type="submit">Отправить</button>
        </form>
    )

}