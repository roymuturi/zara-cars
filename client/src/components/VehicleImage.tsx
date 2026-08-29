// Canonical vehicle image component.
//
// All vehicle imagery must go through this component. It handles:
//  - Cloudflare transformed delivery URLs + responsive srcSet
//  - explicit width/height + aspect ratio (layout stability, CLS budget)
//  - lazy loading (below fold) / eager + fetchpriority (hero primary image)
//  - meaningful alt text and an error fallback
//  - object positioning
//
// Pass an R2 `objectKey` (preferred) or a `publicUrl`. The transformation is
// driven by a standard delivery profile (see data/images/imageUrl.ts) so we do
// not invent a unique transformation per component.
import { useState } from "react";
import {
  getImgSrcSet,
  getImageUrl,
  placeholderUrl,
  type ImageProfile,
} from "@/data/images/imageUrl";

export interface VehicleImageProps {
  objectKey?: string;
  publicUrl?: string;
  profile?: ImageProfile;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  widths?: number[];
  aspectRatio?: number;
  objectPosition?: "center" | "top" | "left" | "right";
}

export function VehicleImage({
  objectKey,
  publicUrl,
  profile = "vehicle-card",
  alt,
  className,
  sizes,
  priority = false,
  widths,
  aspectRatio,
  objectPosition = "center",
}: VehicleImageProps) {
  const [errored, setErrored] = useState(false);
  const key = objectKey || "";
  const src = errored
    ? placeholderUrl()
    : objectKey
      ? getImageUrl(objectKey, profile, widths?.[0])
      : publicUrl || placeholderUrl();

  const { srcSet, sizesAttr } = objectKey
    ? getImgSrcSet(objectKey, profile, sizes)
    : { srcSet: "", sizesAttr: sizes || "" };

  const style: Record<string, string> = {};
  if (aspectRatio) {
    style.aspectRatio = String(aspectRatio);
  }
  if (!errored && objectKey) {
    style.objectPosition = objectPosition;
  }

  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizesAttr || undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      style={style}
    />
  );
}

export default VehicleImage;
