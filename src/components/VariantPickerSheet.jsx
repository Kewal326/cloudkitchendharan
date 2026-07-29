import { useEffect } from "react";
import { price } from "../utils/order.js";
import { slugify } from "../data/menu.js";

export default function VariantPickerSheet({ item, onSelect, onClose }) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-maroon-dark/60"
      />
      <div className="relative w-full">
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-stone-600 shadow-soft"
          >
            ✕
          </button>
        </div>
        <div className="animate-sheet-enter rounded-t-2xl bg-white px-4 pb-8 pt-4">
          <div className="flex justify-center pb-3">
            <div className="h-1 w-10 rounded-full bg-maroon/20" />
          </div>
          <h2 className="mb-1 text-base font-black text-maroon-dark">{item.name}</h2>
          <p className="mb-4 text-xs text-stone-500">Choose a size</p>
          <div className="flex flex-col gap-3">
            {item.variants.map((variant) => {
              const variantItem = {
                id: `${item.id}-${slugify(variant.label)}`,
                name: `${item.name} (${variant.label})`,
                price: variant.price,
                image: item.image,
                tags: item.tags,
              };
              return (
                <div
                  key={variant.label}
                  className="flex items-center gap-3 rounded-xl border border-maroon/15 bg-cream p-3"
                >
                  <img
                    src={item.image}
                    alt={variant.label}
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/menu/placeholder.jpg"; }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-maroon-dark">{variant.label}</p>
                    <p className="mt-0.5 text-sm font-black text-maroon">{price(variant.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelect(variantItem)}
                    className="flex-shrink-0 rounded-full border-2 border-maroon px-5 py-1.5 text-sm font-black text-maroon active:bg-maroon active:text-white"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
