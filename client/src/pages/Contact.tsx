import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1f3a] dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            <Link href="/" className="hover:text-[#0b1f3a]">Home</Link>
            <Link href="/inventory" className="hover:text-[#0b1f3a]">Browse cars</Link>
            <Link href="/about" className="hover:text-[#0b1f3a]">About</Link>
            <Link href="/contact" className="font-extrabold text-[#0b1f3a]">Contact</Link>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d91e2a]">{t("section.sendMessage")}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{t("contact.headline")}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">{t("contact.subhead")}</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Send a message</h2>
              <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent. A Zara Cars specialist will reply shortly."); }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Your name</span>
                    <input className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Phone or WhatsApp</span>
                    <input className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Message</span>
                  <textarea rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none" />
                </label>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#d91e2a] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#b91621]">
                  Send message <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Showroom</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d91e2a]" /> Lavington, Nairobi<br />Opposite Lavington Mall, off James Gichuru Road</p>
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-[#d91e2a]" /> +254 700 000 000</p>
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-[#d91e2a]" /> hello@zaracars.co.ke</p>
                <p className="flex items-center gap-3"><MessageCircle className="h-4 w-4 shrink-0 text-[#d91e2a]" /> +254 700 000 000 (WhatsApp)</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-500">Open Monday – Saturday, 8am – 6pm. Sundays by appointment.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(11,31,58,0.03)]">
              <h2 className="font-display text-xl font-extrabold text-[#0b1f3a]">Branches</h2>
              <div className="mt-4 divide-y divide-slate-100">
                {[
                  { name: "Nairobi (HQ)", address: "Lavington, Nairobi", phone: "+254 700 000 000" },
                  { name: "Mombasa", address: "Nyali, Mombasa", phone: "+254 700 000 001" },
                  { name: "Kisumu", address: "Milimani, Kisumu", phone: "+254 700 000 002" },
                ].map((branch) => (
                  <div key={branch.name} className="py-3">
                    <p className="text-sm font-extrabold text-[#0b1f3a]">{branch.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{branch.address}</p>
                    <p className="text-xs font-semibold text-slate-500">{branch.phone}</p>
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











