import { price } from "../utils/order.js";
import { menuImageAlt } from "../utils/seo.js";

function RatingStar({ fill }) {
  const clipId = `rating-star-${fill}`;

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

function BestSellerTag() {
  return (
    <div className="absolute right-0 top-0 z-10 flex h-5 w-28 items-center justify-end gap-0.5 rounded-tr-lg bg-gradient-to-r from-[#fff8f1]/0 via-[#fff1ed]/80 to-[#ffe2da] pr-2 text-[0.58rem] font-black leading-3 text-[#ff654f]">
      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11.5 2.8 13.9 8l5.6.7-4.1 3.8 1.1 5.5-5-2.8-5 2.8 1.1-5.5-4.1-3.8L9.1 8l2.4-5.2Z"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
        <path
          d="M4.8 20.3h11.8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span>Bestseller</span>
    </div>
  );
}

function MenuItemMeta({ item }) {
  const rating =
    item.rating && item.ratingCount
      ? { value: item.rating, count: item.ratingCount }
      : null;
  const visibleRating = rating
    ? {
        ...rating,
        value: Math.floor(rating.value * 2) / 2
      }
    : null;
  const showRating = visibleRating && visibleRating.value > 0 && visibleRating.count > 0;

  if (!showRating) {
    return null;
  }

  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[0.62rem] font-black leading-3">
      {showRating ? (
        <p className="flex shrink-0 items-center gap-0.5 text-maroon/70">
          <span
            className="flex items-center"
            aria-label={`${visibleRating.value} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => {
              const fill =
                index + 1 <= visibleRating.value
                  ? "full"
                  : index + 0.5 <= visibleRating.value
                    ? "half"
                    : "empty";
              return (
                <RatingStar key={index} fill={fill} />
              );
            })}
          </span>
          <span className="tabular-nums">
            ({visibleRating.count})
          </span>
        </p>
      ) : null}
    </div>
  );
}

export default function MenuItemRow({ item, quantity, onAdd, onRemove, onImageClick }) {
  const isBestSeller = item.tags?.includes("best seller");

  return (
    <article className="relative grid grid-cols-[4.25rem_1fr_auto] gap-3 border-b border-maroon/10 bg-white/55 px-3 py-2.5 last:border-b-0 sm:grid-cols-[5rem_1fr_auto] sm:px-4">
      {isBestSeller ? <BestSellerTag /> : null}
      <button
        type="button"
        onClick={() => onImageClick(item)}
        className="h-[4.5rem] w-[4.5rem] self-center overflow-hidden rounded-md border border-maroon/10 bg-white sm:h-[5.5rem] sm:w-[5.5rem]"
        aria-label={`Preview ${item.name}`}
      >
        <img
          src={item.image}
          alt={menuImageAlt(item)}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/menu/placeholder.jpg";
          }}
        />
      </button>

      <div className="min-w-0 self-center">
        <h3 className="truncate text-sm font-extrabold text-maroon-dark sm:text-base">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-stone-700 sm:text-sm">
          {item.description}
        </p>
        <MenuItemMeta item={item} />
        <p className="mt-1 text-sm font-black text-maroon">{price(item.price)}</p>
      </div>

      <div className="flex items-center justify-end self-center">
        {quantity > 0 ? (
          <div className="grid h-9 grid-cols-[2rem_2rem_2rem] items-center overflow-hidden rounded-full border border-maroon/20 bg-white text-maroon shadow-sm">
            <button
              type="button"
              onClick={onRemove}
              className="h-full text-lg font-black hover:bg-amber-50"
              aria-label={`Remove one ${item.name}`}
            >
              -
            </button>
            <span className="text-center text-sm font-black">{quantity}</span>
            <button
              type="button"
              onClick={onAdd}
              className="h-full text-lg font-black hover:bg-amber-50"
              aria-label={`Add one ${item.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="h-9 rounded-full bg-maroon px-4 text-sm font-black text-white shadow-sm transition hover:bg-maroon-dark"
          >
            Add
          </button>
        )}
      </div>
    </article>
  );
}
