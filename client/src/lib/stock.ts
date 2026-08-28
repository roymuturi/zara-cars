// White / Zara red / navy restoration: this file is the single source of truth for Kenyan demo stock, make-logo sorting, and dealer-style listing metadata.
export type VehicleStatus = "Ready to view" | "Duty paid" | "Reserved" | "In transit" | "Clearing";
export type Vehicle = {
  id: string;
  stockNo: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  monthly: number;
  mileage: number;
  engine: string;
  fuel: "Petrol" | "Diesel" | "Hybrid";
  transmission: "Automatic" | "Manual" | "CVT";
  body: "SUV" | "Sedan" | "Hatchback" | "Pickup" | "MPV";
  location: string;
  status: VehicleStatus;
  statusTone: "red" | "green" | "blue" | "amber" | "slate";
  color: string;
  image: string;
  gallery: { src: string; label: string }[];
  description: string;
  features: string[];
  verification: string[];
  specs: Record<string, string>;
  updated: string;
  seller: string;
  segment: string;
  rating: number;
};

export const imageSet = {
  brandMark: "/Logo.jpg",
  harrierHero: "/harrier.jpeg",
  harrierFront: "/cars/toyota/front.jpg",
  harrierAngle: "/cars/toyota/side.jpg",
  harrierRear: "/cars/toyota/rear.jpg",
  harrierCabin: "/cars/toyota/cabin.jpg",
  harrierDashboard: "/cars/toyota/cabin.jpg",
  harrierSeats: "/cars/toyota/cabin.jpg",
  rav4Front: "/cars/toyota/front.jpg",
  foresterFront: "/cars/subaru/front.jpg",
  foresterAngle: "/cars/subaru/side.jpg",
  foresterCabin: "/cars/subaru/cabin.jpg",
  foresterInterior: "/cars/subaru/cabin.jpg",
  cx5Front: "/cars/mazda/front.jpg",
  cx5Angle: "/cars/mazda/side.jpg",
  xtrailFront: "/cars/nissan/front.jpg",
  xtrailRear: "/cars/nissan/rear.jpg",
  hiluxFront: "/cars/toyota/front.jpg",
  hiluxRear: "/cars/toyota/rear.jpg",
  dmax: "/cars/isuzu/front.jpg",
  landCruiser: "/cars/toyota/rear.jpg",
  tiguanFront: "/cars/volkswagen/front.jpg",
  tiguanAngle: "/cars/volkswagen/side.jpg",
  tiguanRear: "/cars/volkswagen/rear.jpg",
  tiguanSide: "/cars/volkswagen/side.jpg",
  showroom: "/cars/context/showroom.jpg",
  localContext: "/cars/context/localContext.jpg",
  automarkContext: "/cars/context/automarkContext.jpg",
  localContextAlt: "/cars/context/localContextAlt.jpg",
};

export const makeMeta: Record<string, { short: string; color: string; light: string; logo?: string }> = {
  Toyota: { short: "TOY", color: "#e21f2f", light: "#fff0f1" },
  Subaru: { short: "SUB", color: "#1574a8", light: "#e7f3fa" },
  Mazda: { short: "MZ", color: "#b41e35", light: "#fae9ed" },
  Nissan: { short: "NIS", color: "#1f5d78", light: "#e7f2f5" },
  Isuzu: { short: "ISU", color: "#d04f27", light: "#fff0e9", logo: "/cars/logos/isuzu.svg" },
  Mitsubishi: { short: "MIT", color: "#b12031", light: "#fbeaec" },
  Honda: { short: "HON", color: "#c82b32", light: "#fcebed" },
  Suzuki: { short: "SUZ", color: "#1769a5", light: "#e9f2fb" },
  Mercedes: { short: "MB", color: "#25334d", light: "#eef1f6", logo: "/cars/logos/mercedes.svg" },
  BMW: { short: "BMW", color: "#2366a9", light: "#e7f1fb" },
  Ford: { short: "F", color: "#2056a0", light: "#e9f0fb" },
  Volkswagen: { short: "VW", color: "#1d537c", light: "#e7f1f6" },
  Hyundai: { short: "HYU", color: "#284b71", light: "#eaf0f6" },
  Kia: { short: "KIA", color: "#8a2631", light: "#faecee" },
  Peugeot: { short: "P", color: "#2b3d74", light: "#eaedf7" },
  "Land Rover": { short: "LR", color: "#376b4d", light: "#eaf5ed", logo: "/cars/logos/land-rover.svg" },
  Lexus: { short: "LEX", color: "#25354f", light: "#edf0f5" },
  Jeep: { short: "J", color: "#627238", light: "#eff3e7" },
  Volvo: { short: "VOL", color: "#2e526f", light: "#eaf1f6" },
  Audi: { short: "AUD", color: "#263244", light: "#edf0f3" },
};

