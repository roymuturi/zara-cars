// Centralized contact details. Previously the WhatsApp number was hardcoded
// across 8+ files; it lives here now so business contact info has one source.
export const WHATSAPP_PHONE = "254700000000";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`;
export const PHONE_URL = `tel:+${WHATSAPP_PHONE}`;
export function whatsAppUrl(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
