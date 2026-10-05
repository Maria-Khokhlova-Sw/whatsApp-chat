import './App.css'
import LoginForm from "./components/LoginForm.tsx";
import {useState} from "react";
import type {Chat, Credentials, Message} from "./types";
import {toChatId} from "./utils/phone.ts";
import Sidebar from "./components/Sidebar.tsx";
import ChatWindow from "./components/ChatWindow.tsx";
import {sendMessage} from "./api/greenApi.ts";

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

    const addMessage =(chatId: string, msg: Message) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat.chatId === chatId
                    ? { ...chat, message: [...chat.message, msg] }
                    : chat
            )
        )
    }

    const handleSend = async (text: string) => {
        if (!credentials || !activeChat) return;

        try {
            const result = await sendMessage(credentials, activeChat, text);
            addMessage(activeChat, {
                id: result.idMessage,
                message: text,
                direction: 'outgoing',
                timestamp: Math.floor(Date.now() / 1000),
            });
        } catch {
            alert('Не удалось отправить сообщение');
        }
    };

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
                    <ChatWindow chat={activeChatObj} onSend={handleSend}/>
                ) : (
                    <div>Выберите чат или создайте новый</div>
                )}
            </main>
        </div>
    );
}

export default App
