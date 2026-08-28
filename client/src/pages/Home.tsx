// White / Zara red / navy restoration: the landing page stays product-first—hero, search, stock signals, and a short featured inventory preview.
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, CarFront, ChevronDown, CircleDollarSign, Clock3, Globe2, Search, ShieldCheck, Tag } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, VehicleCard, Logo, ThemeToggle, WhatsAppButton } from "@/components/SiteChrome";
import { imageSet, vehicles } from "@/lib/stock";

function StatStrip() {
  const stats = [
    { value: "96%", label: "Duty-paid ready stock", Icon: ShieldCheck, color: "red" },
    { value: "48 hrs", label: "Reservation hold", Icon: Clock3, color: "navy" },
    { value: "KES", label: "All-in pricing", Icon: CircleDollarSign, color: "red" },
    { value: "Nairobi", label: "Showroom + delivery", Icon: Globe2, color: "navy" },
  ];
  return <div className="original-stat-strip">{stats.map(({ value, label, Icon, color }) => <div key={label}><span className="original-stat-icon" style={{ color: color === "red" ? "var(--red)" : "var(--ink)" }}><Icon size={18} /></span><div><strong>{value}</strong><small>{label}</small></div></div>)}</div>;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("All makes");
  const makes = useMemo(() => Array.from(new Set(vehicles.map(vehicle => vehicle.make))), []);
  const featured = vehicles.filter(vehicle => vehicle.status !== "Reserved").slice(0, 4);
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (make !== "All makes") params.set("make", make);
  const searchHref = `/inventory${params.toString() ? `?${params.toString()}` : ""}`;

  return <PageFrame dark noHeader>
    <section className="original-hero">
      <div className="landing-logo-top"><Logo /></div>
      <div className="landing-theme-toggle"><ThemeToggle /></div>
      <div className="original-hero-wash" />
      <div className="original-hero-orbit orbit-a" /><div className="original-hero-orbit orbit-b" />
      <div className="original-hero-inner">
        <div className="original-hero-copy">
          <h1 className="hero-kinetic-lockup"><span className="red-line">Premium</span><span>verified cars</span><span>for Kenyans</span></h1>
          <p>Browse clear prices, specifications, and next steps with Zara Cars. Every unit is verified, duty-paid, and ready for a showroom walk-through.</p>
          <div className="hero-actions"><Link href="/inventory" className="button button-red">Browse available stock <ArrowRight size={16} /></Link><Link href="/trade-in" className="button original-hero-link">Sell or trade in <ArrowRight size={15} /></Link></div>
          <div className="original-proof"><span><BadgeCheck size={15} /> Verified paperwork</span><span><Tag size={15} /> No surprise fees</span></div>
        </div>
        <div className="original-feature-card"><div className="original-feature-image"><img src={imageSet.harrierHero} alt="Toyota Harrier available from Zara Cars" /><div className="original-image-shade" /><div className="original-feature-caption"><div><small>Featured this week</small><strong>Toyota Harrier</strong><span>Ready to view · Lavington</span></div><div className="original-feature-price"><small>Drive-away</small><strong>KES 3.87M</strong></div></div></div><div className="original-feature-specs"><span><b>80,000</b><small>km</small></span><span><b>2.0L</b><small>turbo petrol</small></span><span><b>Auto</b><small>transmission</small></span></div></div>
      </div>
          <div className="original-search"><div className="original-search-fields"><div className="original-search-input"><Search size={18} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search make, model or stock number" aria-label="Search vehicles" /></div><div className="original-search-select"><CarFront size={16} /><select value={make} onChange={event => setMake(event.target.value)} aria-label="Filter by make"><option>All makes</option>{makes.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div><Link href={searchHref} className="button button-red original-find-button">Find my car <ArrowRight size={16} /></Link></div><div className="original-popular"><span>Popular</span><Link href="/inventory?body=SUV">SUVs</Link><Link href="/inventory?price=under3">Under KES 3M</Link><Link href="/inventory?fuel=Hybrid">Hybrid</Link><Link href="/inventory?status=Ready%20to%20view">Ready to view</Link></div></div>
    </section>
    <section className="original-stats-section"><StatStrip /></section>
    <section className="original-stock-section"><div className="original-section-heading"><div><p className="section-kicker">The Zara standard</p><h2>Cars you can buy<br />with your eyes open.</h2></div><Link href="/inventory" className="text-link">See all inventory <ArrowRight size={15} /></Link></div><div className="vehicle-grid original-vehicle-grid">{featured.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div></section>
    <section className="original-zara-standard"><div className="original-section-heading"><div><p className="section-kicker">How we differ</p><h2>Four guarantees,<br />no exceptions.</h2></div></div><div className="zara-standard-grid"><div className="trust-badge-block"><div className="trust-badge-icon"><BadgeCheck size={20} /></div><h3>No hidden fees</h3><p>Every price is drive-away. What you see is what you pay — verified, duty-paid, no surprises.</p></div><div className="trust-badge-block"><div className="trust-badge-icon"><ShieldCheck size={20} /></div><h3>Verification first</h3><p>Each vehicle is inspected, documented, and matched to its auction sheet before listing.</p></div><div className="trust-badge-block"><div className="trust-badge-icon"><Clock3 size={20} /></div><h3>48-hour hold</h3><p>See a car you like? We hold it for 48 hours with a refundable deposit — no pressure.</p></div><div className="trust-badge-block"><div className="trust-badge-icon"><ArrowRight size={20} /></div><h3>WhatsApp clarity</h3><p>Every enquiry gets a traceable WhatsApp thread. No voicemails, no runaround.</p></div></div></section>
    <section className="original-bottom-cta"><div><p className="section-kicker">Need a second look?</p><h2>Request the inspection file.<br /><span>We will show it.</span></h2><p>Receive photos, inspection notes, and the vehicle history file for any unit.</p></div><WhatsAppButton /></section>
  </PageFrame>;
}
