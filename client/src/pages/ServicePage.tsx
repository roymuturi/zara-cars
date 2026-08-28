// Liquid Safari reminder: supporting pages should carry the same glass, orbit, Kenyan context, and no-pressure voice as the showroom and dealer cockpit.
import { useState, useMemo } from "react";
import { ArrowRight, BadgeCheck, Banknote, CalendarDays, CarFront, Check, FileCheck2, Globe2, MapPin, MessageCircle, ShieldCheck, Tag, Truck } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, WhatsAppButton } from "@/components/SiteChrome";
import { makeMeta, money, compactMoney, vehicles } from "@/lib/stock";

type ServiceType = "finance" | "trade" | "diaspora" | "about" | "contact" | "legal";
const content: Record<ServiceType, { eyebrow: string; title: string; intro: string; actions: string[]; icon: typeof Banknote }> = {
  finance: { eyebrow: "Finance, without the fog", title: "Make the monthly\nnumber make sense.", intro: "Start with the car, your comfortable monthly range, and the deposit you have in mind. We match the next conversation to Kenyan finance partners and show the assumptions clearly.", actions: ["Choose a car", "See a sample repayment", "Talk to a finance guide"], icon: Banknote },
  trade: { eyebrow: "Trade in / Sell on", title: "Your next car can\nstart with the old one.", intro: "Share the vehicle you have today and our team will help you understand its likely range, paperwork, and the cleanest path into your next Zara Cars unit.", actions: ["Tell us about your car", "Get a range", "Book a handover"], icon: Truck },
  diaspora: { eyebrow: "Diaspora desk", title: "A Nairobi handover,\nwherever you are.", intro: "We help buyers abroad stay close to the details: verified stock, guided video viewings, paperwork updates, and a clear handover plan for family or a driver in Kenya.", actions: ["Browse ready stock", "Request a video viewing", "Ask for a handover plan"], icon: Globe2 },
  about: { eyebrow: "The Zara Cars standard", title: "Less showroom theatre.\nMore useful detail.", intro: "Zara Cars is built around the moments that matter when buying in Kenya: the real price, the condition file, the location, and a person who will answer the follow-up.", actions: ["See live stock", "Meet the dealer team", "Read our trust file"], icon: ShieldCheck },
  contact: { eyebrow: "The Nairobi team", title: "Bring us the\nquestion you have.", intro: "Ask for a walkaround, a second look at the paperwork, or a quiet viewing slot. We are happiest when the next step is clear on both sides.", actions: ["WhatsApp the showroom", "Call +254 700 000 000", "Book a viewing"], icon: MessageCircle },
  legal: { eyebrow: "Trust & verification", title: "Nothing important\nshould stay hidden.", intro: "Our vehicle records make room for the details Kenyan buyers need: duty status, auction sheet, inspection notes, service history, and a price that explains itself.", actions: ["Browse verified stock", "Ask for a condition file", "Talk to the team"], icon: FileCheck2 },
};

const financeTerms = [12, 24, 36, 48, 60, 72];
const tradeConditions = ["Excellent", "Good", "Fair", "Needs work"];
const loanTypes = [{ id: "salary", label: "Salaried", apr: 0.187, term: 60 }, { id: "business", label: "Business", apr: 0.237, term: 48 }];

