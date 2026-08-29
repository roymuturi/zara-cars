import {
  getImageUrl,
  getImgSrcSet,
  originalUrl,
  placeholderUrl,
  IMAGE_PROFILES,
} from "@/data/images/imageUrl";

const BASE = "https://img.zara-cars.run/cdn-cgi/image";
const KEY = "vehicles/veh-1/01.webp";

describe("getImageUrl", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_CLOUDFLARE_IMAGE_BASE_URL", BASE);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds a transformed delivery URL for a profile", () => {
    const url = getImageUrl(KEY, "vehicle-card");
    expect(url).toContain(`${BASE}/${KEY}`);
    const query = new URL(url).searchParams;
    expect(query.get("width")).toBe("640");
    expect(query.get("fit")).toBe("cover");
    expect(query.get("format")).toBe("auto");
  });

  it("overrides width when provided", () => {
    const url = getImageUrl(KEY, "vehicle-card", 320);
    expect(new URL(url).searchParams.get("width")).toBe("320");
  });

  it("falls back to a placeholder when no base is configured", () => {
    vi.stubEnv("VITE_CLOUDFLARE_IMAGE_BASE_URL", "");
    expect(getImageUrl(KEY, "vehicle-card")).toBe(placeholderUrl());
  });
});

describe("getImgSrcSet", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_CLOUDFLARE_IMAGE_BASE_URL", BASE);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("produces one srcset entry per profile width", () => {
    const { srcSet } = getImgSrcSet(KEY, "vehicle-gallery-thumb");
    expect(srcSet).toContain("240w");
    expect(srcSet).toContain(`${BASE}/${KEY}?`);
  });
});

describe("originalUrl", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_CLOUDFLARE_IMAGE_BASE_URL", BASE);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the untransformed public path", () => {
    expect(originalUrl(KEY)).toBe(`${BASE}/${KEY}`);
  });

  it("returns a placeholder when base missing", () => {
    vi.stubEnv("VITE_CLOUDFLARE_IMAGE_BASE_URL", "");
    expect(originalUrl(KEY)).toBe(placeholderUrl());
  });
});

describe("IMAGE_PROFILES", () => {
  it("covers the required delivery set", () => {
    expect(Object.keys(IMAGE_PROFILES).sort()).toEqual(
      [
        "vehicle-card",
        "vehicle-featured",
        "vehicle-detail",
        "vehicle-gallery-thumb",
        "vehicle-thumb",
      ].sort()
    );
  });
});

describe("placeholderUrl", () => {
  it("returns a data URI svg", () => {
    expect(placeholderUrl()).toContain("data:image/svg+xml");
  });
});