const photoBank: Record<string, string[]> = {
  Toyota: [imageSet.harrierHero, imageSet.harrierFront, imageSet.harrierAngle, imageSet.harrierRear, imageSet.rav4Front, imageSet.hiluxFront, imageSet.hiluxRear, imageSet.landCruiser],
  Subaru: [imageSet.foresterFront, imageSet.foresterAngle, imageSet.foresterCabin, imageSet.foresterInterior],
  Mazda: [imageSet.cx5Front, imageSet.cx5Angle, imageSet.showroom, imageSet.localContextAlt],
  Nissan: [imageSet.xtrailFront, imageSet.xtrailRear, imageSet.showroom, imageSet.localContext],
  Isuzu: [imageSet.dmax, imageSet.hiluxFront, imageSet.hiluxRear, imageSet.showroom],
  Mitsubishi: [imageSet.rav4Front, imageSet.xtrailFront, imageSet.showroom, imageSet.localContext],
  Honda: [imageSet.rav4Front, imageSet.cx5Front, imageSet.showroom, imageSet.localContextAlt],
  Suzuki: [imageSet.xtrailFront, imageSet.cx5Angle, imageSet.showroom, imageSet.localContext],
  Mercedes: [imageSet.landCruiser, imageSet.harrierAngle, imageSet.showroom, imageSet.localContext],
  BMW: [imageSet.landCruiser, imageSet.harrierRear, imageSet.showroom, imageSet.localContext],
  Ford: [imageSet.hiluxFront, imageSet.hiluxRear, imageSet.dmax, imageSet.showroom],
  Volkswagen: [imageSet.tiguanFront, imageSet.tiguanAngle, imageSet.tiguanRear, imageSet.tiguanSide],
  Hyundai: [imageSet.rav4Front, imageSet.xtrailFront, imageSet.showroom, imageSet.localContext],
  Kia: [imageSet.cx5Front, imageSet.rav4Front, imageSet.showroom, imageSet.localContextAlt],
  Peugeot: [imageSet.cx5Front, imageSet.xtrailFront, imageSet.showroom, imageSet.localContext],
  "Land Rover": [imageSet.landCruiser, imageSet.hiluxFront, imageSet.showroom, imageSet.localContext],
  Lexus: [imageSet.harrierHero, imageSet.harrierAngle, imageSet.harrierRear, imageSet.harrierCabin],
  Jeep: [imageSet.landCruiser, imageSet.hiluxFront, imageSet.showroom, imageSet.localContextAlt],
  Volvo: [imageSet.foresterFront, imageSet.foresterAngle, imageSet.showroom, imageSet.localContext],
  Audi: [imageSet.landCruiser, imageSet.cx5Front, imageSet.showroom, imageSet.localContextAlt],
};

