import { getItemQuantity, price } from "../utils/order.js";
import { menuImageAlt } from "../utils/seo.js";

const PREVIEW_COUNT = 4;

function CardBase({ item, quantity, onAdd, onRemove, onImageClick, badge }) {
  return (
    <article className="w-36 flex-shrink-0">
      <div className="relative overflow-hidden rounded-xl">
        <button
          type="button"
          onClick={() => onImageClick(item)}
          className="block h-36 w-full"
          aria-label={`Preview ${item.name}`}
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

        {badge}

        {quantity > 0 ? (
          <div className="absolute bottom-2 right-2 flex items-center overflow-hidden rounded-full border border-maroon/20 bg-white shadow-sm">
            <button type="button" onClick={onRemove} className="flex h-7 w-7 items-center justify-center text-sm font-black text-maroon" aria-label={`Remove one ${item.name}`}>−</button>
            <span className="min-w-[1.25rem] text-center text-xs font-black text-maroon-dark">{quantity}</span>
            <button type="button" onClick={onAdd} className="flex h-7 w-7 items-center justify-center text-sm font-black text-maroon" aria-label={`Add one ${item.name}`}>+</button>
          </div>
        ) : (
          <button type="button" onClick={onAdd} className="absolute bottom-2 right-2 rounded-full border-2 border-maroon bg-white px-3 py-1 text-xs font-black text-maroon shadow-sm" aria-label={`Add ${item.name}`}>
            Add
          </button>
        )}
      </div>

      <div className="px-0.5 pt-2">
        <p className="truncate text-xs font-bold text-maroon-dark">{item.name}</p>
        {item.rating && (
          <div className="mt-0.5 flex items-center gap-1">
            <span className="text-[11px] font-bold text-amber-500">★ {item.rating % 1 === 0 ? item.rating : item.rating.toFixed(1)}</span>
            {item.ratingCount && <span className="text-[10px] text-stone-400">({item.ratingCount})</span>}
          </div>
        )}
        <p className="mt-1 text-sm font-extrabold text-maroon">{price(item.price)}</p>
      </div>
    </article>
  );
}

function ItemCard({ item, quantity, onAdd, onRemove, onImageClick }) {
  const isBestSeller = item.tags?.includes("best seller");
  const badge = isBestSeller ? (
    <div className="absolute bottom-0 left-0 top-0 flex w-5 items-center justify-center bg-amber-400">
      <span className="text-[8px] font-black uppercase tracking-widest text-maroon-dark" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        Best seller
      </span>
    </div>
  ) : null;
  return <CardBase item={item} quantity={quantity} onAdd={onAdd} onRemove={onRemove} onImageClick={onImageClick} badge={badge} />;
}

function VratFeatureShelf({ category, cart, onAdd, onRemove, onImageClick, onSeeAll }) {
  const preview = category.items.slice(0, PREVIEW_COUNT);
  const hasMore = category.items.length > PREVIEW_COUNT;

  return (
    <section id={shelfId(category.name)} className="my-2 overflow-hidden rounded-2xl border-2 border-amber-400 bg-amber-50">
      <div className="flex items-center justify-between bg-amber-400 px-4 py-3">
        <div>
          <h2 className="text-sm font-black text-amber-950">Vrat / Satvik menu 🙏</h2>
          <p className="mt-0.5 text-[10px] font-semibold text-amber-900">
            No onion · No garlic · Pure & fresh
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSeeAll(category.name)}
          className="shrink-0 rounded-full bg-amber-950 px-3 py-1 text-[11px] font-bold text-amber-300"
        >
          See all →
        </button>
      </div>
      <div className="-mx-0 no-scrollbar flex gap-2.5 overflow-x-auto bg-amber-50 px-4 pb-4 pt-3">
        {preview.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(cart, item)}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
            onImageClick={onImageClick}
          />
        ))}
        {hasMore && (
          <button
            type="button"
            onClick={() => onSeeAll(category.name)}
            aria-label={`See all ${category.items.length} items in ${category.name}`}
            className="flex h-36 w-16 flex-shrink-0 items-center justify-center pr-2"
            style={{ background: "linear-gradient(to right, transparent, #fffbeb 40%)" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-700 text-lg font-black text-amber-700">
              →
            </div>
          </button>
        )}
      </div>
    </section>
  );
}

export function shelfId(categoryName) {
  return "shelf-" + categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function MenuShelf({ category, cart, onAdd, onRemove, onImageClick, onSeeAll }) {
  if (category.name === "Satvik / Vrat Menu") {
    return (
      <VratFeatureShelf
        category={category}
        cart={cart}
        onAdd={onAdd}
        onRemove={onRemove}
        onImageClick={onImageClick}
        onSeeAll={onSeeAll}
      />
    );
  }

  const preview = category.items.slice(0, PREVIEW_COUNT);
  const hasMore = category.items.length > PREVIEW_COUNT;

  return (
    <section id={shelfId(category.name)} className="py-3">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-base font-black text-maroon-dark">{category.name}</h2>
        {hasMore && (
          <button
            type="button"
            onClick={() => onSeeAll(category.name)}
            className="text-sm font-bold text-maroon"
          >
            See all {category.items.length} →
          </button>
        )}
      </div>
      <div className="-mx-3 no-scrollbar flex gap-2.5 overflow-x-auto px-3 sm:-mx-5 sm:px-5">
        {preview.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(cart, item)}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
            onImageClick={onImageClick}
          />
        ))}
        {hasMore && (
          <button
            type="button"
            onClick={() => onSeeAll(category.name)}
            aria-label={`See all ${category.items.length} items in ${category.name}`}
            className="flex h-36 w-16 flex-shrink-0 items-center justify-center pr-2"
            style={{ background: "linear-gradient(to right, transparent, white 40%)" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-maroon text-lg font-black text-maroon">
              →
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
