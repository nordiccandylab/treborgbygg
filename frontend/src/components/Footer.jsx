import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { company, services, quoteMailto, logoUrl } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="bg-stone-900 text-stone-300 mt-24"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="mb-6">
              <img
                src={logoUrl}
                alt="Treborg Bygg i Skåne AB"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="font-display text-3xl lg:text-4xl text-white tracking-tight leading-[1.1] max-w-md mb-8">
              Vi håller alltid vad vi lovar.
            </p>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              {company.about}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-500 mb-5 font-semibold">
              Tjänster
            </div>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/tjanster/${s.slug}`}
                    className="text-stone-300 hover:text-white link-underline"
                    data-testid={`footer-service-${s.slug}`}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-500 mb-5 font-semibold">
              Kontakt
            </div>
            <ul className="space-y-4 text-stone-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-amber-500" />
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                  className="link-underline"
                  data-testid="footer-phone"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-amber-500" />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="link-underline"
                  data-testid="footer-email"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-amber-500" />
                <span>{company.contact.address}</span>
              </li>
            </ul>

            <a
              href={quoteMailto}
              className="mt-8 inline-flex items-center bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 font-display font-medium text-sm transition-colors"
              data-testid="footer-cta"
            >
              Begär kostnadsfri offert
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-stone-500">
          <div>
            © {new Date().getFullYear()} {company.contact.org}. Alla rättigheter
            förbehållna.
          </div>
          <div className="flex gap-6">
            <span>Sedan {company.founded}</span>
            <span>Trelleborg · Skåne</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