const locations = ["Lavington, Nairobi", "Westlands, Nairobi", "Kilimani, Nairobi", "Mombasa Road, Nairobi", "Riverside, Nairobi", "Parklands, Nairobi", "Mombasa", "Kisumu"];
const statuses: VehicleStatus[] = ["Ready to view", "Duty paid", "Ready to view", "Clearing", "In transit", "Reserved", "Duty paid"];
const sellers = ["Amina Wanjiku", "Brian Kilonzo", "Sheila Njeri", "Moses Njoroge", "David Mutua", "Lilian Karanja"];
const colors = ["Pearl white", "Graphite grey", "Crystal black", "Silver metallic", "Arctic white", "Soul red crystal", "Midnight blue", "Champagne gold"];
const fuels: Vehicle["fuel"][] = ["Petrol", "Petrol", "Diesel", "Hybrid"];
const transmissions: Vehicle["transmission"][] = ["Automatic", "CVT", "Automatic", "Manual"];
const descriptions = [
  "A practical Nairobi-ready unit with a clean file, sensible mileage, and a viewing slot available by appointment.",
  "Selected for strong road manners, useful ground clearance, and a spec that makes everyday Kenyan driving easier.",
  "A well-kept example with the details buyers ask for first: location, price, condition notes, and the next step.",
  "A dependable option for city runs and weekend roads, with a clear handover plan and inspection welcome.",
];

