import { useEffect } from "react";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

export default function ChatSidebar() {
  const { conversations, activeConversationId, loadConversations, openConversation, newChat, removeConversation } = useChatStore();

  useEffect(() => { loadConversations(); }, []);

  return (
    <div className="flex h-full w-64 flex-shrink-0 flex-col border-r border-border bg-surface">
      <div className="p-3">
        <button
          onClick={newChat}
          className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-cream hover:border-gold/40 hover:bg-white/5 transition-colors"
        >
          <Plus size={15} /> New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
        {conversations.length === 0 && (
          <p className="px-3 py-2 text-xs text-rose-muted/60">No conversations yet</p>
        )}
        {conversations.map(c => (
          <div
            key={c.id}
            onClick={() => openConversation(c.id)}
            className={`group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors
              ${activeConversationId === c.id ? "bg-gold/15 text-cream" : "text-rose-muted hover:bg-white/5 hover:text-cream"}`}
          >
            <MessageSquare size={14} className="flex-shrink-0" />
            <span className="flex-1 truncate">{c.title}</span>
            <button
              onClick={e => { e.stopPropagation(); removeConversation(c.id); }}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-rose-muted hover:text-danger transition-opacity"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        <p className="px-3 pt-2 text-xs text-rose-muted/50">Keeping your 5 most recent chats</p>
      </div>
    </div>
  );
}