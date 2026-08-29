import { Link } from "wouter";
import { Home } from "lucide-react";
import { PageFrame } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <PageFrame>
      <section
        className="page-container"
        style={{ padding: "100px 24px", textAlign: "center" }}
      >
        <div
          className="info-card"
          style={{ maxWidth: "520px", margin: "0 auto", padding: "48px" }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "80px",
              height: "80px",
              margin: "0 auto 24px",
              borderRadius: "16px",
              background: "rgba(217,47,61,.08)",
            }}
          >
            <h1
              className="section-kicker"
              style={{ fontSize: "48px", letterSpacing: "normal" }}
            >
              404
            </h1>
          </div>
          <h2>Page not found</h2>
          <p className="context-copy">
            Sorry, the page you are looking for doesn't exist. It may have been
            moved or deleted.
          </p>
          <Link
            href="/"
            className="button button-red"
            style={{ marginTop: "24px" }}
          >
            <Home size={16} /> Go home
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
