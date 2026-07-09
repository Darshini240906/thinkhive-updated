/*import { NavLink, useNavigate } from "react-router-dom";
import { Brain, LayoutDashboard, MessageSquare, FileText, Search, Users, Settings, FolderOpen, LogOut, Globe } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/chat", icon: MessageSquare, label: "AI Assistant" },
  { to: "/documents", icon: FileText, label: "Documents" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/domains", icon: FolderOpen, label: "Domains" },
  { to: "/hr", icon: Users, label: "HR & Members" },
  { to: "/admin", icon: Settings, label: "Admin" },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-[#1C2540] bg-[#0D1220]">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-[#1C2540]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F8EF7]">
          <Brain size={16} className="text-white" />
        </div>
        <span className="text-base font-bold text-white">Think<span className="text-[#4F8EF7]">Hive</span></span>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
            ${isActive ? "bg-[#4F8EF7]/15 text-[#4F8EF7]" : "text-white/50 hover:bg-white/5 hover:text-white/80"}`}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-[#1C2540] p-4">
        <div className="mb-3 rounded-xl bg-[#131929] px-3 py-2.5">
          <p className="text-sm font-medium text-white truncate">{user?.full_name || "User"}</p>
          <p className="text-xs text-white/40 capitalize">{user?.role?.replace(/_/g, " ") || "Guest"}</p>
        </div>
        <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/40 hover:bg-white/5 hover:text-red-400 transition">
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}
*/

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain, LayoutDashboard, MessageSquare, FileText, Search, Users, Settings, FolderOpen, LogOut, BrainCircuit, Shield } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/chat", icon: MessageSquare, label: "AI Assistant" },
  { to: "/documents", icon: FileText, label: "Documents" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/domains", icon: FolderOpen, label: "Domains" },
  { to: "/hr", icon: Users, label: "HR" },
  { to: "/knowledge-map", icon: BrainCircuit, label: "Knowledge Map" },
  { to: "/admin", icon: Shield, label: "Admin" },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`flex h-full flex-shrink-0 flex-col border-r border-border bg-base-deep transition-all duration-300 ease-out
        ${expanded ? "w-60" : "w-[84px]"}`}
    >
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gold">
          <Brain size={18} className="text-base-deep" />
        </div>
        {expanded && (
          <span className="font-display text-lg font-bold text-cream whitespace-nowrap animate-fade-in">
            Think<span className="text-gold">Hive</span>
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors
              ${isActive ? "bg-gold/15 text-gold" : "text-rose-muted hover:bg-white/5 hover:text-cream"}`
            }
          >
            <Icon size={19} className="flex-shrink-0" />
            {expanded && <span className="whitespace-nowrap animate-fade-in">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={() => navigate("/settings")}
          className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-rose-muted hover:bg-white/5 hover:text-cream transition-colors"
        >
          <Settings size={19} className="flex-shrink-0" />
          {expanded && <span className="whitespace-nowrap animate-fade-in">Settings</span>}
        </button>

        <div className={`flex items-center gap-3 px-3 py-2 ${expanded ? "" : "justify-center"}`}>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-base-deep">
            {(user?.full_name || "U").split(" ").map(n => n[0]).slice(0,2).join("")}
          </div>
          {expanded && (
            <div className="min-w-0 animate-fade-in">
              <p className="truncate text-sm font-medium text-cream">{user?.full_name || "User"}</p>
              <p className="truncate text-xs text-rose-muted capitalize">{user?.role?.replace(/_/g, " ") || "Guest"}</p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-muted hover:bg-danger/10 hover:text-danger transition-colors"
        >
          <LogOut size={17} className="flex-shrink-0" />
          {expanded && <span className="whitespace-nowrap animate-fade-in">Log out</span>}
        </button>
      </div>
    </aside>
  );
}