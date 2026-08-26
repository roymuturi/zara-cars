import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, MessageCircle, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function LegalTrust() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/legal" className="font-extrabold text-[#0b1f3a]">Legal & trust</Link>
            <Link href="/contact" className="hover:text-[#0b1f3a]">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
                        <LanguageToggle />
            <a href="tel:+254700000000" className="hidden text-sm font-bold text-[#0b1f3a] sm:block">+254 700 000 000</a>
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0b1f3a] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#172f4f]">
              <MessageCircle className="h-4 w-4" /> Chat
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.trust")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("legal.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("legal.subhead")}</p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
                <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Reservation deposits</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">When you reserve a car, you pay a refundable deposit (typically KES 10,000) via M-Pesa STK Push. The car is held for 48 hours. If you decide not to proceed, the deposit is refunded in full within 5 working days. If you proceed, the deposit forms part of the purchase price.</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#d91e2a]">
                  <ShieldCheck className="h-4 w-4" /> Deposit protected by M-Pesa transaction record
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
                <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Refund policy</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">Deposits are refundable if the car fails inspection, if the duty/clearing cost changes by more than 5%, or if the car is not ready within the agreed window. In all other cases, deposits are non-refundable but transferable to another Zara Cars vehicle within 90 days.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
                <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Duty & import explainer</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">Kenyan import duty is calculated on the car's CIF (Cost, Insurance, Freight) value. Zara Cars breaks down the all-in price into vehicle price, duty & clearing, registration & inspection, and handling. We lock the final price before the car clears customs so you know exactly what you will pay.</p>
                <div className="mt-4 rounded-xl bg-[#f4f5f7] p-4 text-xs font-semibold text-slate-600">
                  <p className="font-extrabold text-[#0b1f3a]">Typical breakdown for a KES 3M car:</p>
                  <p className="mt-2">Vehicle price: KES 2,750,000</p>
                  <p>Duty & clearing: KES 180,000</p>
                  <p>Registration & inspection: KES 50,000</p>
                  <p>Zara handling: KES 20,000</p>
                  <p className="mt-2 font-extrabold text-[#0b1f3a]">Drive-away: KES 3,000,000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Buyer protections</h2>
              <div className="mt-5 space-y-4">
                {[["All-in pricing", "The price you see is the price you pay. No hidden clearing fees."],["Refundable reserve", "48-hour hold with full refund if plans change."],["Independent inspection", "AA Kenya or equivalent stamp available on every car."],["Clear paperwork", "Logbook, transfer, and NTS support included."],["WhatsApp trail", "Every enquiry and reservation is logged and traceable."]].map(([title, body]) => (
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
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Questions?</h2>
              <p className="mt-2 text-sm text-slate-500">If anything is unclear, ask us directly. We publish policies in plain English and Swahili.</p>
              <a href="https://wa.me/254700000000?text=Hi%20Zara%20Cars,%20I%20have%20a%20question%20about%20reservations%20or%20pricing." target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0b1f3a] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#172f4f]">
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
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











