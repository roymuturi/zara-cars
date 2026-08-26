import { Link } from "wouter";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CarFront,
  CheckCircle2,
  ChevronDown,
  FileImage,
  Gauge,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function TradeIn() {
  const { t } = useTranslation();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/financing" className="hover:text-[#0b1f3a]">Finance</Link>
            <Link href="/trade-in" className="font-extrabold text-[#0b1f3a]">Trade in</Link>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.tradeInEstimate")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("tradeIn.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("tradeIn.subhead")}</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              {submitted ? (
                <div className="py-10 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-extrabold text-[#0b1f3a]">Submission received.</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">A Zara Cars specialist will WhatsApp you with a provisional range within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-5 rounded-full bg-[#0b1f3a] px-5 py-3 text-sm font-extrabold text-white">Submit another</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Make</span>
                      <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="e.g. Toyota" className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Model</span>
                      <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Fielder" className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Year</span>
                      <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2014" className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Mileage (km)</span>
                      <input value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="e.g. 85000" className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Photos (front, back, side)</span>
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm font-semibold text-slate-500">
                      <FileImage className="h-5 w-5" /> Tap to upload or drag files here
                    </div>
                  </label>
                  <button onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-full bg-[#d91e2a] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#b91621]">
                    Get my estimate <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Why trade in with Zara</h2>
              <div className="mt-5 space-y-4">
                {[["Provisional range in 24h", "We review photos and specs, then WhatsApp a realistic KES band."], ["No obligation to sell", "The estimate is just that — an estimate. No pressure."], ["Count it towards your next Zara car", "If you buy from us, we can apply the trade value to the purchase."], ["We handle the paperwork", "Transfer, logbook, and NTS clearances taken care of."]].map(([title, body]) => (
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

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Recent trade-ins</h2>
              <div className="mt-4 divide-y divide-slate-100">
                {[
                  { vehicle: "2014 Toyota Fielder", estimate: "KES 1.1M – 1.25M", time: "24 min ago" },
                  { vehicle: "2012 Nissan X-Trail", estimate: "KES 760K – 900K", time: "2 hrs ago" },
                  { vehicle: "2016 Mazda Demio", estimate: "KES 980K – 1.1M", time: "Yesterday" },
                ].map((item) => (
                  <div key={item.vehicle} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{item.vehicle}</p>
                      <p className="text-xs font-semibold text-slate-500">{item.time}</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#0b1f3a]">{item.estimate}</span>
                  </div>
                ))}
              </div>
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

      <a href="https://wa.me/254700000000?text=Hi%20Zara%20Cars" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-20 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/20 transition hover:scale-105" aria-label="Chat with Zara Cars on WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}











