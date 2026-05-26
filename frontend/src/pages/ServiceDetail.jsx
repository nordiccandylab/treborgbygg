import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services, galleryImages, quoteMailto } from "@/lib/data";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/tjanster" replace />;
  }

  const related = galleryImages
    .filter((g) => g.category.toLowerCase().includes(service.shortName.toLowerCase()))
    .slice(0, 4);

  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <div data-testid={`service-detail-${slug}`}>
      <section className="relative bg-stone-900 text-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.cover}
            alt={service.name}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/70 to-stone-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-6">
            Tjänst
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-white max-w-3xl">
            {service.name}
          </h1>
          <p className="mt-8 text-xl text-stone-200 max-w-2xl leading-relaxed">
            {service.tagline}
          </p>
        </div>
      </section>

      <section className="bg-stone-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
              Om tjänsten
            </div>
            <p className="font-display font-medium text-2xl sm:text-3xl text-stone-900 tracking-tight leading-[1.2] mb-10">
              {service.description}
            </p>
            <div className="space-y-5 text-stone-700 leading-relaxed text-lg">
              {service.long.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <div className="bg-white border border-stone-200 p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
                Vi hjälper dig med
              </div>
              <ul className="space-y-4">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                    <span className="text-stone-900 font-medium">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={quoteMailto}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-6 py-4 font-display font-medium transition-colors"
                data-testid="service-detail-cta"
              >
                Kontakta oss för en kostnadsfri offert
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white border-y border-stone-200 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6 mb-10">
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-stone-900">
                Projekt inom {service.name.toLowerCase()}
              </h2>
              <Link
                to="/galleri"
                className="hidden md:inline-flex items-center gap-2 text-stone-900 font-display font-medium hover:text-amber-700 transition-colors"
              >
                Se galleriet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {related.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden bg-stone-200"
                  data-testid={`service-gallery-${img.id}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
            Andra tjänster
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/tjanster/${s.slug}`}
                className="group bg-white border border-stone-200 hover:border-amber-700 p-6 transition-colors flex items-start justify-between gap-4"
                data-testid={`related-service-${s.slug}`}
              >
                <div>
                  <h3 className="font-display font-bold text-2xl text-stone-900 tracking-tight group-hover:text-amber-700 transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-stone-600 text-sm">{s.tagline}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-stone-400 group-hover:text-amber-700 transition-colors mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
