// Minimal ambient typings for the `qrcode` CommonJS module, which ships no
// TypeScript declarations of its own. This keeps the PDF generator in
// vehiclePdf.ts type-checked without pulling in @types/qrcode.
declare module "qrcode" {
  export interface QRCodeOptions {
    margin?: number;
    width?: number;
    height?: number;
    color?: { dark?: string; light?: string };
    [key: string]: unknown;
  }
  export function toDataURL(
    data: string,
    options?: QRCodeOptions
  ): Promise<string>;
  export default {
    toDataURL,
  };
}
