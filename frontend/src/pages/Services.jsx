import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <div data-testid="services-page">
      {/* HEADER */}
      <section className="bg-stone-900 text-stone-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-6">
            Våra tjänster
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-white max-w-4xl">
            Allt du behöver — från idé till färdigt resultat.
          </h1>
          <p className="mt-8 text-stone-400 text-lg max-w-2xl leading-relaxed">
            Vi erbjuder kompletta byggtjänster i Skåne. Klicka på en tjänst för
            att läsa mer eller skicka direkt en offertförfrågan.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-1">
          {services.map((s, idx) => (
            <Link
              key={s.slug}
              to={`/tjanster/${s.slug}`}
              className="group block border-t border-stone-300 last:border-b py-10 hover:bg-white transition-colors"
              data-testid={`services-list-${s.slug}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                <div className="md:col-span-1 font-display font-bold text-2xl text-stone-400">
                  0{idx + 1}
                </div>
                <div className="md:col-span-4">
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-stone-900 group-hover:text-amber-700 transition-colors">
                    {s.name}
                  </h2>
                </div>
                <div className="md:col-span-5">
                  <p className="text-stone-600 leading-relaxed">{s.tagline}</p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <div className="inline-flex items-center gap-2 font-display font-medium text-stone-900">
                    Läs mer
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
              <div className="mt-6 md:ml-[8.33%] grid grid-cols-3 gap-2 md:gap-3 md:max-w-2xl">
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src={s.cover}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {s.bullets.slice(0, 2).map((b, i) => (
                  <div
                    key={i}
                    className="hidden md:flex aspect-[4/3] bg-stone-100 border border-stone-200 p-5 items-end"
                  >
                    <div className="font-display font-medium text-stone-900 text-sm leading-tight">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
