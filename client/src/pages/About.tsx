import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, Phone, ShieldCheck, Users } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/about" className="font-extrabold text-[#0b1f3a]">About</Link>
            <Link href="/contact" className="hover:text-[#0b1f3a]">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
                        <LanguageToggle />
            <a href="tel:+254700000000" className="hidden text-sm font-bold text-[#0b1f3a] sm:block">+254 700 000 000</a>
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0b1f3a] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#172f4f]">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#0b1f3a]">
          <ArrowLeft className="h-4 w-4" /> {t("label.backToHome")}
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.ourStory")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("about.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("about.subhead")}</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">The founding story</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Zara Cars started when our founders tried to buy a car the "normal" way — WhatsApp forwards, Facebook screenshots, and yard visits where the car in the photo was either already sold or nothing like the listing. They realised the market didn't need another classifieds site. It needed a dealer that treated car buying like a fintech product: transparent, verified, and trackable.</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Today, Zara Cars combines yard operations, digital verification, and real-time status tracking so buyers know exactly what they are getting, what it costs, and when it will be ready.</p>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Verification process</h2>
              <div className="mt-5 space-y-4">
                {[["Japan auction sheet check", "We source cars with verifiable auction grades and keep the sheet on file."], ["108-point condition check", "Every car is inspected for mechanical, cosmetic, and documentation integrity."], ["Duty & clearing tracker", "We show you the duty, clearing, and registration costs before you commit."], ["Independent inspection available", "Buyers can request an AA Kenya or equivalent third-party stamp."]].map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d91e2a]" />
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Values</h2>
              <div className="mt-5 space-y-4">
                {[["Transparency first", "No hidden fees, no fine print. The drive-away price is the price you pay."],["Respect for your time", "Three-click promise: find, reserve, drive. No long sales pitches."],[" Kenyan market credibility", "We use local terminology, KES pricing, and M-Pesa — not imported templates."],["Long-term relationship", "We want you to buy your next car from us too."]].map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d91e2a]" />
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Visit the yard</h2>
              <p className="mt-2 text-sm text-slate-500">Lavington, Nairobi — open Monday to Saturday, 8am to 6pm.</p>
              <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#0b1f3a]">
                <Phone className="h-4 w-4" /> +254 700 000 000
              </div>
              <a href="https://wa.me/254700000000?text=Hi%20Zara%20Cars,%20I'd%20like%20to%20visit%20the%20yard." target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0b1f3a] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#172f4f]">
                Book a viewing <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">Kenya's most transparent way to buy a car. Nairobi first, nationwide next.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500">
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Inventory</Link>
            <Link href="/financing" className="hover:text-[#0b1f3a]">Finance</Link>
            <Link href="/trade-in" className="hover:text-[#0b1f3a]">Trade in</Link>
            <Link href="/dealer" className="hover:text-[#0b1f3a]">Dealer login</Link>
          </div>
        </div>
        <div className="border-t border-slate-100 px-5 py-5 text-center text-xs font-semibold text-slate-400">© 2026 Zara Cars. Transparent by design.</div>
      </footer>
    </div>
  );
}











