import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Hammer, PaintRoller, Home as HomeIcon, Wrench } from "lucide-react";
import { company, services, heroImage, aboutImage, galleryImages } from "@/lib/data";

const SERVICE_ICONS = {
  renovering: HomeIcon,
  malning: PaintRoller,
  taklaggning: Hammer,
  rivning: Wrench,
};

export default function Home() {
  const featuredGallery = galleryImages.slice(0, 6);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative bg-stone-900 text-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Treborg Bygg arbete i Skåne"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/65 to-stone-900/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-32 lg:pt-40 lg:pb-44">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-8 animate-fade-up">
              Sedan {company.founded} · Trelleborg · Skåne
            </div>
            <h1
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[0.95] text-balance text-white animate-fade-up"
              data-testid="hero-title"
              style={{ animationDelay: "0.1s" }}
            >
              {company.tagline}
            </h1>
            <p
              className="mt-8 text-lg lg:text-xl text-stone-300 max-w-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {company.intro} Trygga bygglösningar för hem och företag — från
              första skiss till färdigt projekt.
            </p>
            <div
              className="mt-10 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-7 py-4 font-display font-medium transition-colors"
                data-testid="hero-cta-primary"
              >
                Begär kostnadsfri offert
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/galleri"
                className="inline-flex items-center gap-2 border-2 border-stone-50 text-stone-50 hover:bg-stone-50 hover:text-stone-900 px-7 py-4 font-display font-medium transition-colors"
                data-testid="hero-cta-secondary"
              >
                Se våra projekt
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div
            className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-stone-700/60 pt-10 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { num: new Date().getFullYear() - company.founded + "+", label: "År av hantverk" },
              { num: "100+", label: "Genomförda projekt" },
              { num: "2", label: "Stora samarbetspartners" },
              { num: "Skåne", label: "Vårt arbetsfält" },
            ].map((s) => (
              <div key={s.label} data-testid={`hero-stat-${s.label}`}>
                <div className="font-display font-bold text-3xl lg:text-4xl text-white">
                  {s.num}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-stone-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
                01 — Våra tjänster
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-stone-900 leading-[1.05]">
                Trygga bygglösningar för hem och företag.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <p className="text-stone-600 text-lg leading-relaxed">
                Allt under ett tak — från första rivning till sista
                penseldraget. Vi samordnar, planerar och levererar med samma
                noggrannhet oavsett storlek på projektet.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.slug] || HomeIcon;
              return (
                <Link
                  key={s.slug}
                  to={`/tjanster/${s.slug}`}
                  className="group bg-stone-50 hover:bg-white p-8 transition-colors flex flex-col"
                  data-testid={`service-card-${s.slug}`}
                >
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-stone-200">
                    <img
                      src={s.cover}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2 font-semibold">
                        0{i + 1}
                      </div>
                      <h3 className="font-display font-bold text-2xl text-stone-900 tracking-tight">
                        {s.name}
                      </h3>
                    </div>
                    <Icon className="w-6 h-6 text-amber-700 mt-2 shrink-0" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 text-stone-600 text-sm leading-relaxed flex-1">
                    {s.tagline}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-stone-900 font-medium text-sm">
                    Läs mer
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT split */}
      <section className="bg-white py-24 lg:py-32 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Treborg Bygg på arbetsplatsen"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-6 max-w-[200px]">
                <div className="font-display font-black text-4xl leading-none">
                  {new Date().getFullYear() - company.founded}+
                </div>
                <div className="text-xs uppercase tracking-[0.18em] mt-3">
                  År av hantverk i Skåne
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
              02 — Om oss
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter text-stone-900 leading-[1.05] mb-8">
              Vi håller alltid vad vi lovar.
            </h2>
            <div className="space-y-5 text-stone-700 text-lg leading-relaxed">
              <p>{company.longAbout[0]}</p>
              <p>{company.longAbout[1]}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">
              {company.takeOn.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <span className="text-stone-900 font-medium">{t}</span>
                </div>
              ))}
            </div>

            <Link
              to="/om-oss"
              className="mt-10 inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-6 py-3 font-display font-medium transition-colors"
              data-testid="home-about-cta"
            >
              Mer om Treborg Bygg
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS / TRUST */}
      <section className="bg-stone-900 text-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-5">
                03 — Förtroende
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter leading-[1.05]">
                Stora entreprenader litar på oss.
              </h2>
              <p className="mt-6 text-stone-400 leading-relaxed">
                Vi har långvariga samarbeten med några av Sveriges största
                byggbolag. Bland annat har vi arbetat med Peab på The Edge i
                Hyllie och nya Domstolen i Malmö.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              {company.partners.map((p) => (
                <div
                  key={p}
                  className="border border-stone-700 p-10 flex items-center justify-center"
                  data-testid={`partner-${p.toLowerCase()}`}
                >
                  <div className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-stone-50">
                    {p}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-stone-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
                04 — Galleri
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-stone-900 leading-[1.05]">
                Hantverk, projekt för projekt.
              </h2>
            </div>
            <Link
              to="/galleri"
              className="inline-flex items-center gap-2 text-stone-900 font-display font-medium hover:text-amber-700 transition-colors"
              data-testid="home-gallery-cta"
            >
              Se hela galleriet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {featuredGallery.map((img, i) => (
              <Link
                key={img.id}
                to="/galleri"
                className={`group relative overflow-hidden bg-stone-200 ${
                  i === 0 ? "row-span-2 col-span-2 md:col-span-2 aspect-square md:aspect-auto" : "aspect-square"
                }`}
                data-testid={`home-gallery-tile-${img.id}`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/0 to-stone-900/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs uppercase tracking-[0.18em] text-amber-400 font-semibold">
                    {img.category}
                  </div>
                  <div className="font-display font-bold text-white text-lg">
                    {img.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-5">
                Redo att starta?
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.05]">
                Berätta om ditt projekt — vi återkommer inom 24 timmar.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-8 py-5 font-display font-medium text-lg transition-colors"
                data-testid="home-bottom-cta"
              >
                Kontakta oss
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
