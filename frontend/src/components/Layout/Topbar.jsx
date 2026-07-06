import { useLocation, Link } from "react-router-dom";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "../../context/ThemeContext";

const LABELS = {
  dashboard: "Overview", chat: "AI Assistant", documents: "Documents",
  search: "Search", domains: "Domains", hr: "HR", "knowledge-map": "Knowledge Map", admin: "Admin",
};

export default function Topbar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const segment = location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  const label = LABELS[segment] || segment;

  return (
    <header className="flex items-center justify-between border-b border-border bg-base px-8 py-4">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/dashboard" className="text-rose-muted hover:text-cream transition-colors">Dashboard</Link>
        <span className="text-rose-muted">›</span>
        <span className="font-medium text-cream">{label}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-rose-muted">
          <Search size={15} />
          <span>Search...</span>
          <kbd className="ml-3 rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
        </div>

        <button className="relative text-rose-muted hover:text-cream transition-colors">
          <Bell size={18} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        <button
          onClick={toggleTheme}
          className="flex h-6 w-11 items-center rounded-full bg-surface-hover px-0.5 transition-colors"
        >
          <div className={`flex h-5 w-5 items-center justify-center rounded-full bg-gold transition-transform ${isDark ? "translate-x-0" : "translate-x-5"}`}>
            {isDark ? <Moon size={11} className="text-base-deep" /> : <Sun size={11} className="text-base-deep" />}
          </div>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-xs font-bold text-base-deep">
          {(user?.full_name || "U").split(" ").map(n => n[0]).slice(0,2).join("")}
        </div>
      </div>
    </header>
  );
}