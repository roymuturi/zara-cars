// White / Zara red / navy restoration: shared chrome stays quiet, product-led, and uses the real uploaded Logo.jpg plus compact make badges.
import { useState } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { imageSet, makeMeta, money, type Vehicle } from "@/lib/stock";
import { siAudi, siBmw, siFord, siHonda, siHyundai, siJeep, siKia, siMazda, siMitsubishi, siNissan, siPeugeot, siSubaru, siSuzuki, siToyota, siVolkswagen, siVolvo } from "simple-icons/icons";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="brand-lockup" aria-label="Zara Cars home"><img src={imageSet.brandMark} alt="Zara Cars logo" className="brand-mark" />{!compact && <span className="brand-wordmark"><strong>ZARA</strong><em>CARS</em></span>}</Link>;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>;
}

const navLinks = [
  { label: "Browse stock", href: "/inventory" },
  { label: "Finance", href: "/financing" },
  { label: "Trade-in", href: "/trade-in" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${dark ? "site-header-dark" : ""}`}><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><div className="header-actions"><ThemeToggle /><button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={19} /> : <Menu size={19} />}</button></div></div>{open && <nav className="mobile-nav" aria-label="Main navigation">{navLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header>;
}

const officialBrandIcons: Record<string, typeof siToyota> = {
  Toyota: siToyota,
  Subaru: siSubaru,
  Mazda: siMazda,
  Nissan: siNissan,
  Mitsubishi: siMitsubishi,
  Honda: siHonda,
  Suzuki: siSuzuki,
  BMW: siBmw,
  Ford: siFord,
  Volkswagen: siVolkswagen,
  Hyundai: siHyundai,
  Kia: siKia,
  Peugeot: siPeugeot,
  Lexus: siToyota,
  Jeep: siJeep,
  Volvo: siVolvo,
  Audi: siAudi,
};

export function MakeBadge({ make, showLabel = true }: { make: string; showLabel?: boolean }) {
  const meta = makeMeta[make] ?? { short: make.slice(0, 3).toUpperCase(), color: "#0b1f3a", light: "#e8eef5" };
  const icon = officialBrandIcons[make];
  const logo = (meta as { logo?: string }).logo;
  return <span className={`make-badge ${showLabel ? "with-label" : ""}`} style={{ "--make-color": meta.color, "--make-light": meta.light } as React.CSSProperties}>{icon ? <svg className="make-badge-svg" viewBox="0 0 24 24" role="img" aria-label={`${make} logo`}><path d={icon.path} /></svg> : logo ? <img className="make-badge-logo" src={logo} alt={`${make} logo`} loading="lazy" /> : <b>{meta.short}</b>}{showLabel && <small>{make}</small>}</span>;
}

export function StatusPill({ status }: { status: Vehicle["status"] }) {
  const tone = status === "Ready to view" ? "green" : status === "Duty paid" ? "blue" : status === "Reserved" ? "slate" : "amber";
  return <span className={`status-pill ${tone}`}><span className="status-dot" />{status}</span>;
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return <article className="vehicle-card"><Link href={`/inventory/${vehicle.id}`} className="vehicle-card-image"><img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} loading="lazy" /><div className="vehicle-card-overlay" /><div className="vehicle-card-top"><div className="stock-capsule"><StatusPill status={vehicle.status} /><i>{vehicle.stockNo}</i><small>{vehicle.location.split(",")[0]}</small></div><MakeBadge make={vehicle.make} showLabel={false} /></div><span className="vehicle-card-arrow"><ArrowRight size={18} /></span></Link><div className="vehicle-card-body"><div className="eyebrow">{vehicle.year} · {vehicle.make} · {vehicle.segment}</div><div className="vehicle-card-title-row"><div><h3>{vehicle.model}</h3><p>{vehicle.trim} · {vehicle.color}</p></div><span className="body-tag">{vehicle.body}</span></div><div className="vehicle-meta"><span>{vehicle.mileage.toLocaleString()} km</span><span>{vehicle.fuel}</span><span>{vehicle.transmission}</span></div><div className="vehicle-price-row"><div><small>Drive-away</small><strong>{money(vehicle.price)}</strong><span>from {money(vehicle.monthly)} / month</span></div><Link href={`/inventory/${vehicle.id}`} className="text-link">View unit <ArrowRight size={15} /></Link></div></div></article>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-inner"><div><Logo /><p>Verified cars for real Kenyan roads.<br />Nairobi · Mombasa · diaspora support</p></div><div className="footer-links"><Link href="/inventory">Browse stock</Link><Link href="/contact">Contact team</Link><Link href="/legal">Trust & verification</Link></div><div className="footer-dealer-block"><p>For modern dealerships</p><Link href="/dealer" className="dealer-login-button">Dealer workspace <ArrowRight size={14} /></Link></div><div className="footer-contact"><span>Need a second opinion?</span><a href="https://wa.me/254700000000?text=Hi%20Zara%20Cars" target="_blank" rel="noreferrer">WhatsApp the showroom <ArrowRight size={15} /></a></div></div><div className="footer-bottom"><span>© 2026 Zara Cars Kenya</span><span>Built around clarity, not pressure.</span></div></footer>;
}

export function AmbientBackground() {
  return <div className="ambient-background" aria-hidden="true"><div className="ambient-orbit orbit-one" /><div className="ambient-orbit orbit-two" /><div className="ambient-orbit orbit-three" /><div className="ambient-glow glow-red" /><div className="ambient-glow glow-blue" /></div>;
}

export function PageFrame({ children, dark = false, noHeader = false }: { children: React.ReactNode; dark?: boolean; noHeader?: boolean }) {
  return <div className={`app-frame ${dark ? "frame-dark" : ""} ${noHeader ? "no-header" : ""}`}><AmbientBackground />{!noHeader && <SiteHeader dark={dark} />}<main className="page-content">{children}</main><Footer /></div>;
}
