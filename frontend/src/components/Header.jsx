import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { company } from "@/lib/data";

const NAV_LINKS = [
  { to: "/", label: "Hem" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/galleri", label: "Galleri" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled
          ? "bg-stone-50/95 backdrop-blur-md border-stone-200"
          : "bg-stone-50 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-testid="header-logo"
            aria-label="Treborg Bygg - Hem"
          >
            <div className="w-10 h-10 bg-stone-900 text-amber-500 flex items-center justify-center font-display font-black text-lg">
              T
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-stone-900 text-lg tracking-tight">
                Treborg Bygg
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mt-1">
                i Skåne AB · Sedan {company.founded}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Huvudmeny">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className={({ isActive }) =>
                  `link-underline font-display font-medium text-sm uppercase tracking-[0.18em] text-stone-700 hover:text-stone-900 ${
                    isActive ? "is-active text-stone-900" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors"
              data-testid="header-phone"
            >
              <Phone className="w-4 h-4" />
              {company.contact.phone}
            </a>
            <Link
              to="/kontakt"
              className="hidden md:inline-flex items-center bg-amber-700 hover:bg-amber-800 text-white px-5 py-3 font-display font-medium text-sm transition-colors"
              data-testid="header-cta"
            >
              Begär offert
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 text-stone-900"
              onClick={() => setOpen((v) => !v)}
              aria-label="Öppna meny"
              data-testid="header-mobile-toggle"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t border-stone-200 bg-stone-50"
          data-testid="mobile-menu"
        >
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-display text-2xl tracking-tight ${
                    isActive ? "text-amber-700" : "text-stone-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/kontakt"
              className="mt-4 inline-flex items-center justify-center bg-amber-700 text-white px-5 py-4 font-display font-medium"
              data-testid="mobile-cta"
            >
              Begär offert
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
