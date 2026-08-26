import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Globe2, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Diaspora() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/diaspora" className="font-extrabold text-[#0b1f3a]">Diaspora</Link>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.howDiasporaWorks")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("diaspora.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("diaspora.subhead")}</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">How it works</h2>
              <div className="mt-5 space-y-4">
                {[["Reserve from anywhere", "Browse live stock and reserve with a USD/EUR deposit via card."],["WhatsApp updates", "Your family in Kenya gets real-time status: in transit, clearing, ready."],["Local delivery contact", "We coordinate with your Nairobi-based contact for handover."],["Full paperwork support", "Duty, registration, and number plates handled on your behalf."]].map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d91e2a]" />
                    <div>
                      <p className="text-sm font-extrabold text-[#0b1f3a]">{title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => alert("A Zara Cars diaspora specialist will contact you within 24 hours.")} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d91e2a] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#b91621]">
                Start diaspora purchase <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Payment options</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-[#d91e2a]" /> USD / EUR card payment for deposit</p>
                <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-[#d91e2a]" /> M-Pesa or bank transfer for balance in KES</p>
                <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-[#d91e2a]" /> Escrow-style reserve: deposit held until handover</p>
                <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-[#d91e2a]" /> No site login required — WhatsApp-first</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">What our diaspora buyers say</h2>
              <div className="mt-4 space-y-4">
                {[
                  { name: "James K.", location: "London", text: "Bought a Harrier from the UK. WhatsApp updates every step. Car was ready exactly when promised." },
                  { name: "Wanjiru M.", location: "Atlanta", text: "The all-in price meant no surprises when duty came. Paid in USD and the balance in KES via M-Pesa." },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-slate-100 bg-[#f8fafc] p-4">
                    <p className="text-sm font-semibold text-slate-600">"{item.text}"</p>
                    <p className="mt-2 text-xs font-extrabold text-[#0b1f3a]">{item.name} · {item.location}</p>
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
    </div>
  );
}











