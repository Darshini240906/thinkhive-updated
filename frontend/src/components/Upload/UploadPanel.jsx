import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, CheckCircle, Loader2 } from "lucide-react";
import { useDocumentStore } from "../../store/useDocumentStore";

const CLASSIFICATIONS = ["public", "internal", "confidential"];

export default function UploadPanel() {
  const { upload } = useDocumentStore();
  const [files, setFiles] = useState([]);
  const [classification, setClassification] = useState("internal");
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(accepted => {
    setFiles(prev => [...prev, ...accepted.map(f => ({ file: f, status: "pending" }))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 25 * 1024 * 1024,
  });

  async function handleUpload() {
    if (!files.filter(f => f.status === "pending").length) return;
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== "pending") continue;
      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "uploading" } : f));
      try {
        await upload(files[i].file, classification);
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "done" } : f));
      } catch {
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "error" } : f));
      }
    }
    setUploading(false);
  }

  const STATUS_ICON = {
    pending: <div className="h-4 w-4 rounded-full border-2 border-border" />,
    uploading: <Loader2 size={14} className="animate-spin text-gold" />,
    done: <CheckCircle size={14} className="text-success" />,
    error: <X size={14} className="text-danger" />,
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors
          ${isDragActive ? "border-gold bg-gold/5" : "border-border hover:border-gold/40 hover:bg-white/[0.02]"}`}
      >
        <input {...getInputProps()} />
        <Upload size={32} className={`mx-auto mb-3 transition-transform ${isDragActive ? "text-gold scale-110" : "text-rose-muted"}`} />
        <p className="text-sm font-medium text-cream">{isDragActive ? "Drop files here" : "Drag & drop files, or click to browse"}</p>
        <p className="mt-1 text-xs text-rose-muted">PDF, DOCX, TXT, PNG, JPG · Max 25MB each</p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-rose-muted whitespace-nowrap">Classification:</label>
        <select
          value={classification}
          onChange={e => setClassification(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-cream focus:border-gold focus:outline-none capitalize"
        >
          {CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div
              key={i}
              className="stagger-item flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <FileText size={16} className="text-rose-muted flex-shrink-0" />
              <span className="flex-1 truncate text-sm text-cream">{f.file.name}</span>
              <span className="text-xs text-rose-muted">{(f.file.size / 1024).toFixed(0)}KB</span>
              {STATUS_ICON[f.status]}
              {f.status === "pending" && (
                <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-muted hover:text-danger transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleUpload}
            disabled={uploading || !files.some(f => f.status === "pending")}
            className="w-full rounded-xl bg-gold py-3 text-sm font-semibold text-base-deep hover:bg-gold-light disabled:opacity-40 transition-colors"
          >
            {uploading ? "Uploading & Indexing..." : `Upload ${files.filter(f => f.status === "pending").length} file(s)`}
          </button>
        </div>
      )}
    </div>
  );
}