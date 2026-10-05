import './App.css'
import LoginForm from "./components/LoginForm.tsx";
import {useState} from "react";
import type {Chat, Credentials} from "./types";
import {toChatId} from "./utils/phone.ts";
import Sidebar from "./components/Sidebar.tsx";

function App() {
    const [credentials, setCredentials] = useState<Credentials | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<string  | null>(null);

    const handleCreateChat = (phone: string) => {
        const chatId = toChatId(phone);
        if(!chatId){
            alert('Неверный номер телефона');
            return;
        }
        if(!chats.some(chat => chat.chatId === chatId)){
            setChats((prev) => [...prev,{ chatId: chatId, phone: chatId.replace('@c.us', ''), message: [] }]);
        }
        setActiveChat(chatId);
    };

    const activeChatObj = chats.find((chat) => chat.chatId === activeChat);

    if (!credentials) {
        return <LoginForm onLogin={setCredentials}/>;
    }
    return (
        <div className="app">
            <Sidebar
                chats={chats}
                activeChat={activeChat}
                onSelected={setActiveChat}
                onCreate={handleCreateChat}
            />
            <main className="chat-area">
                {activeChatObj ? (
                    <div>Чат с +{activeChatObj.phone}</div>
                ) : (
                    <div>Выберите чат или создайте новый</div>
                )}
            </main>
        </div>
    );
}

export default App
