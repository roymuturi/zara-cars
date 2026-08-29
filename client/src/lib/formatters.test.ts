import { money, compactMoney, mileage } from "@/lib/formatters";

describe("money", () => {
  it("formats KES with thousands separators and no decimals", () => {
    expect(money(3865000)).toBe("KES 3,865,000");
    expect(money(1895000)).toBe("KES 1,895,000");
    expect(money(999)).toBe("KES 999");
  });

  it("rounds large values to whole numbers", () => {
    expect(money(4850000.7)).toBe("KES 4,850,001");
  });
});

describe("compactMoney", () => {
  it("formats millions as M and thousands as K", () => {
    expect(compactMoney(4850000)).toBe("KES 4.85M");
    expect(compactMoney(89000)).toBe("KES 89K");
    expect(compactMoney(1500000)).toBe("KES 1.50M");
  });
});

describe("mileage", () => {
  it("formats kilometers with thousands separators", () => {
    expect(mileage(68000)).toBe("68,000 km");
    expect(mileage(1234567)).toBe("1,234,567 km");
  });
});
