import { allMenuItems, itemCategoryMap, menuCategories } from "../data/menu.js";

const categoryPairings = {
  "Popular":                     ["Beverages", "Sabji"],
  "Breads":                      ["Sabji", "Beverages"],
  "Sabji":                       ["Breads", "Rice"],
  "Rice":                        ["Sabji", "Beverages"],
  "Chinese & Momos":             ["Beverages", "Street Snacks"],
  "Pizza & Pasta":               ["Beverages", "Waffles"],
  "Waffles":                     ["Beverages"],
  "Burgers, Rolls & Sandwiches": ["Beverages", "Street Snacks"],
  "Street Snacks":               ["Beverages", "Waffles"],
  "South Indian & Chilla":       ["Beverages", "Street Snacks"],
  "Satvik / Vrat Menu":          ["Beverages", "Rice"],
  "Beverages":                   ["Street Snacks", "Waffles"],
};

const cokeItem = allMenuItems.find((i) => i.name === "Coke / Fanta / Sprite");

export function getCartRecommendations(cart, count = 5) {
  const cartItems = Object.values(cart).filter((i) => !i.isFree);
  if (!cartItems.length) return [];

  const cartItemIds = new Set(cartItems.map((i) => i.id));
  const hasHotDrinkInCart = cartItems.some((i) => i.tags?.includes("hot drink"));

  const cartCategories = new Set(
    cartItems.map((i) => itemCategoryMap[i.id]).filter(Boolean)
  );

  const pairedCategories = new Set();
  cartCategories.forEach((cat) => {
    (categoryPairings[cat] ?? []).forEach((p) => pairedCategories.add(p));
    pairedCategories.add(cat); // also recommend more from the same category
  });

  const seen = new Set();
  const candidates = [];

  menuCategories
    .filter((cat) => pairedCategories.has(cat.name))
    .flatMap((cat) => cat.items)
    .filter((item) => !cartItemIds.has(item.id))
    .forEach((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        candidates.push(item);
      }
    });

  // Bestsellers first, then by rating
  candidates.sort((a, b) => {
    const aBS = a.tags?.includes("best seller") ? 1 : 0;
    const bBS = b.tags?.includes("best seller") ? 1 : 0;
    if (bBS !== aBS) return bBS - aBS;
    return (b.rating ?? 0) - (a.rating ?? 0);
  });

  // Max 1 item per category
  const seenCategories = new Set();
  const deduped = candidates.filter((item) => {
    const cat = itemCategoryMap[item.id];
    if (!cat || seenCategories.has(cat)) return false;
    seenCategories.add(cat);
    return true;
  });

  // Always include Coke/Fanta/Sprite unless a hot drink is in the cart or Coke is already there
  if (cokeItem && !hasHotDrinkInCart && !cartItemIds.has(cokeItem.id)) {
    const cokeIdx = deduped.findIndex((i) => i.id === cokeItem.id);
    if (cokeIdx === -1) {
      // Replace an existing Beverages rec if one exists, otherwise append/replace last
      const bevIdx = deduped.findIndex((i) => itemCategoryMap[i.id] === "Beverages");
      if (bevIdx !== -1) {
        deduped[bevIdx] = cokeItem;
      } else if (deduped.length >= count) {
        deduped[count - 1] = cokeItem;
      } else {
        deduped.push(cokeItem);
      }
    }
  }

  return deduped.slice(0, count);
}
