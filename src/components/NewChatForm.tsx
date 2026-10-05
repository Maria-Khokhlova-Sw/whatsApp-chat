import {useState} from "react";

type NewChatFormProps = {
    onCreate: (phone: string) => void;
}

export default function NewChatForm({onCreate}: NewChatFormProps) {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = phone.trim();
        if (!value) return;
        onCreate(value);
        setPhone("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                placeholder="Номер телефона" />
            <button type="submit">Создать чат</button>
        </form>
    )

}