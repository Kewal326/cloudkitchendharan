# Cloud Kitchen Dharan — Agent Context

## What this is
A React menu and ordering app for Cloud Kitchen Dharan, a 100% vegetarian cloud kitchen in Dharan, Nepal. Customers browse the menu, build a cart, and place orders via WhatsApp or phone call. There is **no backend** — everything runs in the browser.

## Stack
- React 19, Vite 7, Tailwind CSS 3
- No backend, no database, no auth
- Cart and notes persisted in `localStorage`
- Orders sent via WhatsApp deep link

## Running locally
```bash
npm run dev         # starts dev server at localhost:5173
# For phone testing on LAN:
# server.host = true is set in vite.config.js — use your machine's LAN IP
```

## Key files

| File | Owns |
|------|------|
| `src/data/menu.js` | All menu categories and items |
| `src/data/offers.js` | Discount tier config + feature flags |
| `src/data/banners.js` | Carousel banner content |
| `src/utils/order.js` | Cart math, WhatsApp message formatting |
| `src/App.jsx` | Root state: cart, modals, bottom bar |
| `src/components/Cart.jsx` | Mobile full-screen cart + desktop sidebar |
| `src/components/BannerCarousel.jsx` | Home page carousel (split/bold/photo variants) |
| `src/components/MenuShelf.jsx` | Horizontal scroll shelf per category |
| `src/components/VariantPickerSheet.jsx` | Bottom sheet for items with size variants |
| `src/components/MilestoneToast.jsx` | Mid-screen confetti celebration on tier unlock |

## Menu data structure
Items in `menu.js` are defined as tuples: `[name, price, description, tags[], variants?]`

Variants are optional: `[{ label: "500 Gram", price: 500 }, { label: "1 Kg", price: 1000 }]`

The `toMenuItem` function converts tuples to objects with slugified `id` fields.

## Cart and variant IDs — critical gotcha
Regular items use `item.id` as the cart key.

Variant items use **`${baseId}-${slugify(label)}`** as the cart key (e.g. `khorsani-achar-500-gram`). The base item id (`khorsani-achar`) never appears directly in the cart.

Always use:
- `getItemQuantity(cart, item)` — sums all variant entries by id prefix for variant items
- `removeItem(item)` in `App.jsx` — finds first matching variant entry to decrement

Never read `cart[item.id]?.quantity` directly for variant items — it will always be 0.

## Discount / offer system
Defined in `src/data/offers.js` with **feature flags** at the top:

```js
const TIER_500_ENABLED = false;   // flip to true to re-enable Rs.50 off at Rs.500
const TIER_1000_ENABLED = false;  // flip to true to re-enable Rs.100 off at Rs.1000

export const discountTiers = [
  ...(TIER_500_ENABLED  ? [{ min: 500,  discount: 50  }] : []),
  ...(TIER_1000_ENABLED ? [{ min: 1000, discount: 100 }] : []),
];

// Current active offer: free item at Rs.1000
export const FREE_ITEM_OFFER_ENABLED = true;
export const freeItemOffer = {
  minOrder: 1000,
  label: "Momo + Cold Drink",
  items: [
    { id: "momo",              name: "Momo",                  price: 120 },
    { id: "coke-fanta-sprite", name: "Coke / Fanta / Sprite", price: 60  },
  ],
};
```

To re-enable a cash discount tier: flip its flag and update the banner in `banners.js` (old text is in a comment on that line).

Free items are auto-injected into the cart via a `useEffect` in `App.jsx` that watches `subtotal`. They use `__free__` id prefix, `price: 0`, `isFree: true`, `originalPrice: N`. Since price is 0, they don't affect `getCartSubtotal` or trigger re-injection loops.

Key helpers: `getDiscount(subtotal)`, `getNextTier(subtotal)`, `getCurrentTierMin(subtotal)`

## Offer UI
- **Bottom bar** (mobile): shows free item offer progress bar when `FREE_ITEM_OFFER_ENABLED`; turns green when unlocked. Cash discount strip also appears when tiers are active.
- **MilestoneToast** (`MilestoneToast.jsx`): fires mid-screen with CSS confetti when a tier/offer is first crossed in a session. Pass `discount` for cash discount toast, `freeLabel` for free item toast. Does NOT fire on page reload (`prevDiscountRef` initialises to current discount).
- **Cart**: free items appear in a green "Complimentary" section with no +/- controls. Free items are listed as FREE in the footer summary and in the WhatsApp order message.
- Cart button only shows when `cartCount > 0`

## Banner carousel
Three card variants in `banners.js`: `"split"` (image right), `"bold"` (centered text), `"photo"` (full bleed image).
`highlight` field bolds a substring in gold inside the headline or subtext.

## Categories order (as of last update)
Popular → Breads → Sabji → Sweets & Desserts → Rice → Chinese & Momos → Satvik / Vrat Menu → Pizza & Pasta → Waffles → Burgers, Rolls & Sandwiches → Street Snacks → South Indian & Chilla → Beverages

Satvik / Vrat Menu gets a special amber feature shelf via `VratFeatureShelf` in `MenuShelf.jsx`.

## Meta Pixel (analytics)
Pixel ID: `1770238610672732` — base code in `index.html`.

Four events fired:
| Event | Where | Key attributes |
|-------|-------|----------------|
| `PageView` | `index.html` on load | — |
| `AddToCart` | `App.jsx` → `addItem` + variant picker | `content_name`, `content_ids`, `contents`, `value`, `currency` |
| `InitiateCheckout` | `App.jsx` → `openCart` | `content_ids`, `contents`, `num_items`, `value`, `currency` |
| `Purchase` | `Cart.jsx` → WhatsApp button click | `content_ids`, `contents`, `num_items`, `value`, `currency` |

All events wrapped in `typeof fbq !== "undefined"` guard. Free items (`isFree: true`) are excluded from all pixel events. `content_ids` use the item's slugified `id` field.

## Workflow rules
- **Never commit or push without the owner explicitly asking.** This is a live production app.
- Never delete offer/feature code — disable it with a flag instead (the free Masala Dosa offer was deleted once and the owner wants to potentially reuse that pattern).
- Test UI changes on a real phone when possible — the preview iframe uses `window.innerWidth` which can cause carousel bleed that doesn't happen on device.
