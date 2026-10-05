import type {Chat} from "../types";
import NewChatForm from "./NewChatForm";

type SidebarProps = {
    chats: Chat[];
    activeChat: string | null;
    onSelected: (chatId: string) => void;
    onCreate: (phone: string) => void;
}

export default function Sidebar( {chats, activeChat, onSelected, onCreate }: SidebarProps) {
    return (
        <aside className="sidebar">
            <NewChatForm onCreate={onCreate}/>
            <ul className="chat-list">
                {chats.map((chat) => (
                    <li
                        key={chat.chatId}
                        className={chat.chatId === activeChat ? 'active' : ''}
                        onClick={() => onSelected(chat.chatId)}
                    >
                        +{chat.phone}
                    </li>
                ))}
            </ul>
        </aside>
    )
}