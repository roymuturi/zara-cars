import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import logoImg from "@/Logo.jpg";

type LogoProps = {
  href?: string;
  wordmark?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

function Mark({ tone = "dark" }: { tone?: LogoProps["tone"] }) {
  return (
    <span className="relative grid h-12 w-12 place-items-center rounded-xl overflow-hidden">
      <img src={logoImg} alt="Zara Cars" className="h-full w-full object-contain" />
    </span>
  );
}

export default function Logo({ href = "/", wordmark = true, tone = "dark", className = "" }: LogoProps) {
  const textPrimary = tone === "light" ? "text-white" : "text-[#0b1f3a]";
  const textSecondary = tone === "light" ? "text-white/75" : "text-slate-500";
  return (
    <Link href={href} className={`flex items-center gap-3 ${className}`} aria-label="Zara Cars home">
      <Mark tone={tone} />
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[17px] font-extrabold tracking-[0.18em] ${textPrimary}`}>ZARA CARS</span>
          <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${textSecondary}`}>Click! Click! Drive!</span>
        </span>
      )}
    </Link>
  );
}