export default function ServicePage({ type }: { type: ServiceType }) {
  const page = content[type];
  const Icon = page.icon;
  return <PageFrame><section className="service-hero"><div><p className="section-kicker">{page.eyebrow}</p><h1>{page.title.split("\n").map((line, index) => <span key={line} className={index === 1 ? "red-line" : ""}>{line}<br /></span>)}</h1><p>{page.intro}</p><div className="hero-actions">{type === "finance" ? <Link href="#finance-calculator" className="button button-red">{page.actions[0]} <ArrowRight size={16} /></Link> : type === "trade" ? <Link href="#trade-in-form" className="button button-red">{page.actions[0]} <ArrowRight size={16} /></Link> : <Link href={type === "contact" ? "https://wa.me/254700000000" : "/inventory"} className="button button-red">{page.actions[0]} <ArrowRight size={16} /></Link>}</div></div><div className="service-orbit-card"><span className="service-icon"><Icon size={24} /></span><small>Designed around the next step</small><strong>{page.actions[1]}</strong><p>Clear, local, and ready for a real conversation.</p><div className="service-checks"><span><Check size={14} /> Kenyan context</span><span><Check size={14} /> No pressure language</span><span><Check size={14} /> Human follow-up</span></div></div></section><section className="service-grid"><div><p className="section-kicker">How it works</p><h2>Small steps.<br />Fewer unknowns.</h2></div><div className="service-steps"><div><span>01</span><div><strong>{page.actions[0]}</strong><p>Start with what you know, then let the team fill in the gaps without making you repeat yourself.</p></div><CarFront size={19} /></div><div><span>02</span><div><strong>{page.actions[1]}</strong><p>Get a practical next step based on the actual unit, location, status, and paperwork.</p></div><FileCheck2 size={19} /></div><div><span>03</span><div><strong>{page.actions[2]}</strong><p>Move forward only when the details feel right. A viewing, a call, or a WhatsApp answer is enough.</p></div><CalendarDays size={19} /></div></div></section>{type === "finance" && <FinanceCalculator />}{type === "trade" && <TradeInForm />}<section className="service-cta"><div><p className="section-kicker">Ready when you are</p><h2>Good cars deserve<br />clear decisions.</h2></div><Link href="/inventory" className="button button-red">See live stock <ArrowRight size={16} /></Link>{(type === "finance" || type === "trade") && <WhatsAppButton />}</section></PageFrame>;
}

function FinanceCalculator() {
  const available = vehicles.filter(v => v.status !== "Reserved");
  const [selectedId, setSelectedId] = useState(available[0]?.id ?? "");
  const [deposit, setDeposit] = useState("");
  const [term, setTerm] = useState(36);
  const [loanType, setLoanType] = useState<"salary" | "business">("salary");
  const selected = available.find(v => v.id === selectedId);
  const apr = loanType === "salary" ? 0.187 : 0.237;
  const calculated = useMemo(() => {
    if (!selected) return null;
    const principal = selected.price - Number(deposit || 0);
    if (principal <= 0) return null;
    const monthlyRate = apr / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return { price: selected.price, principal, payment: Math.round(payment) };
  }, [selected, deposit, term, apr]);
  const salaryPayment = useMemo(() => {
    if (!selected) return null;
    const principal = selected.price - Number(deposit || 0);
    if (principal <= 0) return null;
    const monthlyRate = 0.187 / 12;
    const p = principal * (monthlyRate * Math.pow(1 + monthlyRate, 60)) / (Math.pow(1 + monthlyRate, 60) - 1);
    return Math.round(p);
  }, [selected, deposit]);
  const businessPayment = useMemo(() => {
    if (!selected) return null;
    const principal = selected.price - Number(deposit || 0);
    if (principal <= 0) return null;
    const monthlyRate = 0.237 / 12;
    const p = principal * (monthlyRate * Math.pow(1 + monthlyRate, 48)) / (Math.pow(1 + monthlyRate, 48) - 1);
    return Math.round(p);
  }, [selected, deposit]);
  return <section id="finance-calculator" className="finance-calculator-section"><div className="finance-calculator"><h2>Finance calculator</h2><p>Select a car and play with the numbers. Rates shown below are Gybird-style benchmarks for salaried and business borrowers — final terms depend on individual approval.</p><div className="calculator-grid"><div className="calculator-field"><label>Choose a car</label><select value={selectedId} onChange={e => setSelectedId(e.target.value)} className="form-control-input"><option value="">— Select —</option>{available.map(v => <option key={v.id} value={v.id}>{v.make} {v.model} ({v.year}) — {compactMoney(v.price)}</option>)}</select></div><div className="calculator-field"><label>Deposit (KES)</label><input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} className="form-control-input" placeholder="e.g. 500000" min="0" /></div><div className="calculator-field"><label>Loan type</label><div className="loan-type-toggle"><button type="button" className={`loan-type-btn ${loanType === "salary" ? "active" : ""}`} onClick={() => setLoanType("salary")}>Salaried (18.7%, 60 mo)</button><button type="button" className={`loan-type-btn ${loanType === "business" ? "active" : ""}`} onClick={() => setLoanType("business")}>Business (23.7%, 48 mo)</button></div>{loanType === "salary" ? <select value={term} onChange={e => setTerm(Number(e.target.value))} className="form-control-input" style={{ marginTop: "10px" }}>{financeTerms.map(t => <option key={t} value={t}>{t} months</option>)}</select> : <select value={term} onChange={e => setTerm(Number(e.target.value))} className="form-control-input" style={{ marginTop: "10px" }}>{financeTerms.map(t => <option key={t} value={t}>{t} months</option>)}</select>}</div></div><div className="calculator-result"><div className="result-row"><span>Car price</span><strong>{selected ? money(selected.price) : "—"}</strong></div><div className="result-row"><span>Deposit</span><strong>- KES {Number(deposit || 0).toLocaleString("en-KE")}</strong></div><div className="result-row"><span>Principal</span><strong>{calculated ? money(calculated.principal) : "—"}</strong></div><div className="result-row result-payment"><span>Est. monthly ({loanType === "salary" ? "Salaried" : "Business"})</span><strong>{calculated ? money(calculated.payment) : "—"}</strong></div><div className="result-comparison"><small>Salaried est.:</small><strong>{salaryPayment ? money(salaryPayment) : "—"}</strong><small>Business est.:</small><strong>{businessPayment ? money(businessPayment) : "—"}</strong></div></div><div className="calculator-assumptions"><span><BadgeCheck size={14} /> Benchmark rates for Kenyan market</span><span><Tag size={14} /> Price includes registration and all fees</span></div></div></section>;
}

