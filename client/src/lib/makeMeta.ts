// Brand metadata for make badges — static identity, not vehicle stock.
export const makeMeta: Record<
  string,
  { short: string; color: string; light: string; logo?: string }
> = {
  Toyota: { short: "TOY", color: "#e21f2f", light: "#fff0f1" },
  Subaru: { short: "SUB", color: "#1574a8", light: "#e7f3fa" },
  Mazda: { short: "MZ", color: "#b41e35", light: "#fae9ed" },
  Nissan: { short: "NIS", color: "#1f5d78", light: "#e7f2f5" },
  Isuzu: {
    short: "ISU",
    color: "#d04f27",
    light: "#fff0e9",
    logo: "/cars/logos/isuzu.svg",
  },
  Mitsubishi: { short: "MIT", color: "#b12031", light: "#fbeaec" },
  Honda: { short: "HON", color: "#c82b32", light: "#fcebed" },
  Suzuki: { short: "SUZ", color: "#1769a5", light: "#e9f2fb" },
  Mercedes: {
    short: "MB",
    color: "#25334d",
    light: "#eef1f6",
    logo: "/cars/logos/mercedes.svg",
  },
  BMW: { short: "BMW", color: "#2366a9", light: "#e7f1fb" },
  Ford: { short: "F", color: "#2056a0", light: "#e9f0fb" },
  Volkswagen: { short: "VW", color: "#1d537c", light: "#e7f1f6" },
  Hyundai: { short: "HYU", color: "#284b71", light: "#eaf0f6" },
  Kia: { short: "KIA", color: "#8a2631", light: "#faecee" },
  Peugeot: { short: "P", color: "#2b3d74", light: "#eaedf7" },
  "Land Rover": {
    short: "LR",
    color: "#376b4d",
    light: "#eaf5ed",
    logo: "/cars/logos/land-rover.svg",
  },
  Lexus: { short: "LEX", color: "#25354f", light: "#edf0f5" },
  Jeep: { short: "J", color: "#627238", light: "#eff3e7" },
  Volvo: { short: "VOL", color: "#2e526f", light: "#eaf1f6" },
  Audi: { short: "AUD", color: "#263244", light: "#edf0f3" },
};
