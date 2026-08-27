// SEO metadata manager: public routes are indexable, while dealer operations stay out of search results.
import { useEffect } from "react";
import { useLocation } from "wouter";
import { vehicles } from "@/lib/stock";

const siteOrigin = import.meta.env.VITE_SITE_ORIGIN || "https://zara-cars.manus.space";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Zara Cars | Good cars. Clear decisions.", description: "Premium, verified stock for Nairobi roads and beyond. Browse clear prices, practical specifications, and next steps with Zara Cars." },
  "/inventory": { title: "Cars for sale in Kenya | Zara Cars", description: "Browse 70 Kenyan demo units by make, body type, price, status, mileage, and location." },
  "/financing": { title: "Car finance options in Kenya | Zara Cars", description: "Explore clear vehicle finance guidance and monthly-payment planning from Zara Cars." },
  "/trade-in": { title: "Value your trade-in in Kenya | Zara Cars", description: "Start a clear trade-in conversation with Zara Cars and move into your next vehicle." },
  "/diaspora": { title: "Diaspora vehicle support | Zara Cars", description: "Buy and coordinate verified Kenyan vehicle stock with practical support from abroad." },
  "/about": { title: "About Zara Cars Kenya", description: "Meet Zara Cars, a calmer way to browse verified vehicles for Nairobi and beyond." },
  "/contact": { title: "Contact Zara Cars", description: "Speak to the Zara Cars showroom about stock, viewings, finance, and trade-ins." },
  "/legal": { title: "Trust and verification | Zara Cars", description: "Understand how Zara Cars presents vehicle details, pricing, and viewing information." },
};

function setMeta(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) { element = document.createElement("meta"); element.name = name; document.head.appendChild(element); }
  element.content = content;
}

function setProperty(property: string, content: string) {
  let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) { element = document.createElement("meta"); element.setAttribute("property", property); document.head.appendChild(element); }
  element.content = content;
}

function setJsonLd(data: unknown) {
  let element = document.head.querySelector("script[data-zara-jsonld]") as HTMLScriptElement | null;
  if (!element) { element = document.createElement("script"); element.type = "application/ld+json"; element.dataset.zaraJsonld = "true"; document.head.appendChild(element); }
  element.textContent = JSON.stringify(data);
}

export default function SEO() {
  const [location] = useLocation();
  useEffect(() => {
    const vehicleId = location.match(/^\/inventory\/([^/?#]+)/)?.[1];
    const vehicle = vehicleId ? vehicles.find(item => item.id === vehicleId) : undefined;
    const meta = vehicle ? { title: `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale in Kenya | Zara Cars`, description: `${vehicle.year} ${vehicle.make} ${vehicle.model} in ${vehicle.location}. View pricing, specifications, gallery, finance estimate, and viewing options.` } : routeMeta[location] ?? { title: "Zara Cars Kenya", description: "Premium, verified vehicles for Nairobi roads and beyond." };
    const isInternal = location === "/dealer" || location === "/404";
    const canonical = `${siteOrigin}${vehicle ? `/inventory/${vehicle.id}` : location}`;
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("robots", isInternal ? "noindex, nofollow" : "index, follow");
    setProperty("og:title", meta.title);
    setProperty("og:description", meta.description);
    setProperty("og:type", vehicle ? "product" : "website");
    setProperty("og:url", canonical);
    setProperty("og:site_name", "Zara Cars");
    setProperty("og:image", vehicle?.image ?? `${siteOrigin}/Logo.jpg`);
    setMeta("twitter:card", "summary_large_image");
    setProperty("twitter:title", meta.title);
    setProperty("twitter:description", meta.description);
    const structuredData = vehicle ? { "@context": "https://schema.org", "@type": "Vehicle", name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`, brand: { "@type": "Brand", name: vehicle.make }, model: vehicle.model, vehicleModelDate: String(vehicle.year), image: vehicle.image, url: canonical, offers: { "@type": "Offer", priceCurrency: "KES", price: vehicle.price, availability: vehicle.status === "Reserved" ? "https://schema.org/SoldOut" : "https://schema.org/InStock", seller: { "@type": "Organization", name: "Zara Cars Kenya", url: siteOrigin } } } : { "@context": "https://schema.org", "@type": "Organization", name: "Zara Cars Kenya", url: siteOrigin, logo: `${siteOrigin}/Logo.jpg`, telephone: "+254700000000", areaServed: "Kenya" };
    setJsonLd(structuredData);
    let link = document.head.querySelector("link[rel=canonical]") as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [location]);
  return null;
}