const catalog = [
  { make: "Toyota", model: "Harrier", trim: "Premium Advanced", body: "SUV", segment: "Executive SUV", engine: "2.0L", basePrice: 3865000, features: ["Panoramic sunroof", "Leather seats", "360 camera", "Apple CarPlay"] },
  { make: "Toyota", model: "RAV4", trim: "Adventure", body: "SUV", segment: "Everyday SUV", engine: "2.0L", basePrice: 4520000, features: ["Adaptive cruise", "Reverse camera", "Roof rails", "LED headlights"] },
  { make: "Toyota", model: "Hilux", trim: "Double Cab Legend", body: "Pickup", segment: "Workhorse pickup", engine: "2.8L", basePrice: 5680000, features: ["4WD low range", "Tow bar", "Reverse camera", "Alloy rims"] },
  { make: "Toyota", model: "Corolla Axio", trim: "Hybrid G", body: "Sedan", segment: "City hybrid", engine: "1.5L", basePrice: 1895000, features: ["Hybrid drive", "Push start", "Reverse camera", "Keyless entry"] },
  { make: "Toyota", model: "Land Cruiser Prado", trim: "TX L Package", body: "SUV", segment: "Family 4x4", engine: "2.7L", basePrice: 7345000, features: ["7 seats", "4WD", "Sunroof", "Cruise control"] },
  { make: "Toyota", model: "Fielder", trim: "Hybrid G", body: "Wagon", segment: "Practical wagon", engine: "1.5L", basePrice: 2260000, features: ["Hybrid drive", "Boot space", "Push start", "Reverse camera"] },
  { make: "Subaru", model: "Forester XT", trim: "EyeSight Turbo", body: "SUV", segment: "Adventure SUV", engine: "2.0L Turbo", basePrice: 3245000, features: ["EyeSight safety", "Reverse camera", "Heated seats", "Roof rails"] },
  { make: "Subaru", model: "Outback", trim: "Limited", body: "Wagon", segment: "Long-road wagon", engine: "2.5L", basePrice: 3965000, features: ["AWD", "EyeSight safety", "Leather seats", "Electric tailgate"] },
  { make: "Mazda", model: "CX-5", trim: "XD L Package", body: "SUV", segment: "Diesel SUV", engine: "2.2L", basePrice: 2780000, features: ["Leather seats", "Bose sound", "Blind spot monitor", "Power tailgate"] },
  { make: "Mazda", model: "CX-3", trim: "Touring", body: "SUV", segment: "City crossover", engine: "2.0L", basePrice: 2445000, features: ["Reverse camera", "Keyless entry", "LED headlights", "Cruise control"] },
  { make: "Nissan", model: "X-Trail", trim: "N-Trek", body: "SUV", segment: "Family SUV", engine: "2.0L", basePrice: 3185000, features: ["7 seats", "360 camera", "Roof rails", "Dual-zone AC"] },
  { make: "Nissan", model: "Note", trim: "e-Power Medalist", body: "Hatchback", segment: "City hybrid", engine: "1.2L", basePrice: 1685000, features: ["e-Power hybrid", "Push start", "Reverse camera", "Lane assist"] },
  { make: "Isuzu", model: "D-Max", trim: "Double Cab 3.0", body: "Pickup", segment: "Commercial pickup", engine: "3.0L", basePrice: 4985000, features: ["4WD", "Tow bar", "Bed liner", "Hill descent"] },
  { make: "Mitsubishi", model: "Outlander", trim: "PHEV G", body: "SUV", segment: "Family hybrid", engine: "2.4L", basePrice: 3425000, features: ["Plug-in hybrid", "7 seats", "360 camera", "Leather seats"] },
  { make: "Honda", model: "Vezel", trim: "RS Hybrid", body: "SUV", segment: "Compact hybrid", engine: "1.5L", basePrice: 2385000, features: ["Hybrid drive", "Honda Sensing", "Keyless entry", "Cruise control"] },
  { make: "Suzuki", model: "Swift", trim: "RS Hybrid", body: "Hatchback", segment: "City hatch", engine: "1.2L", basePrice: 1545000, features: ["Hybrid drive", "Push start", "Reverse camera", "LED headlights"] },
  { make: "Mercedes", model: "GLC 300", trim: "4MATIC", body: "SUV", segment: "Premium SUV", engine: "2.0L Turbo", basePrice: 9850000, features: ["Panoramic roof", "Burmester sound", "360 camera", "Memory seats"] },
  { make: "BMW", model: "X3", trim: "xDrive20d", body: "SUV", segment: "Executive SUV", engine: "2.0L Diesel", basePrice: 7850000, features: ["xDrive AWD", "M Sport trim", "Adaptive LED", "Parking assistant"] },
  { make: "Ford", model: "Ranger", trim: "Wildtrak", body: "Pickup", segment: "Adventure pickup", engine: "2.0L Bi-Turbo", basePrice: 6425000, features: ["4WD", "Tow package", "360 camera", "Terrain modes"] },
  { make: "Volkswagen", model: "Tiguan", trim: "R-Line", body: "SUV", segment: "European SUV", engine: "1.4L Turbo", basePrice: 4450000, features: ["Digital cockpit", "Panoramic roof", "Keyless entry", "Lane assist"] },
  { make: "Hyundai", model: "Tucson", trim: "N Line", body: "SUV", segment: "Family SUV", engine: "2.0L", basePrice: 3325000, features: ["Blind spot monitor", "Apple CarPlay", "Leather seats", "Reverse camera"] },
  { make: "Kia", model: "Sportage", trim: "GT Line", body: "SUV", segment: "Family SUV", engine: "2.0L", basePrice: 3475000, features: ["Panoramic roof", "360 camera", "Lane assist", "Power tailgate"] },
  { make: "Peugeot", model: "3008", trim: "GT", body: "SUV", segment: "European crossover", engine: "1.6L Turbo", basePrice: 3825000, features: ["i-Cockpit", "Panoramic roof", "Parking sensors", "Driver assist"] },
  { make: "Land Rover", model: "Discovery Sport", trim: "R-Dynamic", body: "SUV", segment: "Premium 4x4", engine: "2.0L Turbo", basePrice: 8450000, features: ["Terrain response", "7 seats", "Panoramic roof", "360 camera"] },
  { make: "Lexus", model: "NX 300h", trim: "F Sport", body: "SUV", segment: "Premium hybrid", engine: "2.5L", basePrice: 7285000, features: ["Hybrid drive", "Mark Levinson sound", "Leather seats", "360 camera"] },
  { make: "Jeep", model: "Wrangler", trim: "Sahara", body: "SUV", segment: "Open-air 4x4", engine: "2.0L Turbo", basePrice: 7850000, features: ["4x4 low range", "Removable roof", "Trail camera", "Tow hooks"] },
];

