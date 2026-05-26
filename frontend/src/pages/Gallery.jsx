import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";

export default function Gallery() {
  const [activeCat, setActiveCat] = useState("Alla");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = useMemo(
    () =>
      activeCat === "Alla"
        ? galleryImages
        : galleryImages.filter((g) => g.category === activeCat),
    [activeCat]
  );

  // Keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft")
        setLightboxIdx((i) => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, filtered.length]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div data-testid="gallery-page">
      <section className="bg-stone-900 text-stone-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-6">
            Galleri
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] max-w-4xl">
            Projekt vi är stolta över.
          </h1>
          <p className="mt-6 text-stone-400 text-lg max-w-2xl leading-relaxed">
            Ett urval av våra arbeten — från privata hem och badrum till stora
            entreprenader tillsammans med Peab och Veidekke.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="bg-stone-50 border-b border-stone-200 sticky top-20 lg:top-24 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 overflow-x-auto">
          <div className="flex items-center gap-2 py-5">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                data-testid={`gallery-filter-${cat.toLowerCase()}`}
                className={`whitespace-nowrap px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-display font-semibold border transition-colors ${
                  activeCat === cat
                    ? "bg-stone-900 border-stone-900 text-stone-50"
                    : "bg-transparent border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto text-xs uppercase tracking-[0.18em] text-stone-500 hidden md:block">
              {filtered.length} {filtered.length === 1 ? "bild" : "bilder"}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-stone-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
            {filtered.map((img, i) => {
              const spanClass =
                img.span === "tall"
                  ? "row-span-2"
                  : img.span === "wide"
                    ? "col-span-2"
                    : "";
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setLightboxIdx(i)}
                  className={`group relative overflow-hidden bg-stone-200 ${spanClass}`}
                  data-testid={`gallery-tile-${img.id}`}
                  aria-label={`Förstora bild: ${img.title}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/45 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-amber-400 font-semibold">
                      {img.category}
                    </div>
                    <div className="font-display font-bold text-white text-lg leading-tight mt-1">
                      {img.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-500" data-testid="gallery-empty">
              Inga bilder i denna kategori ännu.
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 flex flex-col"
          data-testid="gallery-lightbox"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="flex items-center justify-between p-5 text-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
                {active.category} · {lightboxIdx + 1} / {filtered.length}
              </div>
              <div className="font-display font-bold text-xl text-white mt-1">
                {active.title}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              className="p-2 hover:bg-stone-800 transition-colors"
              aria-label="Stäng"
              data-testid="lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center px-4 pb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIdx((i) => (i - 1 + filtered.length) % filtered.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/70 hover:bg-stone-800 text-stone-100 transition-colors"
              aria-label="Föregående"
              data-testid="lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <img
              src={active.url}
              alt={active.title}
              className="max-w-full max-h-full object-contain animate-fade-up"
            />
            <button
              type="button"
              onClick={() => setLightboxIdx((i) => (i + 1) % filtered.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/70 hover:bg-stone-800 text-stone-100 transition-colors"
              aria-label="Nästa"
              data-testid="lightbox-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
