// Cloudflare R2 + Images transformation URL helper.
//
// Architecture:
//   R2 stores originals (object keys are immutable).
//   Cloudflare Images transformations optimize/delivery via query params.
//   The browser requests a transformed, edge-cached delivery URL.
//
// Object keys live in Supabase (vehicles/<vehicle-id>/<image-id>.webp).
// `VITE_CLOUDFLARE_IMAGE_BASE_URL` is the public R2/Cloudflare domain.
// No R2 credentials are exposed to the client — only public delivery URLs.

export type ImageProfile =
  | "vehicle-card"
  | "vehicle-featured"
  | "vehicle-detail"
  | "vehicle-gallery-thumb"
  | "vehicle-thumb";

interface ProfileSpec {
  width: number;
  height: number;
  fit: "cover" | "contain" | "scale-down";
}

// Standard delivery set. Do not create a unique transformation per component.
export const IMAGE_PROFILES: Record<ImageProfile, ProfileSpec> = {
  "vehicle-card": { width: 640, height: 480, fit: "cover" },
  "vehicle-featured": { width: 720, height: 480, fit: "cover" },
  "vehicle-detail": { width: 1600, height: 0, fit: "contain" },
  "vehicle-gallery-thumb": { width: 240, height: 180, fit: "cover" },
  "vehicle-thumb": { width: 90, height: 68, fit: "cover" },
};

const PROFILE_SIZES: Record<ImageProfile, number[]> = {
  "vehicle-card": [640],
  "vehicle-featured": [720],
  "vehicle-detail": [1600],
  "vehicle-gallery-thumb": [240],
  "vehicle-thumb": [90],
};

function base(): string {
  return import.meta.env.VITE_CLOUDFLARE_IMAGE_BASE_URL || "";
}

// Public delivery URL for an original object key (no transformation).
export function originalUrl(objectKey: string): string {
  const b = base();
  return b ? `${b}/${objectKey}` : placeholderUrl();
}

// Transformed delivery URL for a given profile (or explicit width).
export function getImageUrl(
  objectKey: string,
  profile: ImageProfile,
  width?: number
): string {
  const b = base();
  if (!b) return placeholderUrl();
  const spec = IMAGE_PROFILES[profile];
  const w = width ?? spec.width;
  const params = new URLSearchParams({
    width: String(w),
    fit: spec.fit,
    quality: "85",
    format: "auto",
  });
  if (spec.height > 0) params.set("height", String(spec.height));
  return `${b}/${objectKey}?${params.toString()}`;
}

// Responsive srcSet + sizes for an img element.
export function getImgSrcSet(
  objectKey: string,
  profile: ImageProfile,
  sizes?: string
): { srcSet: string; sizesAttr: string } {
  const widths = PROFILE_SIZES[profile];
  const srcSet = widths
    .map(w => `${getImageUrl(objectKey, profile, w)} ${w}w`)
    .join(", ");
  const sizesAttr = sizes ?? `${IMAGE_PROFILES[profile].width}px`;
  return { srcSet, sizesAttr };
}

// A deterministic, cacheable placeholder used only when no image base is
// configured (e.g. local dev before images are uploaded). Returns a tiny SVG.
export function placeholderUrl(): string {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23e2eef4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='28' fill='%23748190'%3EReady to view%3C/text%3E%3C/svg%3E";
}
