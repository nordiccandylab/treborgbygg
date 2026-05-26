# Treborg Bygg i Skåne AB — PRD

## Original Problem Statement
> du som webdesigner och utvecklare, jag vill att du bygger en ny sida till byggföretaget Treborg Bygg i Skåne AB. Deras nuvarande sida är: https://www.treborgbygg.se/ Jag vill att du använder informationen där ifrån och även bilderna som jag vill du bygger ett fint galleri till och visa de på ett fint sätt.

## User Choices (Iteration 1)
- Omfattning: samtliga sidor (multi-page)
- Designstil: byggföretag, förtroendeingivande
- Galleri: enkelt och tydligt med klara bilder
- Kontaktformulär: ja, sparas i databas + admin-vy
- Kontaktuppgifter: använd platshållare (saknades på nuvarande sida)

## Architecture
- **Stack:** FastAPI + React + MongoDB
- **Routing:** React Router (Hem, Tjänster + 4 undersidor, Galleri, Om oss, Kontakt, Admin, 404)
- **Backend:**
  - `POST /api/quotes` – skapa offertförfrågan
  - `GET /api/quotes` – lista (sorted by created_at desc)
  - `PATCH /api/quotes/{id}` – uppdatera status (ny|kontaktad|klar)
  - `DELETE /api/quotes/{id}` – ta bort
- **Frontend:** Shadcn UI + Tailwind, Cabinet Grotesk + Work Sans typografi (Fontshare/Google Fonts), Sonner toasts, custom Lightbox med keyboard nav.

## What's Been Implemented (2026-05-26)
- Hela multi-page sidan på svenska
- 4 servicedetaljsidor (Renovering, Målning, Takläggning, Rivning)
- Filterbart galleri med lightbox (kategorier: Alla, Renovering, Målning, Takläggning, Rivning, Referensprojekt)
- Offertförfrågningsformulär ansluten till MongoDB
- Admin-vy för att hantera förfrågningar (status uppdatera, ta bort, filtrera)
- Footer med kontaktinfo, partners-sektion (PEAB, VEIDEKKE), trust signals
- Mobile-responsiv design med hamburgermeny

## Test Status
- Backend: 14/14 tests pass (pytest at /app/backend/tests/test_quotes.py)
- Frontend: 100% av testade flöden fungerar (testing_agent_v3 iteration_1)

## Personas
- **Privatkund** – söker pålitligt byggföretag i Skåne för renovering/badrum/kök
- **Företag/Entreprenör** – behöver underentreprenör för större projekt
- **Admin (företagets ägare)** – hanterar inkommande förfrågningar

## Prioritized Backlog
### P1 (next)
- [ ] Lägg till lösenord/auth på `/admin` (basic JWT eller Emergent Google Auth)
- [ ] Uppdatera platshållarkontaktuppgifter (telefon, e-post, ev. adress) med riktiga uppgifter
- [ ] E-postnotifiering vid ny offertförfrågan (Resend / SendGrid)

### P2
- [ ] SEO: structured data (LocalBusiness schema), sitemap.xml, robots.txt
- [ ] Bildoptimering: byt ut wixstatic URLs mot egna hostade bilder
- [ ] Lägg till kundrecensioner / testimonials
- [ ] Tjänsteundersida för Pool, Badrum & kök (egna sidor)

### P3
- [ ] Flerspråk (engelska)
- [ ] Blogg/projektartiklar
- [ ] Före/efter-bilder med slider

## Notes
- Bilder från nuvarande site hostas externt på wixstatic.com
- Test_credentials.md: ingen auth implementerad
