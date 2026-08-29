// Inventory cockpit: server-side filtered/paginated stock sourced from the data
// layer. There is no in-memory catalogue — filters, makes, years and status all
// resolve to canonical values from the backend.
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Grid2X2,
  List,
  MapPin,
  RotateCcw,
  Search,
} from "lucide-react";
import { Link } from "wouter";
import { PageFrame, StatusPill, VehicleCard } from "@/components/SiteChrome";
import { VehicleImage } from "@/components/VehicleImage";
import { compactMoney } from "@/lib/formatters";
import { useVehicles, useVehicleMakes } from "@/hooks/useVehicles";
import { parseFilters } from "@/data/vehicles/vehicle.api";
import type {
  VehicleFilters,
  VehicleSort,
} from "@/data/vehicles/vehicle.types";
import {
  VEHICLE_STATUSES,
  STATUS_LABELS,
  BODY_TYPES,
} from "@/data/vehicles/vehicle.types";

const bodyOptions = ["All body types", ...BODY_TYPES];
const statusOptions = [
  { label: "All status", value: "" },
  ...VEHICLE_STATUSES.filter(s => s !== "sold" && s !== "draft").map(s => ({
    label: STATUS_LABELS[s],
    value: s,
  })),
];
const sortOptions: { label: string; value: VehicleSort }[] = [
  { label: "Newest first", value: "year-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Mileage", value: "mileage-asc" },
  { label: "Company: A-Z", value: "name-asc" },
];
const priceOptions = [
  { label: "Any price", value: "" },
  { label: "KES 1M", value: 1000000 },
  { label: "KES 2M", value: 2000000 },
  { label: "KES 3M", value: 3000000 },
  { label: "KES 5M", value: 5000000 },
];

