// White / Zara red / navy restoration: the landing page stays product-first—hero, search, stock signals, and a short featured inventory preview.
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarDays, CarFront, ChevronDown, CircleDollarSign, Clock3, Globe2, MessageCircle, Search, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, VehicleCard, Logo, ThemeToggle } from "@/components/SiteChrome";
import { imageSet, vehicles } from "@/lib/stock";

function WhatsAppButton() {
  return <a href="https://wa.me/254700000000?text=Hi%20Zara%20Cars" target="_blank" rel="noreferrer" className="whatsapp-button"><MessageCircle size={16} /> WhatsApp</a>;
}

function StatStrip() {
  const stats = [
    { value: "96%", label: "Duty-paid ready stock", Icon: ShieldCheck, color: "red" },
    { value: "48 hrs", label: "Reservation hold", Icon: Clock3, color: "navy" },
    { value: "KES", label: "All-in pricing", Icon: CircleDollarSign, color: "red" },
    { value: "Nairobi", label: "Showroom + delivery", Icon: Globe2, color: "navy" },
  ];
  return <div className="original-stat-strip">{stats.map(({ value, label, Icon, color }) => <div key={label}><span className={`original-stat-icon ${color}`}><Icon size={18} /></span><div><strong>{value}</strong><small>{label}</small></div></div>)}</div>;
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
      <div className="landing-chrome"><Logo /><ThemeToggle /></div>
      <div className="original-hero-wash" />
      <div className="original-hero-orbit orbit-a" /><div className="original-hero-orbit orbit-b" />
      <div className="original-hero-inner">
        <div className="original-hero-copy">
          <h1 className="hero-kinetic-lockup"><span>CLICK</span><span>CLICK</span><span>DRIVE</span></h1>
          <p>Premium, verified stock for Nairobi roads and beyond. Every unit has a price, a paper trail, and a next step you can see.</p>
          <div className="hero-actions"><Link href="/inventory" className="button button-red">Browse available stock <ArrowRight size={16} /></Link><Link href="/trade-in" className="button original-hero-link">Sell or trade in <ArrowRight size={15} /></Link></div>
          <div className="original-proof"><span><BadgeCheck size={15} /> Verified paperwork</span><span><Tag size={15} /> No surprise fees</span></div>
        </div>
        <div className="original-feature-card"><div className="original-feature-image"><img src={imageSet.tiguanFront} alt="2018 Volkswagen Tiguan available from Zara Cars" /><div className="original-image-shade" /><div className="original-feature-caption"><div><small>Featured this week</small><strong>2018 Volkswagen Tiguan</strong><span>Ready to view · Lavington</span></div><div className="original-feature-price"><small>Drive-away</small><strong>KES 4.45M</strong></div></div></div><div className="original-feature-specs"><span><b>80,000</b><small>km</small></span><span><b>1.4L</b><small>turbo petrol</small></span><span><b>Auto</b><small>transmission</small></span></div></div>
      </div>
      <div className="original-search"><div className="original-search-fields"><div className="original-search-input"><Search size={18} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search make, model or stock number" /></div><div className="original-search-select"><CarFront size={16} /><select value={make} onChange={event => setMake(event.target.value)}><option>All makes</option>{makes.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div><Link href={searchHref} className="button button-red original-find-button">Find my car <ArrowRight size={16} /></Link></div><div className="original-popular"><span>Popular</span><Link href="/inventory?body=SUV">SUVs</Link><Link href="/inventory?price=under3">Under KES 3M</Link><Link href="/inventory?fuel=Hybrid">Hybrid</Link><Link href="/inventory?status=Ready%20to%20view">Ready to view</Link></div></div>
    </section>
    <section className="original-stats-section"><StatStrip /></section>
    <section className="original-stock-section"><div className="original-section-heading"><div><p className="section-kicker">The Zara standard</p><h2>Cars you can buy<br />with your eyes open.</h2></div><Link href="/inventory" className="text-link">See all inventory <ArrowRight size={15} /></Link></div><div className="vehicle-grid original-vehicle-grid">{featured.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div></section>
    <section className="original-bottom-cta"><div><p className="section-kicker">Need a second look?</p><h2>Ask for the file.<br /><span>We will show it.</span></h2></div><WhatsAppButton /></section>
  </PageFrame>;
}
