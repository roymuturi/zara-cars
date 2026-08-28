// White / Zara red / navy restoration: inventory is a marketplace cockpit with make logos, practical filters, and an honest 70-unit demo stock count.
import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronDown, Filter, Grid2X2, List, MapPin, RotateCcw, Search } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, StatusPill, VehicleCard } from "@/components/SiteChrome";
import { compactMoney, makeMeta, vehicles } from "@/lib/stock";

const makeOptions = Object.keys(makeMeta);
const bodyOptions = ["SUV", "Sedan", "Pickup", "Hatchback", "Wagon", "MPV"];
const yearOptions = Array.from(new Set(vehicles.map(v => v.year))).sort((a, b) => b - a);
const modelOptions = (selectedMake: string) => selectedMake === "All makes" ? Array.from(new Set(vehicles.map(v => v.model))) : Array.from(new Set(vehicles.filter(v => v.make === selectedMake).map(v => v.model)));
const priceStep = 100000;
const priceFloor = Math.floor(Math.min(...vehicles.map(vehicle => vehicle.price)) / priceStep) * priceStep;
const priceCeiling = Math.ceil(Math.max(...vehicles.map(vehicle => vehicle.price)) / priceStep) * priceStep;

export default function Inventory() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [make, setMake] = useState(params.get("make") ?? "All makes");
  const [model, setModel] = useState(params.get("model") ?? "All models");
  const [year, setYear] = useState(params.get("year") ?? "All years");
  const [status, setStatus] = useState("All status");
  const [body, setBody] = useState("All body types");
  const [priceRange, setPriceRange] = useState<[number, number]>([priceFloor, priceCeiling]);
  const [sort, setSort] = useState(params.get("sort") ?? "Newest first");
  const [view, setView] = useState<"grid" | "list">("grid");
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const list = vehicles.filter(vehicle => {
      const searchable = `${vehicle.make} ${vehicle.model} ${vehicle.stockNo} ${vehicle.location} ${vehicle.body}`.toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (make === "All makes" || vehicle.make === make) && (model === "All models" || vehicle.model === model) && (year === "All years" || String(vehicle.year) === year) && (status === "All status" || vehicle.status === status) && (body === "All body types" || vehicle.body === body) && vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    });
    return [...list].sort((a, b) => {
      if (sort === "Price: low to high") return a.price - b.price || a.mileage - b.mileage || b.year - a.year;
      if (sort === "Price: high to low") return b.price - a.price || b.mileage - b.mileage || b.year - a.year;
      if (sort === "Mileage") return a.mileage - b.mileage || a.price - b.price || b.year - a.year;
      if (sort === "Company: A-Z") return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`) || a.price - b.price || b.year - a.year;
      return b.year - a.year || b.price - a.price;
    });
  }, [body, make, model, priceRange, query, sort, status, year]);
  const clear = () => { setQuery(""); setMake("All makes"); setModel("All models"); setYear("All years"); setStatus("All status"); setBody("All body types"); setPriceRange([priceFloor, priceCeiling]); setSort("Newest first"); };
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (make !== "All makes") next.set("make", make);
    if (model !== "All models") next.set("model", model);
    if (year !== "All years") next.set("year", year);
    if (status !== "All status") next.set("status", status);
    if (body !== "All body types") next.set("body", body);
    if (priceRange[0] !== priceFloor) next.set("min", String(priceRange[0]));
    if (priceRange[1] !== priceCeiling) next.set("max", String(priceRange[1]));
    if (sort !== "Newest first") next.set("sort", sort);
    window.history.replaceState({}, "", `/inventory${next.toString() ? `?${next.toString()}` : ""}`);
  }, [body, make, priceRange, query, sort, status]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [make, model, year, status, body]);

  return <PageFrame><section className="page-hero inventory-hero"><div><p className="section-kicker">Zara Cars / Live stock</p><h1>Find the one <br /><span className="red-line">that fits.</span></h1><p>Every unit below has a make, model, price, location, and real pipeline status. Filter it down, open the file, or send the stock number to a human.</p></div></section>
    <section className="inventory-workspace">
      <div className="inventory-toolbar"><div className="inventory-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search model, location or stock no." aria-label="Search vehicles" /></div><div className="sort-wrap"><span>Sort</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort results"><option>Newest first</option><option>Price: low to high</option><option>Price: high to low</option><option>Mileage</option></select><ChevronDown size={16} /></div><div className="view-toggle"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 size={16} /></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view"><List size={17} /></button></div></div>
      <div className="inventory-filters"><div className="filter-compact"><label>Make</label><select value={make} onChange={event => { setMake(event.target.value); setModel("All models"); }}><option>All makes</option>{makeOptions.map(item => <option key={item}>{item}</option>)}</select></div><div className="filter-compact"><label>Model</label><select value={model} onChange={event => setModel(event.target.value)}><option>All models</option>{modelOptions(make).map(item => <option key={item}>{item}</option>)}</select></div><div className="filter-compact"><label>Year</label><select value={year} onChange={event => setYear(event.target.value)}><option>All years</option>{yearOptions.map(item => <option key={item} value={String(item)}>{item}</option>)}</select></div><div className="filter-compact"><label>Status</label><select value={status} onChange={event => setStatus(event.target.value)}><option>All status</option><option>Ready to view</option><option>Duty paid</option><option>Reserved</option><option>In transit</option><option>Clearing</option></select></div><div className="filter-compact"><label>Body</label><select value={body} onChange={event => setBody(event.target.value)}><option>All body types</option>{bodyOptions.map(item => <option key={item}>{item}</option>)}</select></div><div className="filter-compact"><label>Max price</label><select value={priceRange[1]} onChange={event => setPriceRange([priceFloor, Number(event.target.value)])}><option value={priceCeiling}>Any price</option><option value={1000000}>KES 1M</option><option value={2000000}>KES 2M</option><option value={3000000}>KES 3M</option><option value={5000000}>KES 5M</option></select></div><button className="clear-filters" onClick={clear} aria-label="Clear all filters"><RotateCcw size={16} /> Clear all</button></div>
      <div className="inventory-results-head" aria-live="polite"><span><strong>{filtered.length}</strong> units match your search</span><span className="location-note"><MapPin size={16} /> Kenya · viewings by appointment</span></div>{filtered.length ? <div className={view === "grid" ? "vehicle-grid" : "vehicle-list"}>{filtered.map(vehicle => view === "grid" ? <VehicleCard key={vehicle.id} vehicle={vehicle} /> : <Link key={vehicle.id} href={`/inventory/${vehicle.id}`} className="vehicle-row"><img src={vehicle.image} alt="" /><div><div className="eyebrow">{vehicle.stockNo} · {vehicle.year} · {vehicle.make}</div><h3>{vehicle.model}</h3><p>{vehicle.trim} · {vehicle.location}</p></div><StatusPill status={vehicle.status} /><strong>{compactMoney(vehicle.price)}</strong><ArrowRight size={18} /></Link>)}</div> : <div className="empty-state"><Filter size={22} /><h3>No units match those filters.</h3><p>Try a broader make, model, year, status, or body type.</p><button className="text-link" onClick={clear}>Reset search <ArrowRight size={15} /></button></div>}
    </section></PageFrame>;
}
