// Pure presentation formatters. Kept separate from stock data so they are
// unit-testable and reusable by the data layer and the UI.
export const money = (amount: number) =>
  `KES ${amount.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;

export const compactMoney = (amount: number) =>
  amount >= 1000000
    ? `KES ${(amount / 1000000).toFixed(2)}M`
    : `KES ${(amount / 1000).toFixed(0)}K`;

export const mileage = (km: number) => `${km.toLocaleString("en-KE")} km`;

export const formatMonth = (n: number) =>
  `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })} / month`;
