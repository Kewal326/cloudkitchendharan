import { useEffect } from "react";
import { price } from "../utils/order.js";
import { menuImageAlt } from "../utils/seo.js";

export default function ItemBottomSheet({ item, cart, onAdd, onRemove, onClose }) {
  const quantity = item ? (cart[item.id]?.quantity ?? 0) : 0;

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  if (!item) return null;

  const isBestSeller = item.tags?.includes("best seller");

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close item details"
        onClick={onClose}
        className="absolute inset-0 bg-maroon-dark/60"
      />

      {/* X button + sheet stacked at the bottom */}
      <div className="relative w-full">
        {/* X button floating above the sheet, centered */}
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close item details"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-stone-600 shadow-soft"
          >
            ✕
          </button>
        </div>

        {/* Sheet */}
        <div className="animate-sheet-enter overflow-hidden rounded-t-2xl bg-white">
          {/* Drag handle */}
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-maroon/20" />
          </div>

          {/* Image */}
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={item.image}
              alt={menuImageAlt(item)}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/menu/placeholder.jpg";
              }}
            />
          </div>

          {/* Content */}
          <div className="px-4 pb-6 pt-4">
            {isBestSeller && (
              <span className="mb-2 inline-block rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-maroon-dark">
                Best seller
              </span>
            )}

            <h2 className="text-lg font-black text-maroon-dark">{item.name}</h2>

            {item.rating && (
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-sm font-bold text-amber-500">
                  ★ {item.rating % 1 === 0 ? item.rating : item.rating.toFixed(1)}
                </span>
                {item.ratingCount && (
                  <span className="text-xs text-stone-400">({item.ratingCount} ratings)</span>
                )}
              </div>
            )}

            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
            )}

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xl font-extrabold text-maroon">{price(item.price)}</span>

              {quantity > 0 ? (
                <div className="flex items-center overflow-hidden rounded-full border-2 border-maroon bg-white">
                  <button
                    type="button"
                    onClick={onRemove}
                    className="flex h-10 w-10 items-center justify-center text-lg font-black text-maroon"
                    aria-label={`Remove one ${item.name}`}
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center font-black text-maroon-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={onAdd}
                    className="flex h-10 w-10 items-center justify-center text-lg font-black text-maroon"
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onAdd}
                  className="whitespace-nowrap rounded-full bg-maroon px-8 py-2.5 text-sm font-black text-white"
                  aria-label={`Add ${item.name} to order`}
                >
                  Add to order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
