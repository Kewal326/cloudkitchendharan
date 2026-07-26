import { useEffect, useMemo, useState } from "react";
import { activeOffer } from "../data/offers.js";
import {
  PRIMARY_PHONE,
  formatWhatsAppChat,
  formatWhatsAppOrder,
  getCartTotal,
  getWhatsAppUrl,
  price
} from "../utils/order.js";

function CartItems({ cart, onAdd, onRemove, notes, onNotesChange }) {
  const items = Object.values(cart);

  return (
    <>
      {items.length === 0 ? (
        <p className="rounded-lg bg-amber-50 p-4 text-sm font-semibold text-maroon">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) =>
            item.isFree ? (
              <div key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold text-maroon-dark">{item.name}</p>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-green-700">
                      FREE
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    <span className="line-through">{price(activeOffer?.freeItemPrice ?? 0)}</span>
                    <span className="ml-1 font-bold text-green-600">Rs.0</span>
                  </p>
                </div>
                <span className="text-lg" aria-label="Gift">🎁</span>
              </div>
            ) : (
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
                  <span className="self-center text-center text-xs font-black">{item.quantity}</span>
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
            )
          )}
        </div>
      )}

      <div className="mt-5">
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Notes (optional)"
          rows="3"
          className="w-full resize-none rounded-md border border-maroon/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold/20"
        />
      </div>
    </>
  );
}

function CartFooterActions({ cart, notes }) {
  const items = Object.values(cart);
  const total = getCartTotal(cart);
  const orderText = useMemo(
    () => formatWhatsAppOrder({ cart, notes, total, offer: activeOffer }),
    [cart, notes, total]
  );
  const whatsAppText = items.length ? orderText : formatWhatsAppChat();

  return (
    <>
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
        className="flex h-11 items-center justify-center rounded-full bg-action text-sm font-black text-maroon-dark hover:opacity-90"
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
    </>
  );
}

export default function Cart({ cart, onAdd, onRemove, isOpen, onClose, desktop = false }) {
  const [notes, setNotes] = useState(() => {
    try { return localStorage.getItem("ck_cart_notes") ?? ""; } catch { return ""; }
  });
  useEffect(() => {
    try { localStorage.setItem("ck_cart_notes", notes); } catch {}
  }, [notes]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), 310);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!desktop && isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen, desktop]);

  // Desktop: sticky sidebar
  if (desktop) {
    return (
      <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] flex-col rounded-lg border border-maroon/10 bg-white shadow-soft lg:flex">
        <div className="flex-shrink-0 border-b border-maroon/10 p-4">
          <h2 className="text-lg font-black text-maroon-dark">Your order</h2>
          <p className="mt-0.5 text-sm text-stone-700">
            Pay after confirmation. Order by WhatsApp or call directly.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <CartItems
            cart={cart}
            onAdd={onAdd}
            onRemove={onRemove}
            notes={notes}
            onNotesChange={setNotes}
          />
        </div>
        <div className="flex-shrink-0 border-t border-maroon/10 p-4">
          <CartFooterActions cart={cart} notes={notes} />
        </div>
      </aside>
    );
  }

  // Mobile: full-page cart
  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-cream transition-transform duration-300 lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header with back button */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-maroon/10 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-maroon/20 text-lg text-maroon"
        >
          ←
        </button>
        <div>
          <h1 className="text-base font-black text-maroon-dark">Your order</h1>
          <p className="text-xs text-stone-500">Pay after confirmation</p>
        </div>
      </div>

      {/* Scrollable items — no height tricks needed */}
      <div className="flex-1 overflow-y-auto p-4">
        <CartItems
          cart={cart}
          onAdd={onAdd}
          onRemove={onRemove}
          notes={notes}
          onNotesChange={setNotes}
        />
      </div>

      {/* Sticky footer */}
      <div className="flex-shrink-0 border-t border-maroon/10 bg-white px-4 py-4">
        <CartFooterActions cart={cart} notes={notes} />
      </div>
    </div>
  );
}
