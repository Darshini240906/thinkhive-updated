import { useState } from "react";
import { ClipboardList, Download, FileText, Lightbulb, Loader2, Presentation, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { generateReport } from "../services/api";

const REPORT_TYPES = [
  { id: "executive_summary", label: "Executive summary", description: "Leadership-ready overview", icon: Presentation },
  { id: "technical_summary", label: "Technical summary", description: "Scope, architecture and risks", icon: FileText },
  { id: "action_items", label: "Action items", description: "Decisions, owners and next steps", icon: ClipboardList },
  { id: "research_insights", label: "Research insights", description: "Findings and implications", icon: Lightbulb },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState("executive_summary");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  function downloadReport() {
    if (!report) return;
    const sources = report.sources?.length
      ? `\n\n## Sources\n\n${report.sources.map(source => `- ${source.document_name}${source.page_number ? ` (page ${source.page_number})` : ""}`).join("\n")}`
      : "";
    const file = new Blob([
      `# ${report.title}\n\n_Report type: ${report.report_type_label}_\n\n${report.report}${sources}\n`,
    ], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "thinkhive-report"}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function submit(event) {
    event.preventDefault();
    if (!topic.trim() && !content.trim()) {
      toast.error("Add a knowledge-base topic or paste your notes.");
      return;
    }
    setLoading(true);
    try {
      const response = await generateReport({
        topic: topic.trim(), content: content.trim(), report_type: reportType,
      });
      setReport(response);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Could not generate the report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-gold"><Sparkles size={16} /> AI reporting</p>
          <h1 className="font-display text-3xl font-bold text-cream">Reports & summaries</h1>
          <p className="mt-1 text-rose-muted">Turn knowledge-base documents or meeting notes into grounded, shareable reports.</p>
        </div>
        {report && <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm text-gold">{report.source_count} source{report.source_count === 1 ? "" : "s"} used</span>}
      </div>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold text-cream">Create a report</h2>
          <p className="mt-1 text-sm text-rose-muted">Choose an outcome, then provide a topic, notes, or both.</p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {REPORT_TYPES.map(({ id, label, description, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setReportType(id)}
                className={`rounded-xl border p-3 text-left transition-colors ${reportType === id ? "border-gold bg-gold/10" : "border-border hover:border-gold/35"}`}>
                <Icon size={17} className={reportType === id ? "text-gold" : "text-rose-muted"} />
                <p className="mt-2 text-sm font-semibold text-cream">{label}</p>
                <p className="mt-0.5 text-xs text-rose-muted">{description}</p>
              </button>
            ))}
          </div>

          <label className="mt-5 block text-sm font-medium text-cream">Knowledge-base topic <span className="font-normal text-rose-muted">(optional)</span></label>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Q3 product launch risks"
            className="mt-2 w-full rounded-xl border border-border bg-base px-3 py-2.5 text-sm text-cream placeholder:text-rose-muted/60 outline-none focus:border-gold/50" />

          <label className="mt-4 block text-sm font-medium text-cream">Meeting notes or source text <span className="font-normal text-rose-muted">(optional)</span></label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} placeholder="Paste meeting notes, an interview transcript, or document text here…"
            className="mt-2 w-full resize-y rounded-xl border border-border bg-base px-3 py-2.5 text-sm text-cream placeholder:text-rose-muted/60 outline-none focus:border-gold/50" />
          <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-base-deep transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-55">
            {loading ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={17} />}
            {loading ? "Generating report…" : "Generate report"}
          </button>
        </form>

        <section className="min-h-[480px] rounded-2xl border border-border bg-surface p-5">
          {!report ? (
            <div className="flex h-full min-h-[430px] flex-col items-center justify-center text-center">
              <div className="rounded-2xl bg-gold/10 p-4 text-gold"><Sparkles size={28} /></div>
              <h2 className="mt-4 font-display text-xl font-bold text-cream">Your generated report will appear here</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-rose-muted">Reports are grounded in the source text and knowledge-base documents you provide.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{report.report_type_label}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-cream">{report.title}</h2>
                </div>
                <button type="button" onClick={downloadReport} className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-cream transition-colors hover:border-gold/40 hover:text-gold">
                  <Download size={15} /> Download
                </button>
              </div>
              <article className="whitespace-pre-wrap break-words py-5 text-sm leading-7 text-rose-muted">{report.report}</article>
              {report.sources?.length > 0 && <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold text-cream">Sources</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {report.sources.map((source, index) => <span key={`${source.document_id}-${index}`} className="rounded-lg bg-base px-2.5 py-1 text-xs text-rose-muted">{source.document_name}{source.page_number ? ` · p.${source.page_number}` : ""}</span>)}
                </div>
              </div>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}