export default function Inventory() {
  const initialFilters = useMemo(() => {
    const params: Record<string, string | null | undefined> = {};
    new URLSearchParams(window.location.search).forEach((v, k) => {
      params[k] = v;
    });
    return parseFilters(params);
  }, []);

  const [query, setQuery] = useState(initialFilters.search ?? "");
  const [make, setMake] = useState(initialFilters.make ?? "All makes");
  const [model, setModel] = useState(initialFilters.model ?? "All models");
  const [year, setYear] = useState<string>(initialFilters.year ?? "");
  const [status, setStatus] = useState<string>(initialFilters.status ?? "");
  const [body, setBody] = useState(initialFilters.body ?? "All body types");
  const [maxPrice, setMaxPrice] = useState<number | "">(
    () => initialFilters.maxPrice ?? ""
  );
  const [sort, setSort] = useState<VehicleSort>(
    initialFilters.sort ?? "year-desc"
  );
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: makesData } = useVehicleMakes();
  const makes = useMemo(() => makesData ?? [], [makesData]);

  const filters: VehicleFilters = useMemo(() => {
    const f: VehicleFilters = { sort, limit: 24 };
    if (query.trim()) f.search = query.trim();
    if (make !== "All makes") f.make = make;
    if (model !== "All models") f.model = model;
    if (year !== "") f.year = year;
    if (status !== "") f.status = status;
    if (body !== "All body types") f.body = body;
    if (maxPrice !== "") f.maxPrice = Number(maxPrice);
    return f;
  }, [query, make, model, year, status, body, maxPrice, sort]);

  const { data: vehicles, loading, error } = useVehicles(filters);
  const list = useMemo(() => vehicles ?? [], [vehicles]);

  const modelOptions = useMemo(() => {
    const pool = list;
    const subset =
      make === "All makes" ? pool : pool.filter(v => v.make === make);
    return ["All models", ...Array.from(new Set(subset.map(v => v.model)))];
  }, [list, make]);

  const yearOptions = useMemo(() => {
    const ys = Array.from(new Set(list.map(v => v.year))).sort((a, b) => b - a);
    return ["All years", ...ys];
  }, [list]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (make !== "All makes") next.set("make", make);
    if (model !== "All models") next.set("model", model);
    if (year !== "") next.set("year", year);
    if (status !== "") next.set("status", status);
    if (body !== "All body types") next.set("body", body);
    if (maxPrice !== "") next.set("max", String(maxPrice));
    if (sort !== "year-desc") next.set("sort", sort);
    window.history.replaceState(
      {},
      "",
      `/inventory${next.toString() ? `?${next.toString()}` : ""}`
    );
  }, [query, make, model, year, status, body, maxPrice, sort]);

  const clear = () => {
    setQuery("");
    setMake("All makes");
    setModel("All models");
    setYear("");
    setStatus("");
    setBody("All body types");
    setMaxPrice("");
    setSort("year-desc");
  };

  return (
    <PageFrame>
      <section className="page-hero inventory-hero">
        <div>
          <p className="section-kicker">Zara Cars / Live stock</p>
          <h1>
            Find the one <br />
            <span className="red-line">that fits.</span>
          </h1>
          <p>
            Every unit below has a make, model, price, location, and real
            pipeline status. Filter it down, open the file, or send the stock
            number to a human.
          </p>
        </div>
      </section>
      <section className="inventory-workspace">
        <div className="inventory-toolbar">
          <div className="inventory-search">
            <Search size={17} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search model, location or stock no."
              aria-label="Search vehicles"
            />
          </div>
          <div className="sort-wrap">
            <span>Sort</span>
            <select
              value={sort}
              onChange={event => setSort(event.target.value as VehicleSort)}
              aria-label="Sort results"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
          <div className="view-toggle">
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              <Grid2X2 size={16} />
            </button>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <List size={17} />
            </button>
          </div>
        </div>
        <div className="inventory-filters">
          <div className="filter-compact">
            <label>Make</label>
            <select
              value={make}
              onChange={event => {
                setMake(event.target.value);
                setModel("All models");
              }}
            >
              <option>All makes</option>
              {makes.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="filter-compact">
            <label>Model</label>
            <select
              value={model}
              onChange={event => setModel(event.target.value)}
            >
              {modelOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-compact">
            <label>Year</label>
            <select
              value={year}
              onChange={event => setYear(event.target.value)}
            >
              {yearOptions.map((item, i) => (
                <option
                  key={i}
                  value={item === "All years" ? "" : String(item)}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-compact">
            <label>Status</label>
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-compact">
            <label>Body</label>
            <select
              value={body}
              onChange={event => setBody(event.target.value)}
            >
              {bodyOptions.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-compact">
            <label>Max price</label>
            <select
              value={maxPrice}
              onChange={event =>
                setMaxPrice(
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
            >
              {priceOptions.map(option => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="clear-filters"
            onClick={clear}
            aria-label="Clear all filters"
          >
            <RotateCcw size={20} /> Clear all
          </button>
        </div>
        <div className="inventory-results-head" aria-live="polite">
          <span>
            <strong>{list.length}</strong> units match your filters
          </span>
          <span className="location-note">
            <MapPin size={16} /> Kenya · viewings by appointment
          </span>
        </div>
        {loading && (
          <p className="loading-state" aria-live="polite">
            Loading inventory…
          </p>
        )}
        {error && (
          <p className="loading-state" aria-live="polite">
            Inventory service not available. Connect a Supabase project to
            browse live stock.
          </p>
        )}
        {!loading && !error && list.length === 0 && (
          <div className="empty-state">
            <Filter size={22} />
            <h3>No units match those filters.</h3>
            <p>Try a broader make, model, year, status, or body type.</p>
            <button className="text-link" onClick={clear}>
              Reset search <ArrowRight size={20} />
            </button>
          </div>
        )}
        {!loading && !error && list.length > 0 && (
          <div className={view === "grid" ? "vehicle-grid" : "vehicle-list"}>
            {list.map(vehicle =>
              view === "grid" ? (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ) : (
                <Link
                  key={vehicle.id}
                  href={`/inventory/${vehicle.id}`}
                  className="vehicle-row"
                >
                  <VehicleImage
                    objectKey={
                      vehicle.images?.find(i => i.isPrimary)?.objectKey ??
                      vehicle.images?.[0]?.objectKey
                    }
                    publicUrl={vehicle.image}
                    profile="vehicle-thumb"
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="vehicle-row-img"
                  />
                  <div>
                    <div className="eyebrow">
                      {vehicle.stockNo} · {vehicle.year} · {vehicle.make}
                    </div>
                    <h3>{vehicle.model}</h3>
                    <p>
                      {vehicle.variant} · {vehicle.location}
                    </p>
                  </div>
                  <StatusPill status={vehicle.status} />
                  <strong>{compactMoney(vehicle.price)}</strong>
                  <ArrowRight size={18} />
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </PageFrame>
  );
}
