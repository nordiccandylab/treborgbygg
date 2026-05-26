import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center" data-testid="not-found-page">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold mb-6">
          404 — Sidan hittades inte
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter text-stone-900 leading-[0.95]">
          Här fanns inget bygge.
        </h1>
        <p className="mt-6 text-stone-600 text-lg">
          Sidan du letar efter finns inte eller har flyttats.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-7 py-4 font-display font-medium transition-colors"
          data-testid="notfound-cta"
        >
          Tillbaka till startsidan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
