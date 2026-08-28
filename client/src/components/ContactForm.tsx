import { useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { WhatsAppButton } from "@/components/SiteChrome";
import { scrollToId } from "@/lib/utils";

export function ContactForm() {
  const contactMethods = ["WhatsApp", "Phone", "Email"] as const;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<(typeof contactMethods)[number]>("WhatsApp");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-form" className="contact-form-section">
      <div className="contact-form">
        <h2>Send us a message</h2>
        <p>Ask for a walkaround, a second look at the paperwork, or a quiet viewing slot. We reply within minutes on WhatsApp.</p>
        {submitted ? (
          <div className="contact-success">
            <Check size={48} />
            <h3>Message sent.</h3>
            <p>A Zara Cars specialist will get back to you shortly — usually within minutes on WhatsApp.</p>
            <button className="button button-red" onClick={() => setSubmitted(false)}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label>Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control-input"
                  placeholder="e.g. Wanjiku Kamau"
                  required
                />
              </div>
              <div className="contact-field">
                <label>M-Pesa / WhatsApp number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control-input"
                  placeholder="07XX XXX XXX"
                  required
                />
              </div>
              <div className="contact-field">
                <label>Preferred contact method</label>
                <div className="contact-method-toggle">
                  {contactMethods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`loan-type-btn ${method === m ? "active" : ""}`}
                      onClick={() => setMethod(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="contact-field">
                <label>Your message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control-input"
                  placeholder="What can we help you with?"
                  rows={4}
                  required
                />
              </div>
            </div>
            <button type="submit" className="button button-red">
              Send message <ArrowRight size={16} />
            </button>
          </form>
        )}
        <div className="contact-whatsapp-option">
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
