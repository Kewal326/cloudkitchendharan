export const discountTiers = [
  { min: 500, discount: 50 },
  { min: 1000, discount: 100 },
];

export function getDiscount(subtotal) {
  return [...discountTiers].reverse().find((t) => subtotal >= t.min)?.discount ?? 0;
}

export function getNextTier(subtotal) {
  return discountTiers.find((t) => subtotal < t.min) ?? null;
}

export function getCurrentTierMin(subtotal) {
  return [...discountTiers].reverse().find((t) => subtotal >= t.min)?.min ?? 0;
}
