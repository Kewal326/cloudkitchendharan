export const PRIMARY_PHONE = "9812356907";
export const SECONDARY_PHONE = "9709206037";
export const WHATSAPP_PHONE = "9779812356907";

export const price = (value) => `Rs.${value}`;

export function getItemQuantity(cart, item) {
  if (item.variants?.length) {
    return Object.values(cart)
      .filter((ci) => ci.id.startsWith(item.id + "-"))
      .reduce((s, ci) => s + ci.quantity, 0);
  }
  return cart[item.id]?.quantity ?? 0;
}

export function getCartCount(cart) {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart) {
  return Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function changeQuantity(cart, item, delta) {
  const existing = cart[item.id]?.quantity ?? 0;
  const nextQuantity = Math.max(0, existing + delta);
  const next = { ...cart };

  if (nextQuantity === 0) {
    delete next[item.id];
    return next;
  }

  next[item.id] = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: nextQuantity
  };

  return next;
}

export function formatWhatsAppOrder({ cart, notes, total, offer }) {
  const lines = Object.values(cart)
    .filter((item) => !item.isFree)
    .map((item) => `- ${item.name} x ${item.quantity} = ${price(item.price * item.quantity)}`);

  const offerUnlocked = offer && total >= offer.threshold;
  if (offerUnlocked) {
    lines.push(`🎁 FREE ${offer.freeItem} (offer applied)`);
  }

  return [
    "Namaste Cloud Kitchen, I would like to place an order.",
    "",
    notes ? `Notes: ${notes}` : "Notes: -",
    "",
    "Order:",
    ...lines,
    "",
    `Total: ${price(total)}`,
    ...(offerUnlocked
      ? [`🎉 Free ${offer.freeItem} included — order above Rs.${offer.threshold}`]
      : []),
    "",
    "Delivery charges may apply based on delivery location.",
    "",
    "Delivery/Pickup: Please confirm availability and timing."
  ].join("\n");
}

export function formatWhatsAppChat() {
  return [
    "Namaste Cloud Kitchen, I would like to know more before placing an order.",
    "",
    "Please share availability and delivery details."
  ].join("\n");
}

export function getWhatsAppUrl(orderText) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(orderText)}`;
}
