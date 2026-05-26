import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { company, services, contactImage } from "@/lib/data";
import { createQuote } from "@/lib/api";

const INITIAL = {
  namn: "",
  email: "",
  telefon: "",
  foretag: "",
  tjanst: "",
  meddelande: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.namn || !form.email || !form.meddelande) {
      toast.error("Fyll i namn, e-post och meddelande.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") delete payload[k];
      });
      await createQuote(payload);
      setSent(true);
      setForm(INITIAL);
      toast.success("Tack! Vi återkommer inom kort.");
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Något gick fel. Försök igen.";
      toast.error(typeof msg === "string" ? msg : "Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="relative bg-stone-900 text-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactImage}
            alt="Kontakt - bygg"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 to-stone-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-6">
            Kontakt
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] max-w-4xl">
            Berätta om ert kommande projekt.
          </h1>
          <p className="mt-6 text-stone-300 text-lg max-w-2xl leading-relaxed">
            Vi återkommer inom 24 timmar med en kostnadsfri offert eller fler
            frågor om ditt projekt.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div
                className="bg-white border border-stone-200 p-10"
                data-testid="contact-success"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-4">
                  Tack
                </div>
                <h2 className="font-display font-bold text-3xl tracking-tighter text-stone-900 mb-4">
                  Din förfrågan är skickad.
                </h2>
                <p className="text-stone-600 leading-relaxed">
                  Vi har tagit emot din offertförfrågan och återkommer inom kort
                  med svar.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-6 py-3 font-display font-medium transition-colors"
                  data-testid="contact-new-message"
                >
                  Skicka nytt meddelande
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-white border border-stone-200 p-8 lg:p-10"
                data-testid="contact-form"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                  Offertförfrågan
                </div>
                <h2 className="font-display font-bold text-3xl tracking-tighter text-stone-900 mb-8">
                  Fyll i formuläret nedan.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="namn" className="text-stone-900 mb-2 block">
                      Namn *
                    </Label>
                    <Input
                      id="namn"
                      value={form.namn}
                      onChange={(e) => update("namn", e.target.value)}
                      required
                      className="rounded-none bg-white border-stone-300 focus-visible:ring-amber-700 focus-visible:ring-1 focus-visible:border-amber-700"
                      data-testid="contact-input-namn"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-stone-900 mb-2 block">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      className="rounded-none bg-white border-stone-300 focus-visible:ring-amber-700 focus-visible:ring-1 focus-visible:border-amber-700"
                      data-testid="contact-input-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefon" className="text-stone-900 mb-2 block">
                      Telefon
                    </Label>
                    <Input
                      id="telefon"
                      value={form.telefon}
                      onChange={(e) => update("telefon", e.target.value)}
                      className="rounded-none bg-white border-stone-300 focus-visible:ring-amber-700 focus-visible:ring-1 focus-visible:border-amber-700"
                      data-testid="contact-input-telefon"
                    />
                  </div>
                  <div>
                    <Label htmlFor="foretag" className="text-stone-900 mb-2 block">
                      Företag
                    </Label>
                    <Input
                      id="foretag"
                      value={form.foretag}
                      onChange={(e) => update("foretag", e.target.value)}
                      className="rounded-none bg-white border-stone-300 focus-visible:ring-amber-700 focus-visible:ring-1 focus-visible:border-amber-700"
                      data-testid="contact-input-foretag"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="tjanst" className="text-stone-900 mb-2 block">
                      Tjänst
                    </Label>
                    <Select
                      value={form.tjanst}
                      onValueChange={(v) => update("tjanst", v)}
                    >
                      <SelectTrigger
                        className="rounded-none bg-white border-stone-300 focus:ring-amber-700 focus:ring-1 focus:border-amber-700"
                        data-testid="contact-select-tjanst"
                      >
                        <SelectValue placeholder="Välj tjänst (valfritt)" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="Annat">Annat / vet ej</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="meddelande" className="text-stone-900 mb-2 block">
                      Meddelande *
                    </Label>
                    <Textarea
                      id="meddelande"
                      value={form.meddelande}
                      onChange={(e) => update("meddelande", e.target.value)}
                      required
                      rows={6}
                      placeholder="Beskriv ditt projekt: omfattning, tidsplan, plats..."
                      className="rounded-none bg-white border-stone-300 focus-visible:ring-amber-700 focus-visible:ring-1 focus-visible:border-amber-700 resize-none"
                      data-testid="contact-input-meddelande"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-4 font-display font-medium transition-colors"
                  data-testid="contact-submit-button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Skicka förfrågan
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-xs text-stone-500">
                  Genom att skicka godkänner du att vi behandlar dina uppgifter
                  för att kunna besvara din förfrågan.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-stone-50 p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-5">
                Direktkontakt
              </div>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-400">
                      Telefon
                    </div>
                    <a
                      href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                      className="font-display font-medium text-xl text-white link-underline"
                      data-testid="contact-phone"
                    >
                      {company.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-400">
                      E-post
                    </div>
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="font-display font-medium text-xl text-white link-underline"
                      data-testid="contact-email"
                    >
                      {company.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-400">
                      Adress
                    </div>
                    <div className="font-display font-medium text-xl text-white">
                      {company.contact.address}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-stone-200 p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold mb-5">
                Så här arbetar vi
              </div>
              <ol className="space-y-5">
                {[
                  "Du skickar in din förfrågan – kostnadsfritt och utan förpliktelser.",
                  "Vi återkommer inom 24 timmar för ett första samtal.",
                  "Platsbesök och offert anpassad efter ditt projekt.",
                  "Tydlig tidsplan, hantverk och slutbesiktning.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display font-bold text-2xl text-amber-700 leading-none w-8 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-stone-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
