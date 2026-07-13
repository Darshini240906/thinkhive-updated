import { create } from "zustand";
import toast from "react-hot-toast";
import { deleteDocument, getDocuments, uploadDocument, uploadYoutube } from "../services/api";
export const useDocumentStore = create((set, get) => ({
  documents: [], isLoading: false,
  async fetch() { set({ isLoading: true }); try { set({ documents: await getDocuments() || [], isLoading: false }); } catch { set({ isLoading: false }); } },
  async upload(file, cls, language) { try { const r = await uploadDocument(file, cls, language); toast.success(`${file.name} indexed`); await get().fetch(); return r; } catch (e) { toast.error(e?.response?.data?.detail || "Upload failed"); throw e; } },
  async addYoutube(url, cls, language) { try { const r = await uploadYoutube(url, cls, language); toast.success(`${r.document.filename} indexed`); await get().fetch(); return r; } catch (e) { toast.error(e?.response?.data?.detail || "Could not process that video"); throw e; } },
  async remove(id) { try { await deleteDocument(id); set({ documents: get().documents.filter(d => d.id !== id) }); toast.success("Deleted"); } catch { toast.error("Delete failed"); } },
}));