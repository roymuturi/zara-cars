import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToId(id: string, opts?: { smooth?: boolean }) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduced || opts?.smooth === false ? "auto" : "smooth",
    block: "start",
  });
  const heading = target.querySelector("h2, h1") as HTMLElement | null;
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}