function TradeInForm() {
  const makes = Object.keys(makeMeta);
  const [make, setMake] = useState(makes[0] ?? "");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: import("react").FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return <section id="trade-in-form" className="trade-in-section"><div className="trade-in-form"><h2>Tell us about your car</h2><p>Share the basics and we will get back with a likely range within one business day. No pressure, no obligation.</p>{submitted ? <div className="trade-in-success"><Check size={48} /><h3>Thank you</h3><p>We have your details and will be in touch within one business day with a valuation range and next steps.</p><button className="button button-red" onClick={() => setSubmitted(false)}>Submit another vehicle</button></div> : <form onSubmit={handleSubmit}><div className="trade-form-grid"><div className="trade-field"><label>Make</label><select value={make} onChange={e => setMake(e.target.value)} className="form-control-input">{makes.map(m => <option key={m} value={m}>{m}</option>)}</select></div><div className="trade-field"><label>Model</label><input type="text" value={model} onChange={e => setModel(e.target.value)} className="form-control-input" placeholder="e.g. Harrier, RAV4, Tiguan" required /></div><div className="trade-field"><label>Year</label><input type="number" value={year} onChange={e => setYear(e.target.value)} className="form-control-input" placeholder="e.g. 2019" min="1980" max="2026" required /></div><div className="trade-field"><label>Mileage (km)</label><input type="number" value={mileage} onChange={e => setMileage(e.target.value)} className="form-control-input" placeholder="e.g. 80000" min="0" required /></div><div className="trade-field"><label>Condition</label><select value={condition} onChange={e => setCondition(e.target.value)} className="form-control-input" required><option value="">— Select —</option>{tradeConditions.map(c => <option key={c} value={c}>{c}</option>)}</select></div></div><button type="submit" className="button button-red">Get my estimate <ArrowRight size={15} /></button></form>}</div></section>;
}