const angleLabels = ["Front three-quarter", "Side profile", "Rear three-quarter", "Cabin detail"];
const statusTone = (status: VehicleStatus): Vehicle["statusTone"] => status === "Ready to view" ? "green" : status === "Duty paid" ? "blue" : status === "Reserved" ? "slate" : "amber";
const photosFor = (make: string, start: number) => {
  const photos = photoBank[make] ?? photoBank.Toyota;
  const primary = photos[0];
  const side = photos[Math.min(1, photos.length - 1)];
  const rear = photos[Math.min(2, photos.length - 1)];
  const cabin = photos[photos.length - 1];
  const alternates = [primary, side, rear, cabin];
  return angleLabels.map((label, index) => ({ src: alternates[(index + (start > 1 ? 1 : 0)) % alternates.length], label }));
};
const baseMileage = (index: number) => 32000 + ((index * 9371) % 84000);
const basePrice = (value: number, index: number) => value + ((index * 117000) % 580000) - (index % 4 === 0 ? 85000 : 0);

function makeVehicle(index: number, spec: (typeof catalog)[number], overrides: Partial<Vehicle> = {}): Vehicle {
  const status = overrides.status ?? statuses[index % statuses.length];
  const gallery = overrides.gallery ?? photosFor(spec.make, index % (photoBank[spec.make]?.length ?? 4));
  const price = overrides.price ?? basePrice(spec.basePrice, index);
  const year = overrides.year ?? 2017 + ((index * 3) % 8);
  return {
    id: overrides.id ?? `zc-${spec.model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(index + 1).padStart(3, "0")}`,
    stockNo: overrides.stockNo ?? `ZC-${String(194 + index).padStart(4, "0")}`,
    make: spec.make,
    model: spec.model,
    year,
    trim: spec.trim,
    price,
    monthly: Math.round(price * 0.0203),
    mileage: overrides.mileage ?? baseMileage(index),
    engine: spec.engine,
    fuel: overrides.fuel ?? fuels[index % fuels.length],
    transmission: overrides.transmission ?? transmissions[index % transmissions.length],
    body: spec.body as Vehicle["body"],
    location: overrides.location ?? locations[index % locations.length],
    status,
    statusTone: overrides.statusTone ?? statusTone(status),
    color: overrides.color ?? colors[index % colors.length],
    image: overrides.image ?? gallery[0].src,
    gallery,
    description: overrides.description ?? descriptions[index % descriptions.length],
    features: overrides.features ?? spec.features,
    verification: overrides.verification ?? ["Duty status recorded", "Independent inspection welcome", "Price includes registration"],
    specs: overrides.specs ?? { Drive: spec.body === "Pickup" ? "4WD" : "AWD", Seats: spec.body === "Sedan" || spec.body === "Hatchback" ? "5" : "5", Doors: "5", Power: "170 hp", Torque: "210 Nm", Consumption: "14 km/l", Colour: overrides.color ?? colors[index % colors.length], Registration: `KDG · ${year}` },
    updated: overrides.updated ?? `${(index % 7) + 1} hrs ago`,
    seller: overrides.seller ?? sellers[index % sellers.length],
    segment: spec.segment,
    rating: overrides.rating ?? Math.floor(Math.random() * 2) + 4,
  };
}

