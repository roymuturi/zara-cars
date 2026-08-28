import { Link } from "wouter";
import { ArrowLeft, FileCheck2, ShieldCheck, Lock, Scale, Award, Building2, CheckCircle2 } from "lucide-react";
import { PageFrame, WhatsAppButton } from "@/components/SiteChrome";

export default function LegalTrust() {
  return <PageFrame>
    <section className="page-container" style={{ paddingTop: "72px", paddingBottom: "96px" }}>
      <Link href="/" className="text-link" style={{ marginBottom: "28px" }}><ArrowLeft size={14} /> Back to home</Link>

      <p className="section-kicker">Trust & verification</p>
      <h1 className="section-heading">Legal, trust & standards</h1>
      <p className="context-copy">Zara Cars is built around transparency, compliance, and buyer protection. Below is how we handle legal licensing, data security, consumer rights, and operational standards.</p>

      <div className="trust-cta-row" style={{ margin: "48px 0" }}>
        <Link href="/inventory" className="button button-red">Browse verified stock</Link>
        <WhatsAppButton />
      </div>

      <div className="grid lg:grid-cols-[1.1fr_.9fr]" style={{ gap: "32px" }}>
        <div className="space-y-6">
          <div className="info-card">
            <div className="panel-heading">
              <Scale size={20} />
              <h3>Legal licensing & compliance</h3>
            </div>
            <p>We operate in compliance with Kenyan consumer protection law, fair-trading requirements, and motor-vehicle registration rules. We maintain current business registration, tax compliance, and dealership licensing where required.</p>
            <p className="feature-list"><FileCheck2 size={14} /> Verified business registration on file</p>
          </div>

          <div className="info-card">
            <div className="panel-heading">
              <Lock size={20} />
              <h3>Data security & privacy</h3>
            </div>
            <p>Your contact details, viewing preferences, and finance notes are treated as confidential. We do not sell or share personal data with unrelated third parties. Sensitive data is stored using encrypted access controls and retained only as long as needed.</p>
            <p className="feature-list"><ShieldCheck size={14} /> End-to-end confidentiality for buyer records</p>
          </div>

          <div className="info-card">
            <div className="panel-heading">
              <Award size={20} />
              <h3>Consumer protection</h3>
            </div>
            <p>Every advertised price is accompanied by a clear drive-away breakdown. Reservation deposits are refundable within the published terms. If a vehicle fails independent inspection, we offer a full deposit refund or transfer option.</p>
            <div className="trust-badge gold">
              <p className="font-extrabold">Buyer safeguards at a glance:</p>
              <p>• All-in pricing with no hidden fees</p>
              <p>• Refundable reserve within 48 hours</p>
              <p>• Independent inspection available on every unit</p>
              <p>• Clear paperwork and NTS support</p>
              <p>• WhatsApp trail for every enquiry and reservation</p>
            </div>
          </div>

          <div className="info-card">
            <div className="panel-heading">
              <Building2 size={20} />
              <h3>Company standards & quality assurance</h3>
            </div>
            <p>Zara Cars applies a consistent standard across stock intake, photography, pricing, and customer follow-up. Vehicles are presented with accurate mileage, condition notes, and verification history.</p>
            <p className="feature-list"><CheckCircle2 size={14} /> Standards reviewed before every listing goes live</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="info-card">
            <h2>Buyer protections</h2>
            <div className="verification-list">
              {[["All-in pricing", "The price you see is the price you pay. No hidden clearing fees."],
               ["Refundable reserve", "48-hour hold with full refund if plans change."],
               ["Independent inspection", "AA Kenya or equivalent stamp available on every car."],
               ["Clear paperwork", "Logbook, transfer, and NTS support included."],
               ["WhatsApp trail", "Every enquiry and reservation is logged and traceable."]].map(([title, body]) => (
                <div key={title} className="verification-item">
                  <CheckCircle2 size={18} />
                  <div><p className="font-extrabold">{title}</p><p>{body}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <h2>Questions?</h2>
            <p>If anything is unclear, ask us directly. We publish policies in plain English and Swahili.</p>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  </PageFrame>;
}
