import { toast } from "sonner";
import { Link } from "wouter";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CarFront,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

const partners = [
  { name: "NCBA Bank", type: "Bank", rate: "From 12.5%", highlight: "Salaried buyers" },
  { name: "KCB Group", type: "Bank", rate: "From 11.9%", highlight: "Diaspora & salaried" },
  { name: "Mogo Finance", type: "Digital lender", rate: "From 14.0%", highlight: "Fast approval" },
  { name: "Safaricom Blossom", type: "SACCO partner", rate: "From 13.2%", highlight: "M-Pesa integrated" },
];

export default function Financing() {
  const { t } = useTranslation();
  const [monthly, setMonthly] = useState("150000");
  const [term, setTerm] = useState("48");
  const [deposit, setDeposit] = useState("200000");
  const [employment, setEmployment] = useState("Salaried");

  const calc = () => {
    const p = Number(monthly) || 0;
    const n = Number(term) || 1;
    const d = Number(deposit) || 0;
    const principal = Math.max(0, p - d);
    const monthlyRepay = principal > 0 ? Math.round((principal * 1.14) / n) : 0;
    return monthlyRepay;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/financing" className="font-extrabold text-[#0b1f3a]">Finance</Link>
            <Link href="/trade-in" className="hover:text-[#0b1f3a]">Trade in</Link>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.financeMatch")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("financing.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("financing.subhead")}</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Your profile</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Employment type</span>
                  <select value={employment} onChange={(e) => setEmployment(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none">
                    <option>Salaried</option>
                    <option>Business owner</option>
                    <option>Boda / matatu SACCO</option>
                    <option>Diaspora buyer</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Target car price (KES)</span>
                  <input value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Deposit (KES)</span>
                  <input value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Term (months)</span>
                  <select value={term} onChange={(e) => setTerm(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none">
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                  </select>
                </label>
              </div>
              <div className="mt-5 rounded-xl bg-[#f4f5f7] p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Estimated monthly repayment</p>
                <p className="mt-2 font-display text-3xl font-extrabold text-[#0b1f3a]">KES {calc().toLocaleString("en-KE")}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Based on indicative rate of 14% APR. Final rate set by partner after KYC.</p>
              </div>
              <button onClick={() => toast?.success?.("Finance request sent", { description: "A Zara Cars finance specialist will contact you shortly." })} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d91e2a] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#b91621]">
                Get matched <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Partner network</h2>
              <p className="mt-2 text-sm text-slate-500">Real SACCOs and banks, not lead-gen ads. We route your request to the partner most likely to approve you.</p>
              <div className="mt-5 divide-y divide-slate-100">
                {partners.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-500">{item.type} · {item.highlight}</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#d91e2a]">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">How it works</h2>
              <div className="mt-5 space-y-4">
                {[["Tell us how you earn", "Employment type and budget — no paperwork yet."], ["We match you", "We pick the partner most likely to approve your amount."], ["Drive away", "Deposit reserve, then take delivery with clear paperwork."]].map(([title, body], i) => (
                  <div key={title} className="flex gap-4">
                    <span className="font-display text-2xl font-extrabold text-[#d91e2a]/25">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">{body}</p>
                    </div>
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