const curatedVehicles: Vehicle[] = [
  makeVehicle(0, catalog[0], { id: "zc-harrier-019", stockNo: "ZC-0194", year: 2019, price: 3865000, monthly: 78500, mileage: 80000, location: "Lavington, Nairobi", status: "Ready to view", color: "Pearl white", image: imageSet.harrierHero, gallery: [{ src: imageSet.harrierHero, label: "Front three-quarter" }, { src: imageSet.harrierAngle, label: "Side profile" }, { src: imageSet.harrierRear, label: "Rear three-quarter" }, { src: imageSet.harrierCabin, label: "Cabin detail" }], description: "The Toyota Harrier is a mid-size crossover SUV built on the TNGA GA-K platform, known in export markets as the Lexus RX from 1998 to 2013. Named after the eastern marsh harrier, this 2019 model pairs a 2.0L turbocharged engine with an AWD system and carries Toyota Safety Sense P. This specific unit is duty-paid, verified with a 108-point condition check, and ready for a showroom walk-through in Lavington.", verification: ["Duty paid and verified", "108-point condition check", "Japan auction sheet on file", "Price includes registration"], specs: { Drive: "AWD", Seats: "5", Doors: "5", Power: "170 hp", Torque: "180 Nm", Consumption: "14 km/l", Colour: "Pearl white", Registration: "KDG · 2019" }, updated: "12 min ago", seller: "Amina Wanjiku" }),
  makeVehicle(1, catalog[1], { id: "zc-rav4-020", stockNo: "ZC-0201", year: 2020, price: 4520000, monthly: 91800, mileage: 63800, location: "Westlands, Nairobi", status: "Duty paid", color: "Graphite grey", gallery: photosFor("Toyota", 4), description: "A practical, high-clearance RAV4 with clean lines, strong resale appeal, and a spec that suits both school runs and weekend escapes out of town." }),
  makeVehicle(2, catalog[6], { id: "zc-forester-021", stockNo: "ZC-0218", year: 2018, price: 3245000, monthly: 65900, mileage: 71000, location: "Kilimani, Nairobi", status: "Ready to view", color: "Crystal black", gallery: photosFor("Subaru", 0), description: "The Subaru Forester is a compact crossover SUV with a symmetrical all-wheel-drive system and boxer engine that gives it a low center of gravity. Launched in 1997 and now in its fifth generation on the Subaru Global Platform, it features EyeSight driver assist and X-Mode for off-road confidence. This unit combines elevated driving position with practical, everyday usability for Kenyan roads.", verification: ["Japan auction sheet on file", "Full service history", "Accident-free"] }),
  makeVehicle(3, catalog[8], { id: "zc-cx5-022", stockNo: "ZC-0227", year: 2018, price: 2780000, monthly: 56500, mileage: 76000, location: "Riverside, Nairobi", status: "Clearing", color: "Soul red crystal", gallery: photosFor("Mazda", 0), description: "A well-specced diesel CX-5 in the final clearing stage. Reserve now and our team will keep the paperwork moving while you plan your viewing." }),
  makeVehicle(4, catalog[2], { id: "zc-hilux-023", stockNo: "ZC-0234", year: 2021, price: 5680000, monthly: 115400, mileage: 42000, location: "Mombasa Road, Nairobi", status: "In transit", color: "Arctic white", gallery: photosFor("Toyota", 5), description: "A low-mileage double cab for teams that need a dependable work partner with serious road presence. Arrival is tracked daily from Mombasa Road." }),
  makeVehicle(5, catalog[3], { id: "zc-axio-024", stockNo: "ZC-0240", year: 2019, price: 1895000, monthly: 38500, mileage: 68000, location: "Parklands, Nairobi", status: "Reserved", color: "Silver metallic", gallery: photosFor("Toyota", 4), description: "A compact hybrid sedan with city-friendly running costs and a clean, easy-to-own profile. Currently held for a buyer pending paperwork." }),
];

const generatedVehicles = Array.from({ length: 64 }, (_, index) => makeVehicle(index + curatedVehicles.length, catalog[(index + 4) % catalog.length]));
export const vehicles: Vehicle[] = [...curatedVehicles, ...generatedVehicles];

