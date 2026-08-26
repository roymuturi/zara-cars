import { useTranslation } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggle } = useTranslation();
  return (
    <button
      onClick={toggle}
      className="inline-flex h-8 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500 transition hover:border-[#0b1f3a] hover:text-[#0b1f3a]"
      aria-label="Toggle language"
    >
      {language === "en" ? "EN / SW" : "SW / EN"}
    </button>
  );
}
