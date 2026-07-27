import { useMemo } from "react";
import { price } from "../utils/order.js";
import { menuImageAlt } from "../utils/seo.js";
import { getCartRecommendations } from "../utils/recommendations.js";

export default function CartRecommendations({ cart, onAdd }) {
  const recs = useMemo(() => getCartRecommendations(cart), [cart]);
  if (!recs.length) return null;

  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-black uppercase tracking-wide text-maroon/60">
        You might also like
      </p>
      <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1">
        {recs.map((item) => (
          <div
            key={item.id}
            className="flex w-28 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-maroon/10 bg-white"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={menuImageAlt(item)}
                loading="lazy"
                className="h-24 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/menu/placeholder.jpg";
                }}
              />
              {item.tags?.includes("best seller") && (
                <span className="absolute left-1.5 top-1.5 rounded bg-amber-100 px-1 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-700">
                  ★ Best
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-1.5">
              <p className="truncate text-[11px] font-extrabold text-maroon-dark">
                {item.name}
              </p>
              <p className="mt-0.5 text-[11px] font-black text-maroon">
                {price(item.price)}
              </p>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="mt-1.5 h-6 w-full rounded-md border border-maroon/25 text-[11px] font-black text-maroon"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
