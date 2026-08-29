// Feature flags — flip to true to re-enable a tier
const TIER_500_ENABLED = false;
const TIER_1000_ENABLED = false;

export const discountTiers = [
  ...(TIER_500_ENABLED  ? [{ min: 500,  discount: 50  }] : []),
  ...(TIER_1000_ENABLED ? [{ min: 1000, discount: 100 }] : []),
];

// Free item offer — flip enabled to false to pause it
export const FREE_ITEM_OFFER_ENABLED = true;
export const freeItemOffer = {
  minOrder: 1000,
  label: "Momo + Cold Drink",
  items: [
    { id: "momo",              name: "Momo",                  price: 120 },
    { id: "coke-fanta-sprite", name: "Coke / Fanta / Sprite", price: 60  },
  ],
};

export function getDiscount(subtotal) {
  return [...discountTiers].reverse().find((t) => subtotal >= t.min)?.discount ?? 0;
}

export function getNextTier(subtotal) {
  return discountTiers.find((t) => subtotal < t.min) ?? null;
}

export function getCurrentTierMin(subtotal) {
  return [...discountTiers].reverse().find((t) => subtotal >= t.min)?.min ?? 0;
}
