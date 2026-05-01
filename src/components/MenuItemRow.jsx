import { price } from "../utils/order.js";

export default function MenuItemRow({ item, quantity, onAdd, onRemove, onImageClick }) {
  return (
    <article className="grid grid-cols-[4.25rem_1fr_auto] gap-3 border-b border-maroon/10 bg-white/55 px-3 py-2.5 last:border-b-0 sm:grid-cols-[5rem_1fr_auto] sm:px-4">
      <button
        type="button"
        onClick={() => onImageClick(item)}
        className="h-16 w-16 overflow-hidden rounded-md border border-maroon/10 bg-white sm:h-20 sm:w-20"
        aria-label={`Preview ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
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
