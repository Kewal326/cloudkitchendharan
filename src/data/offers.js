// Feature flags — flip to true to re-enable a tier
const TIER_500_ENABLED = false;
const TIER_1000_ENABLED = true;

export const discountTiers = [
  ...(TIER_500_ENABLED  ? [{ min: 500,  discount: 50  }] : []),
  ...(TIER_1000_ENABLED ? [{ min: 1000, discount: 100 }] : []),
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
