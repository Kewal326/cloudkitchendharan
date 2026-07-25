// Update to change the offer. Set activeOffer to null to disable entirely.
// Also update src/data/banners.js to reflect the offer in the banner carousel.
export const FREE_ITEM_ID = "__free_offer__";

export const activeOffer = {
  threshold: 1000,        // cart total (Rs.) needed to unlock
  freeItem: "Masala Dosa", // shown in nudge, cart, and WhatsApp message
  freeItemPrice: 200,     // original price — shown as strikethrough in cart
};
