import { useEffect, useState } from "react";
import { Plus, FolderOpen, Loader2 } from "lucide-react";
import DomainCard from "../components/Domains/DomainCard";
import CreateDomainModal from "../components/Domains/CreateDomainModal";
import DomainMembersModal from "../components/Domains/DomainMembersModal";
import { useDomainStore } from "../store/useDomainStore";

export default function DomainsPage() {
  const { domains, isLoading, fetch } = useDomainStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  useEffect(() => { fetch(); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Domains</h1>
          <p className="mt-1 text-rose-muted">Organise your knowledge base into separate domains per team or department</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-base-deep hover:bg-gold-light transition-colors"
        >
          <Plus size={16} /> New Domain
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-rose-muted">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading...
        </div>
      ) : domains.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <FolderOpen size={40} className="mb-3 text-rose-muted/40" />
          <p className="text-rose-muted mb-4">No domains yet. Create your first domain to organise your knowledge base.</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-base-deep hover:bg-gold-light transition-colors"
          >
            <Plus size={15} /> Create First Domain
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <div key={d.id} className="stagger-item" style={{ animationDelay: `${i * 60}ms` }}>
              <DomainCard domain={d} onSelect={() => setSelectedDomain(d)} />
            </div>
          ))}
        </div>
      )}

      {showModal && <CreateDomainModal onClose={() => { setShowModal(false); fetch(); }} />}
      {selectedDomain && <DomainMembersModal domain={selectedDomain} onClose={() => setSelectedDomain(null)} />}
    </div>
  );
}