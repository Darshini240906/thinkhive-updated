import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatWindow from "../components/Chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 min-w-0">
        <ChatWindow />
      </div>
    </div>
  );
}