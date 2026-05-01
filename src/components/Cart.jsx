import { useMemo, useState } from "react";
import {
  PRIMARY_PHONE,
  formatWhatsAppChat,
  formatWhatsAppOrder,
  getCartTotal,
  getWhatsAppUrl,
  price
} from "../utils/order.js";

function CartContent({ cart, onAdd, onRemove, onClose }) {
  const [notes, setNotes] = useState("");
  const items = Object.values(cart);
  const total = getCartTotal(cart);
  const orderText = useMemo(
    () => formatWhatsAppOrder({ cart, notes, total }),
    [cart, notes, total]
  );
  const whatsAppText = items.length ? orderText : formatWhatsAppChat();

  return (
    <div className="flex max-h-[86vh] flex-col">
      <div className="border-b border-maroon/10 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-maroon-dark">Your order</h2>
            <p className="mt-0.5 text-sm text-stone-700">
              Pay after confirmation. Order by WhatsApp or call directly.
            </p>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/15 bg-white text-2xl font-black leading-none text-maroon shadow-sm"
              aria-label="Close cart"
            >
              &times;
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="rounded-lg bg-amber-50 p-4 text-sm font-semibold text-maroon">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <p className="text-sm font-extrabold text-maroon-dark">{item.name}</p>
                  <p className="text-xs text-stone-600">
                    {price(item.price)} x {item.quantity}
                  </p>
                </div>
                <div className="grid h-8 grid-cols-[1.75rem_1.75rem_1.75rem] overflow-hidden rounded-full border border-maroon/20 bg-white text-maroon">
                  <button
                    type="button"
                    onClick={() => onRemove(item)}
                    className="font-black hover:bg-amber-50"
                    aria-label={`Remove one ${item.name}`}
                  >
                    -
                  </button>
                  <span className="self-center text-center text-xs font-black">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAdd(item)}
                    className="font-black hover:bg-amber-50"
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Notes (optional)"
            rows="3"
            className="w-full resize-none rounded-md border border-maroon/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold/20"
          />
        </div>
      </div>

      <div className="border-t border-maroon/10 bg-white p-4">
        <div className="mb-3 flex items-center justify-between text-base font-black text-maroon-dark">
          <span>Total</span>
          <span>{price(total)}</span>
        </div>
        <p className="mb-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-maroon/80">
          Delivery charges may apply based on delivery location.
        </p>
        <a
          href={getWhatsAppUrl(whatsAppText)}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center rounded-full bg-maroon text-sm font-black text-white hover:bg-maroon-dark"
        >
          Order on WhatsApp
        </a>
        <div className="mt-2">
          <a
            href={`tel:${PRIMARY_PHONE}`}
            className="flex h-10 items-center justify-center rounded-full border border-maroon/20 bg-amber-50 text-sm font-black text-maroon"
          >
            Call {PRIMARY_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Cart({
  cart,
  onAdd,
  onRemove,
  isOpen,
  onClose,
  desktop = false
}) {
  if (desktop) {
    return (
      <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-soft lg:block">
        <CartContent cart={cart} onAdd={onAdd} onRemove={onRemove} />
      </aside>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 bg-maroon-dark/45 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 rounded-t-2xl bg-cream shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-maroon/20" />
        <CartContent cart={cart} onAdd={onAdd} onRemove={onRemove} onClose={onClose} />
      </div>
    </div>
  );
}
