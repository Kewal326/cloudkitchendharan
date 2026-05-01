import MenuItemRow from "./MenuItemRow.jsx";

export default function MenuSection({ category, cart, onAdd, onRemove, onImageClick }) {
  return (
    <section className="scroll-mt-28" aria-labelledby={`${category.name}-heading`}>
      <div className="mb-2 flex items-end justify-between gap-3 px-1">
        <h2
          id={`${category.name}-heading`}
          className="text-lg font-black text-maroon-dark sm:text-xl"
        >
          {category.name}
        </h2>
        <span className="text-xs font-bold uppercase tracking-wide text-maroon/55">
          {category.items.length} items
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-sm">
        {category.items.map((item) => (
          <MenuItemRow
            key={`${category.name}-${item.id}`}
            item={item}
            quantity={cart[item.id]?.quantity ?? 0}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </section>
  );
}
