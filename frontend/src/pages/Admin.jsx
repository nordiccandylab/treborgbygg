import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Trash2, Mail, Phone, Building2, Loader2 } from "lucide-react";
import { listQuotes, updateQuoteStatus, deleteQuote } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = ["ny", "kontaktad", "klar"];

const STATUS_COLORS = {
  ny: "bg-amber-700 text-white",
  kontaktad: "bg-stone-700 text-white",
  klar: "bg-emerald-700 text-white",
};

const formatDate = (s) => {
  try {
    const d = new Date(s);
    return d.toLocaleString("sv-SE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return s;
  }
};

export default function Admin() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Alla");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await listQuotes();
      setQuotes(data);
    } catch {
      toast.error("Kunde inte ladda offertförfrågningar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onStatusChange = async (id, status) => {
    try {
      const updated = await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
      toast.success("Status uppdaterad.");
    } catch {
      toast.error("Kunde inte uppdatera status.");
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Ta bort denna förfrågan?")) return;
    try {
      await deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      toast.success("Förfrågan borttagen.");
    } catch {
      toast.error("Kunde inte ta bort förfrågan.");
    }
  };

  const filtered =
    filter === "Alla" ? quotes : quotes.filter((q) => q.status === filter);

  const counts = {
    Alla: quotes.length,
    ny: quotes.filter((q) => q.status === "ny").length,
    kontaktad: quotes.filter((q) => q.status === "kontaktad").length,
    klar: quotes.filter((q) => q.status === "klar").length,
  };

  return (
    <div data-testid="admin-page" className="bg-stone-50 min-h-screen">
      <section className="bg-stone-900 text-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-4">
              Admin · Intern
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tighter leading-[0.95]">
              Offertförfrågningar
            </h1>
            <p className="mt-3 text-stone-400">
              {quotes.length} förfrågningar totalt
            </p>
          </div>
          <button
            type="button"
            onClick={fetchAll}
            className="inline-flex items-center gap-2 border border-stone-50 text-stone-50 hover:bg-stone-50 hover:text-stone-900 px-5 py-3 font-display font-medium transition-colors self-start sm:self-end"
            data-testid="admin-refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Uppdatera
          </button>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50 sticky top-20 lg:top-24 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-wrap gap-2">
          {["Alla", ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              data-testid={`admin-filter-${s}`}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-display font-semibold border transition-colors ${
                filter === s
                  ? "bg-stone-900 border-stone-900 text-stone-50"
                  : "bg-transparent border-stone-300 text-stone-700 hover:border-stone-900"
              }`}
            >
              {s} ({counts[s] || 0})
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-stone-500">
            <Loader2 className="w-6 h-6 animate-spin mr-3" />
            Laddar...
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-stone-500 bg-white border border-stone-200"
            data-testid="admin-empty"
          >
            Inga förfrågningar i denna kategori.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <article
                key={q.id}
                className="bg-white border border-stone-200 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6"
                data-testid={`admin-quote-${q.id}`}
              >
                <div className="lg:col-span-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-1">
                    {formatDate(q.created_at)}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-stone-900 tracking-tight">
                    {q.namn}
                  </h3>
                  {q.foretag && (
                    <div className="mt-1 flex items-center gap-2 text-stone-600 text-sm">
                      <Building2 className="w-4 h-4" />
                      {q.foretag}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <a
                      href={`mailto:${q.email}`}
                      className="inline-flex items-center gap-1.5 text-stone-700 hover:text-amber-700"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {q.email}
                    </a>
                    {q.telefon && (
                      <a
                        href={`tel:${q.telefon}`}
                        className="inline-flex items-center gap-1.5 text-stone-700 hover:text-amber-700"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {q.telefon}
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  {q.tjanst && (
                    <div className="inline-block text-[10px] uppercase tracking-[0.2em] bg-stone-100 text-stone-700 px-2 py-1 font-semibold mb-3">
                      {q.tjanst}
                    </div>
                  )}
                  <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                    {q.meddelande}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:text-right flex flex-col gap-3 lg:items-end">
                  <div
                    className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold ${STATUS_COLORS[q.status] || "bg-stone-700 text-white"}`}
                  >
                    {q.status}
                  </div>
                  <Select
                    value={q.status}
                    onValueChange={(v) => onStatusChange(q.id, v)}
                  >
                    <SelectTrigger
                      className="rounded-none w-full lg:w-44 bg-white border-stone-300"
                      data-testid={`admin-status-${q.id}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => onDelete(q.id)}
                    className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-red-600 transition-colors"
                    data-testid={`admin-delete-${q.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Ta bort
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
