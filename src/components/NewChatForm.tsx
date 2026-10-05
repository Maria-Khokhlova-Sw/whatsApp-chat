import {useState} from "react";
import "./NewChatForm.css";

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
        <form className="new-chat-form" onSubmit={handleSubmit}>
            <div className="input-field">
                <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"></path>
                </svg>
                <input
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    placeholder="Номер телефона" />
                {phone && (
                    <button type="button" className="clear-button" aria-label="Очистить" onClick={() => setPhone("")}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6 6 18"></path>
                        </svg>
                    </button>
                )}
            </div>
        </form>
    )

}