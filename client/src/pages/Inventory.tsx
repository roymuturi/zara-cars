// White / Zara red / navy restoration: inventory is a marketplace cockpit with make logos, practical filters, and an honest 70-unit demo stock count.
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronDown, Filter, Grid2X2, List, MapPin, MoveHorizontal, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { MakeBadge, PageFrame, StatusPill, VehicleCard } from "@/components/SiteChrome";
import { compactMoney, makeMeta, vehicles } from "@/lib/stock";

const makeOptions = Object.keys(makeMeta);
const bodyOptions = ["SUV", "Sedan", "Pickup", "Hatchback", "Wagon", "MPV"];
const priceStep = 100000;
const priceFloor = Math.floor(Math.min(...vehicles.map(vehicle => vehicle.price)) / priceStep) * priceStep;
const priceCeiling = Math.ceil(Math.max(...vehicles.map(vehicle => vehicle.price)) / priceStep) * priceStep;
const formatRangeMoney = (value: number) => value >= 1000000 ? `KES ${(value / 1000000).toFixed(1)}M` : `KES ${Math.round(value / 1000)}K`;

export default function Inventory() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [make, setMake] = useState(params.get("make") ?? "All makes");
  const [status, setStatus] = useState("All status");
  const [body, setBody] = useState("All body types");
  const [priceRange, setPriceRange] = useState<[number, number]>([priceFloor, priceCeiling]);
  const [sort, setSort] = useState("Newest first");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [makeRailPage, setMakeRailPage] = useState(0);
  const makeScrollRef = useRef<HTMLDivElement>(null);
  const makeDragRef = useRef({ active: false, lastX: 0, lastTime: 0, velocity: 0, frame: 0 });
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const list = vehicles.filter(vehicle => {
      const searchable = `${vehicle.make} ${vehicle.model} ${vehicle.stockNo} ${vehicle.location} ${vehicle.body}`.toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (make === "All makes" || vehicle.make === make) && (status === "All status" || vehicle.status === status) && (body === "All body types" || vehicle.body === body) && vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    });
    return [...list].sort((a, b) => sort === "Price: low to high" ? a.price - b.price : sort === "Price: high to low" ? b.price - a.price : sort === "Mileage" ? a.mileage - b.mileage : sort === "Company: A-Z" ? `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`) : b.year - a.year);
  }, [body, make, priceRange, query, sort, status]);
  const clear = () => { setQuery(""); setMake("All makes"); setStatus("All status"); setBody("All body types"); setPriceRange([priceFloor, priceCeiling]); setSort("Newest first"); };
  const chooseMake = (nextMake: string) => { setMake(nextMake); setFiltersOpen(false); };
  const updateMakeRailPage = () => {
    const rail = makeScrollRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setMakeRailPage(maxScroll <= 0 ? 0 : Math.min(2, Math.round((rail.scrollLeft / maxScroll) * 2)));
  };
  const stopMakeMomentum = () => {
    if (makeDragRef.current.frame) window.cancelAnimationFrame(makeDragRef.current.frame);
    makeDragRef.current.frame = 0;
  };
  const beginMakeRailDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rail = makeScrollRef.current;
    if (!rail) return;
    stopMakeMomentum();
    makeDragRef.current = { active: true, lastX: event.clientX, lastTime: performance.now(), velocity: 0, frame: 0 };
    rail.classList.add("is-dragging");
    rail.setPointerCapture?.(event.pointerId);
  };
  const moveMakeRailDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = makeDragRef.current;
    const rail = makeScrollRef.current;
    if (!drag.active || !rail) return;
    const now = performance.now();
    const delta = event.clientX - drag.lastX;
    const elapsed = Math.max(8, now - drag.lastTime);
    rail.scrollLeft -= delta;
    drag.velocity = delta / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    if (Math.abs(delta) > 1) event.preventDefault();
  };
  const endMakeRailDrag = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const drag = makeDragRef.current;
    const rail = makeScrollRef.current;
    if (!drag.active || !rail) return;
    drag.active = false;
    rail.classList.remove("is-dragging");
    if (event) rail.releasePointerCapture?.(event.pointerId);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let momentum = reducedMotion ? 0 : -drag.velocity * 18;
    const coast = () => {
      if (Math.abs(momentum) < 0.15) {
        makeDragRef.current.frame = 0;
        return;
      }
      rail.scrollLeft += momentum;
      momentum *= 0.9;
      makeDragRef.current.frame = window.requestAnimationFrame(coast);
    };
    if (momentum) makeDragRef.current.frame = window.requestAnimationFrame(coast);
  };
  useEffect(() => {
    const rail = makeScrollRef.current;
    if (!rail) return;
    updateMakeRailPage();
    rail.addEventListener("scroll", updateMakeRailPage, { passive: true });
    window.addEventListener("resize", updateMakeRailPage);
    return () => {
      rail.removeEventListener("scroll", updateMakeRailPage);
      window.removeEventListener("resize", updateMakeRailPage);
      stopMakeMomentum();
    };
  }, []);
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (make !== "All makes") next.set("make", make);
    if (status !== "All status") next.set("status", status);
    if (body !== "All body types") next.set("body", body);
    if (priceRange[0] !== priceFloor) next.set("min", String(priceRange[0]));
    if (priceRange[1] !== priceCeiling) next.set("max", String(priceRange[1]));
    if (sort !== "Newest first") next.set("sort", sort);
    window.history.replaceState({}, "", `/inventory${next.toString() ? `?${next.toString()}` : ""}`);
  }, [body, make, priceRange, query, sort, status]);

  return <PageFrame><section className="page-hero inventory-hero"><div><p className="section-kicker">Zara Cars / Live stock</p><h1>Find the one<br /><span>that fits.</span></h1><p>Every unit below has a make, model, price, location, and real pipeline status. Filter it down, open the file, or send the stock number to a human.</p></div><div className="page-hero-aside"><strong>{vehicles.length}</strong><span>demo units mapped<br />across our Kenya network</span><Link href="/dealer" className="text-link">Manage dealer stock <ArrowRight size={15} /></Link></div></section>
    <section className="inventory-workspace"><div className="make-rail"><div><p className="section-kicker">Browse by company</p><h2>Start with a make.</h2></div><button className={`make-rail-all ${make === "All makes" ? "active" : ""}`} onClick={() => chooseMake("All makes")}>All makes <span>{vehicles.length}</span></button><div className="make-logo-track"><div ref={makeScrollRef} className="make-logo-scroll" role="region" aria-label="Browse vehicle makes" onPointerDown={beginMakeRailDrag} onPointerMove={moveMakeRailDrag} onPointerUp={endMakeRailDrag} onPointerCancel={endMakeRailDrag}>{makeOptions.map(item => <button key={item} className={`make-logo-button ${make === item ? "active" : ""}`} onClick={() => chooseMake(item)} aria-label={`Filter by ${item}`}><MakeBadge make={item} /></button>)}</div><div className="make-rail-dots" aria-hidden="true">{[0, 1, 2].map(index => <span key={index} className={makeRailPage === index ? "active" : ""} />)}</div><p className="make-rail-hint"><MoveHorizontal size={13} /> Swipe for more</p></div></div>
      <div className="inventory-toolbar"><div className="inventory-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search model, location or stock no." /></div><button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} /> Filters</button><div className="sort-wrap"><span>Sort</span><select value={sort} onChange={event => setSort(event.target.value)}><option>Newest first</option><option>Company: A-Z</option><option>Price: low to high</option><option>Price: high to low</option><option>Mileage</option></select><ChevronDown size={14} /></div><div className="view-toggle"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 size={16} /></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view"><List size={17} /></button></div></div>
      <div className={`inventory-filters ${filtersOpen ? "open" : ""}`}><div><label>Make</label><select value={make} onChange={event => setMake(event.target.value)}><option>All makes</option>{makeOptions.map(item => <option key={item}>{item}</option>)}</select></div><div><label>Status</label><select value={status} onChange={event => setStatus(event.target.value)}><option>All status</option><option>Ready to view</option><option>Duty paid</option><option>Reserved</option><option>In transit</option><option>Clearing</option></select></div><div><label>Body type</label><select value={body} onChange={event => setBody(event.target.value)}><option>All body types</option>{bodyOptions.map(item => <option key={item}>{item}</option>)}</select></div><div className="price-range-filter"><div className="price-range-label"><label>Price range</label><strong>{formatRangeMoney(priceRange[0])} — {formatRangeMoney(priceRange[1])}</strong></div><div className="price-range-track"><span style={{ left: `${((priceRange[0] - priceFloor) / (priceCeiling - priceFloor)) * 100}%`, right: `${100 - ((priceRange[1] - priceFloor) / (priceCeiling - priceFloor)) * 100}%` }} /><input type="range" min={priceFloor} max={priceCeiling} step={priceStep} value={priceRange[0]} onChange={event => { const next = Number(event.target.value); setPriceRange(([, currentMax]) => [Math.min(next, currentMax - priceStep), currentMax]); }} aria-label="Minimum price" /><input type="range" min={priceFloor} max={priceCeiling} step={priceStep} value={priceRange[1]} onChange={event => { const next = Number(event.target.value); setPriceRange(([currentMin]) => [currentMin, Math.max(next, currentMin + priceStep)]); }} aria-label="Maximum price" /></div></div><button className="clear-filters" onClick={clear}><RotateCcw size={14} /> Clear filters</button></div>
      <div className="inventory-pulse"><div className="pulse-lead"><span>Stock pulse</span><strong>{vehicles.length}</strong><small>units in the Kenya demo desk</small></div>{(["Ready to view", "Duty paid", "In transit"] as const).map(item => <div key={item}><StatusPill status={item} /><strong>{vehicles.filter(vehicle => vehicle.status === item).length}</strong><small>{item === "Ready to view" ? "viewings open" : item === "Duty paid" ? "paperwork ready" : "arriving soon"}</small></div>)}</div><div className="inventory-results-head" aria-live="polite"><span><strong>{filtered.length}</strong> units match your search</span><span className="location-note"><MapPin size={14} /> Kenya · viewings by appointment</span></div>{filtered.length ? <div className={view === "grid" ? "vehicle-grid" : "vehicle-list"}>{filtered.map(vehicle => view === "grid" ? <VehicleCard key={vehicle.id} vehicle={vehicle} /> : <Link key={vehicle.id} href={`/inventory/${vehicle.id}`} className="vehicle-row"><img src={vehicle.image} alt="" /><div><div className="eyebrow">{vehicle.stockNo} · {vehicle.year} · {vehicle.make}</div><h3>{vehicle.model}</h3><p>{vehicle.trim} · {vehicle.location}</p></div><StatusPill status={vehicle.status} /><strong>{compactMoney(vehicle.price)}</strong><ArrowRight size={18} /></Link>)}</div> : <div className="empty-state"><Filter size={22} /><h3>No units match those filters.</h3><p>Try a broader make, status, or body type.</p><button className="text-link" onClick={clear}>Reset search <ArrowRight size={15} /></button></div>}
    </section></PageFrame>;
}