export const leads = [
  { id: "LD-1048", name: "Mercy Wanjiku", vehicle: "Toyota Harrier 2019", source: "WhatsApp", status: "New", time: "8 min ago", initials: "MW" },
  { id: "LD-1047", name: "Daniel Otieno", vehicle: "Subaru Forester XT", source: "Website enquiry", status: "Contacted", time: "42 min ago", initials: "DO" },
  { id: "LD-1046", name: "Sheila Njeri", vehicle: "Mazda CX-5", source: "WhatsApp", status: "Reserved", time: "2 hrs ago", initials: "SN" },
  { id: "LD-1045", name: "Mark Kiplagat", vehicle: "Toyota RAV4", source: "Finance match", status: "New", time: "3 hrs ago", initials: "MK" },
];

export const reservations = [
  { id: "RS-2204", vehicle: "Isuzu D-Max 2021", buyer: "David M.", amount: 10000, expires: "31h 18m", status: "Active" },
  { id: "RS-2203", vehicle: "Mazda CX-5 2018", buyer: "Sheila N.", amount: 10000, expires: "Converted", status: "Converted" },
  { id: "RS-2202", vehicle: "Toyota Harrier 2019", buyer: "Patrick K.", amount: 10000, expires: "Released", status: "Released" },
];

export const tradeIns = [
  { id: "TI-088", name: "Agnes W.", vehicle: "2014 Toyota Fielder", estimate: "KES 1.1M – 1.25M", source: "Website", status: "New", time: "24 min ago" },
  { id: "TI-087", name: "Peter N.", vehicle: "2012 Nissan X-Trail", estimate: "KES 760K – 900K", source: "WhatsApp", status: "Reviewing", time: "2 hrs ago" },
  { id: "TI-086", name: "Lilian K.", vehicle: "2016 Mazda Demio", estimate: "KES 980K – 1.1M", source: "Website", status: "Offer sent", time: "Yesterday" },
];

export const financeRequests = [
  { id: "FM-311", name: "Mark Kiplagat", employment: "Salaried", budget: "KES 90K / month", vehicle: "Toyota RAV4", partner: "NCBA", status: "New", time: "3 hrs ago" },
  { id: "FM-310", name: "Esther M.", employment: "Business owner", budget: "KES 120K / month", vehicle: "Subaru Forester", partner: "Mogo", status: "Matched", time: "Yesterday" },
  { id: "FM-309", name: "Joseph O.", employment: "Diaspora buyer", budget: "KES 150K / month", vehicle: "Toyota Harrier", partner: "KCB", status: "Contacted", time: "2 days ago" },
];

export const sales = [
  { id: "SL-4001", agent: "Amina W.", vehicle: "Toyota Harrier 2019", buyer: "James Mwangi", amount: 3865000, status: "Completed", date: "25 Aug 2026" },
  { id: "SL-4002", agent: "Brian K.", vehicle: "Subaru Forester XT", buyer: "Lucy Wambui", amount: 3245000, status: "Completed", date: "24 Aug 2026" },
  { id: "SL-4003", agent: "Sheila Njeri", vehicle: "Toyota RAV4 2020", buyer: "Samuel Otieno", amount: 4520000, status: "Pending", date: "23 Aug 2026" },
  { id: "SL-4004", agent: "Amina W.", vehicle: "Toyota Corolla Axio", buyer: "Grace Achieng", amount: 1895000, status: "Completed", date: "22 Aug 2026" },
];

export const staff = [
  { id: "AG-001", name: "Amina Wanjiku", role: "Admin", branch: "Nairobi", status: "Active", sales: 24, response: "8m" },
  { id: "AG-002", name: "Brian Kilonzo", role: "Sales", branch: "Nairobi", status: "Active", sales: 18, response: "11m" },
  { id: "AG-003", name: "Moses Njoroge", role: "Yard / Ops", branch: "Nairobi", status: "Active", sales: 12, response: "15m" },
  { id: "AG-004", name: "Sheila Njeri", role: "Sales", branch: "Mombasa", status: "Active", sales: 15, response: "7m" },
];

export const money = (amount: number) => `KES ${amount.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
export const compactMoney = (amount: number) => amount >= 1000000 ? `KES ${(amount / 1000000).toFixed(2)}M` : `KES ${(amount / 1000).toFixed(0)}K`;
