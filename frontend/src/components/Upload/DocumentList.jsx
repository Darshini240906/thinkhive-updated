/*import { useEffect } from "react";
import { FileText, Trash2, RefreshCw, Shield, Clock, Zap } from "lucide-react";
import { useDocumentStore } from "../../store/useDocumentStore";

const TAG_COLORS = {
  new: "bg-emerald-500/20 text-emerald-400", recent: "bg-blue-500/20 text-blue-400",
  old: "bg-amber-500/20 text-amber-400", outdated: "bg-red-500/20 text-red-400",
  fresh: "bg-emerald-500/20 text-emerald-400", stale: "bg-amber-500/20 text-amber-400",
  expired: "bg-red-500/20 text-red-400", active: "bg-blue-500/20 text-blue-400",
  unused: "bg-gray-500/20 text-gray-400",
  public: "bg-green-500/20 text-green-400", internal: "bg-blue-500/20 text-blue-400",
  restricted: "bg-amber-500/20 text-amber-400", confidential: "bg-red-500/20 text-red-400",
};

function Tag({ label }) {
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[label] || "bg-white/10 text-white/50"}`}>{label}</span>;
}

export default function DocumentList() {
  const { documents, isLoading, fetch, remove } = useDocumentStore();
  useEffect(() => { fetch(); }, []);

  if (isLoading) return <div className="flex items-center justify-center py-12 text-white/40"><RefreshCw size={20} className="animate-spin mr-2" /> Loading...</div>;
  if (!documents.length) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileText size={40} className="mb-3 text-white/20" />
      <p className="text-white/50">No documents yet. Upload your first document above.</p>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-white/50">{documents.length} document{documents.length !== 1 ? "s" : ""}</p>
        <button onClick={fetch} className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60"><RefreshCw size={12} /> Refresh</button>
      </div>
      {documents.map(doc => (
        <div key={doc.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#131929] px-4 py-3 hover:border-white/20 transition group">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#4F8EF7]/10">
            <FileText size={17} className="text-[#4F8EF7]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">{doc.filename}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              <Tag label={doc.classification} />
              <Tag label={doc.age_tag} />
              <Tag label={doc.freshness_tag} />
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${doc.status === "ready" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                {doc.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <Zap size={11} /> {Math.round(doc.document_weight * 100)}%
          </div>
          <button onClick={() => remove(doc.id)} className="flex-shrink-0 rounded-lg p-1.5 text-white/20 hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import { FileText, FileSpreadsheet, FileType, Trash2, RefreshCw, Zap, LayoutGrid, List } from "lucide-react";
import { useDocumentStore } from "../../store/useDocumentStore";

const TAG_COLORS = {
  new: "bg-success/15 text-success", recent: "bg-gold/15 text-gold",
  old: "bg-warn/15 text-warn", outdated: "bg-danger/15 text-danger",
  fresh: "bg-success/15 text-success", stale: "bg-warn/15 text-warn",
  expired: "bg-danger/15 text-danger", active: "bg-gold/15 text-gold",
  unused: "bg-white/10 text-rose-muted",
  public: "bg-success/15 text-success", internal: "bg-gold/15 text-gold",
  confidential: "bg-danger/15 text-danger",
};

const EXT_STYLE = {
  pdf: { icon: FileType, color: "text-danger", bg: "bg-danger/15" },
  docx: { icon: FileText, color: "text-cream", bg: "bg-white/10" },
  doc: { icon: FileText, color: "text-cream", bg: "bg-white/10" },
  xlsx: { icon: FileSpreadsheet, color: "text-success", bg: "bg-success/15" },
  csv: { icon: FileSpreadsheet, color: "text-gold", bg: "bg-gold/15" },
  txt: { icon: FileText, color: "text-rose-muted", bg: "bg-white/10" },
};

function getExtStyle(filename = "") {
  const ext = filename.split(".").pop()?.toLowerCase();
  return EXT_STYLE[ext] || { icon: FileText, color: "text-rose-muted", bg: "bg-white/10" };
}

function Tag({ label }) {
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[label] || "bg-white/10 text-rose-muted"}`}>{label}</span>;
}

export default function DocumentList() {
  const { documents, isLoading, fetch, remove } = useDocumentStore();
  const [view, setView] = useState("grid");
  useEffect(() => { fetch(); }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-rose-muted">
        <RefreshCw size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText size={40} className="mb-3 text-rose-muted/40" />
        <p className="text-rose-muted">No documents yet. Upload your first document above.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-rose-muted">{documents.length} document{documents.length !== 1 ? "s" : ""}</p>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border bg-base p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-1.5 transition-colors ${view === "grid" ? "bg-gold text-base-deep" : "text-rose-muted hover:text-cream"}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-1.5 transition-colors ${view === "list" ? "bg-gold text-base-deep" : "text-rose-muted hover:text-cream"}`}
            >
              <List size={14} />
            </button>
          </div>
          <button onClick={fetch} className="flex items-center gap-1 text-xs text-rose-muted hover:text-cream transition-colors">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {documents.map((doc, i) => {
            const { icon: Icon, color, bg } = getExtStyle(doc.filename);
            return (
              <div
                key={doc.id}
                className="stagger-item group rounded-2xl border border-border bg-surface p-5 hover:border-gold/30 transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                    <Icon size={20} className={color} />
                  </div>
                  <button
                    onClick={() => remove(doc.id)}
                    className="rounded-lg p-1.5 text-rose-muted opacity-0 group-hover:opacity-100 hover:bg-danger/10 hover:text-danger transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="mt-3 truncate font-display font-semibold text-cream">{doc.filename}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Tag label={doc.classification} />
                  <Tag label={doc.freshness_tag} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${doc.status === "ready" ? "bg-success/15 text-success" : "bg-warn/15 text-warn"}`}>
                    {doc.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-rose-muted">
                    <Zap size={11} /> {Math.round((doc.document_weight || 0) * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map((doc, i) => {
            const { icon: Icon, color, bg } = getExtStyle(doc.filename);
            return (
              <div
                key={doc.id}
                className="stagger-item group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 hover:border-gold/30 transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${bg}`}>
                  <Icon size={17} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-cream">{doc.filename}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Tag label={doc.classification} />
                    <Tag label={doc.age_tag} />
                    <Tag label={doc.freshness_tag} />
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${doc.status === "ready" ? "bg-success/15 text-success" : "bg-warn/15 text-warn"}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-rose-muted">
                  <Zap size={11} /> {Math.round((doc.document_weight || 0) * 100)}%
                </div>
                <button
                  onClick={() => remove(doc.id)}
                  className="flex-shrink-0 rounded-lg p-1.5 text-rose-muted/50 hover:bg-danger/10 hover:text-danger opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}