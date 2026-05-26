import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { company, aboutImage } from "@/lib/data";

export default function About() {
  return (
    <div data-testid="about-page">
      <section className="bg-stone-900 text-stone-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-6">
              Om oss
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95]">
              Treborg Bygg.
              <br />
              Sedan {company.founded}.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-stone-400 leading-relaxed text-lg">
              Ett komplett byggföretag i Trelleborg som utför jobb runt om i
              Skåne — med fokus på kvalitet, hantverk och kundnöjdhet.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <img
              src={aboutImage}
              alt="Treborg Bygg arbete"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="mt-6 bg-stone-900 text-stone-50 p-6">
              <div className="font-display font-black text-3xl">
                {new Date().getFullYear() - company.founded}+
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400 mt-2">
                År av hantverk i Skåne
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
              Vår historia
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-stone-900 mb-8 leading-[1.1]">
              Hantverk som håller — på riktigt.
            </h2>
            <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
              {company.longAbout.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
                Vi tar uppdrag inom
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.takeOn.map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 bg-white border border-stone-200 p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                    <span className="text-stone-900 font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
            Samarbetspartners
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-stone-900 mb-10 max-w-2xl leading-tight">
            Stora entreprenader litar på oss.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {company.partners.map((p) => (
              <div
                key={p}
                className="border border-stone-300 p-10 flex items-center justify-center bg-stone-50"
              >
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-stone-900">
                  {p}
                </div>
              </div>
            ))}
            <div className="border border-stone-300 p-10 flex items-center justify-center text-center bg-stone-50">
              <div className="text-sm text-stone-600 leading-snug">
                Och fasta partners inom <br />
                <span className="font-semibold text-stone-900">VVS, El och Måleri</span>
              </div>
            </div>
            <div className="border border-stone-300 p-10 flex items-center justify-center text-center bg-stone-50">
              <div className="text-sm text-stone-600 leading-snug">
                Bland projekt: <br />
                <span className="font-semibold text-stone-900">The Edge Hyllie · Domstolen Malmö</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 text-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter max-w-xl leading-tight">
            Har du ett projekt på gång? Vi lyssnar gärna.
          </h2>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-7 py-4 font-display font-medium transition-colors"
            data-testid="about-cta"
          >
            Kontakta oss
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
