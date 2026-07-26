import { useId } from "react";
import { price } from "../utils/order.js";
import { menuImageAlt } from "../utils/seo.js";

function RatingStar({ fill }) {
  const uid = useId();
  const clipId = `rating-star-${uid}`;

  return (
    <svg className="h-[0.68rem] w-[0.68rem]" viewBox="0 0 24 24" aria-hidden="true">
      {fill === "half" ? (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      ) : null}
      <path
        d="M12 2.8 14.8 8.5l6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z"
        className="fill-maroon/20"
      />
      {fill !== "empty" ? (
        <path
          d="M12 2.8 14.8 8.5l6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z"
          className="fill-gold"
          clipPath={fill === "half" ? `url(#${clipId})` : undefined}
        />
      ) : null}
    </svg>
  );
}

function MenuItemMeta({ item }) {
  const rating = item.rating && item.ratingCount
    ? { value: item.rating, count: item.ratingCount }
    : null;
  const visibleRating = rating
    ? { ...rating, value: Math.floor(rating.value * 2) / 2 }
    : null;
  const showRating = visibleRating && visibleRating.value > 0 && visibleRating.count > 0;

  if (!showRating) return null;

  return (
    <p className="mt-0.5 flex items-center gap-0.5 text-[0.62rem] font-black leading-3 text-maroon/70">
      <span className="flex items-center" aria-label={`${visibleRating.value} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => {
          const fill = i + 1 <= visibleRating.value ? "full"
            : i + 0.5 <= visibleRating.value ? "half"
            : "empty";
          return <RatingStar key={i} fill={fill} />;
        })}
      </span>
      <span className="tabular-nums">({visibleRating.count})</span>
    </p>
  );
}

export default function MenuItemRow({ item, quantity, onAdd, onRemove, onImageClick }) {
  const isBestSeller = item.tags?.includes("best seller");

  return (
    <article className="flex gap-4 border-b border-maroon/10 bg-white px-4 py-4 first:pt-2 last:border-b-0">

      {/* Left: text — name, rating, price, description */}
      <div className="min-w-0 flex-1 self-center">
        {isBestSeller && (
          <span className="mb-1.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700">
            ★ Bestseller
          </span>
        )}
        <h3 className="text-sm font-extrabold leading-snug text-maroon-dark sm:text-base">
          {item.name}
        </h3>
        <MenuItemMeta item={item} />
        <p className="mt-1 text-sm font-black text-maroon">{price(item.price)}</p>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">
            {item.description}
          </p>
        )}
      </div>

      {/* Right: image with Add button overlaid at bottom-center */}
      <div className="relative flex-shrink-0 self-start pt-1">
        {/* Image — tappable for detail sheet */}
        <button
          type="button"
          onClick={() => onImageClick(item)}
          aria-label={`Preview ${item.name}`}
          className="block h-36 w-36 overflow-hidden rounded-xl border border-maroon/10"
        >
          <img
            src={item.image}
            alt={menuImageAlt(item)}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/menu/placeholder.jpg";
            }}
          />
        </button>

        {/* Add / quantity overlaid at bottom of image, center-aligned */}
        <div className="absolute inset-x-2 bottom-2">
          {quantity > 0 ? (
            <div className="flex h-8 items-center justify-between overflow-hidden rounded-lg border border-maroon/25 bg-white shadow-md">
              <button
                type="button"
                onClick={onRemove}
                className="flex h-full w-8 items-center justify-center font-black text-maroon"
                aria-label={`Remove one ${item.name}`}
              >
                −
              </button>
              <span className="text-sm font-black text-maroon-dark">{quantity}</span>
              <button
                type="button"
                onClick={onAdd}
                className="flex h-full w-8 items-center justify-center font-black text-maroon"
                aria-label={`Add one ${item.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Add ${item.name}`}
              className="h-8 w-full rounded-lg border border-maroon/25 bg-white text-sm font-black text-maroon shadow-md"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
