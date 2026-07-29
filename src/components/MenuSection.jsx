import MenuItemRow from "./MenuItemRow.jsx";
import { getItemQuantity } from "../utils/order.js";

export default function MenuSection({ category, cart, onAdd, onRemove, onImageClick }) {
  return (
    <section className="scroll-mt-28" aria-labelledby={`${category.name}-heading`}>
      <div>
        {category.items.map((item) => (
          <MenuItemRow
            key={`${category.name}-${item.id}`}
            item={item}
            quantity={getItemQuantity(cart, item)}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </section>
  );
}
