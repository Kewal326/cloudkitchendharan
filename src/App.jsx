import { useEffect, useMemo, useRef, useState } from "react";
import Cart from "./components/Cart.jsx";
import BannerCarousel from "./components/BannerCarousel.jsx";
import BpkihsGate, { hasValidBpkihsGatePass } from "./components/BpkihsGate.jsx";
import Confetti from "./components/Confetti.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ImagePreviewModal from "./components/ImagePreviewModal.jsx";
import MenuSection from "./components/MenuSection.jsx";
import SearchBar from "./components/SearchBar.jsx";
import StickySearchCategories from "./components/StickySearchCategories.jsx";
import { FREE_ITEM_ID, activeOffer } from "./data/offers.js";
import { categoryNames, menuCategories } from "./data/menu.js";
import { filterCategories } from "./utils/filter.js";
import { changeQuantity, getCartCount, price } from "./utils/order.js";

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  return categoryNames.includes(category) ? category : "All";
}

function updateCategoryUrl(category) {
  const url = new URL(window.location.href);
  url.hash = "";

  if (category === "All") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", category);
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.pushState({ category }, "", nextUrl);
  }
}

function openCartUrl() {
  const nextUrl = `${window.location.pathname}${window.location.search}#cart`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.pushState({ cartOpen: true }, "", nextUrl);
  }
}

export default function App() {
  const isBpkihsMode = import.meta.env.VITE_SITE_MODE === "bpkihs";
  const [hasBpkihsGatePass, setHasBpkihsGatePass] = useState(
    () => !isBpkihsMode || hasValidBpkihsGatePass()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState(getCategoryFromUrl);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("ck_cart");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartShaking, setCartShaking] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const confettiTimer = useRef(null);

  const filteredCategories = useMemo(
    () => filterCategories(menuCategories, { searchTerm, activeCategory }),
    [searchTerm, activeCategory]
  );
  const cartCount = getCartCount(cart);

  const regularTotal = useMemo(
    () => Object.values(cart).reduce((sum, item) => item.id === FREE_ITEM_ID ? sum : sum + item.price * item.quantity, 0),
    [cart]
  );
  const offerUnlocked = !!(activeOffer && regularTotal >= activeOffer.threshold);
  const hasFreeItem = FREE_ITEM_ID in cart;

  useEffect(() => {
    if (!activeOffer) return;
    if (offerUnlocked && !hasFreeItem) {
      setCart(c => ({
        ...c,
        [FREE_ITEM_ID]: { id: FREE_ITEM_ID, name: activeOffer.freeItem, price: 0, quantity: 1, isFree: true }
      }));
      clearTimeout(confettiTimer.current);
      setShowConfetti(true);
      setShowOfferModal(true);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 3200);
    } else if (!offerUnlocked && hasFreeItem) {
      setCart(c => { const next = { ...c }; delete next[FREE_ITEM_ID]; return next; });
    }
  }, [offerUnlocked, hasFreeItem]);

  useEffect(() => {
    try { localStorage.setItem("ck_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    function handlePopState() {
      setIsCartOpen(window.location.hash === "#cart");
      setSearchTerm("");
      setActiveCategory(getCategoryFromUrl());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function triggerCartShake() {
    setCartShaking(false);
    window.setTimeout(() => setCartShaking(true), 20);
    window.setTimeout(() => setCartShaking(false), 520);
  }

  function addItem(item) {
    setCart((current) => changeQuantity(current, item, 1));
    triggerCartShake();
  }

  function removeItem(item) {
    setCart((current) => changeQuantity(current, item, -1));
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
    if (value.trim()) {
      setActiveCategory("All");
      if (activeCategory !== "All") {
        updateCategoryUrl("All");
      }
    }
  }

  function handleCategoryChange(category) {
    if (searchTerm.trim()) {
      setSearchTerm("");
    }
    setActiveCategory(category);
    updateCategoryUrl(category);
  }

  function openCart() {
    setIsCartOpen(true);
    openCartUrl();
  }

  function closeCart() {
    setIsCartOpen(false);
    if (window.location.hash === "#cart") {
      window.history.back();
    }
  }

  if (!hasBpkihsGatePass) {
    return <BpkihsGate onUnlock={() => setHasBpkihsGatePass(true)} />;
  }

  return (
    <div className="min-h-screen bg-cream text-maroon-dark">
      <div className="sticky -top-[52px] z-30 bg-brand">
        <Header />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>
      <div
        className="overflow-hidden bg-brand transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: searchFocused || searchTerm ? 0 : 300 }}
      >
        <BannerCarousel />
      </div>

      <StickySearchCategories
        categories={categoryNames}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="mx-auto grid max-w-7xl gap-4 px-3 pb-24 pt-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pb-8">
        <div className="min-w-0">
          {filteredCategories.length ? (
            <div className="space-y-5">
              {filteredCategories.map((category) => (
                <MenuSection
                  key={category.name}
                  category={category}
                  cart={cart}
                  onAdd={addItem}
                  onRemove={removeItem}
                  onImageClick={setPreviewItem}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-maroon/10 bg-white p-6 text-center">
              <p className="font-black text-maroon-dark">No items found</p>
              <p className="mt-1 text-sm text-stone-700">
                Try a different search or choose All categories.
              </p>
            </div>
          )}
        </div>

        <Cart cart={cart} onAdd={addItem} onRemove={removeItem} desktop />
      </main>

      <Footer />

      <div className="fixed bottom-4 left-3 right-3 z-50 flex flex-col gap-2 lg:hidden">
        {activeOffer && (
          <div className={`flex items-center gap-3 rounded-full px-4 py-2.5 shadow-soft transition-colors duration-500 ${offerUnlocked ? "bg-green-800" : "bg-maroon-dark"}`}>
            <div className="min-w-0 flex-1">
              {offerUnlocked ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80">Your free treat is in the cart</span>
                  <span className="ml-2 shrink-0 font-black text-green-300">🎁 {activeOffer.freeItem} — FREE</span>
                </div>
              ) : (
                <>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white/80">Add {price(activeOffer.threshold - regularTotal)} more for</span>
                    <span className="ml-2 shrink-0 font-black text-gold">FREE {activeOffer.freeItem}!</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${Math.min(100, (regularTotal / activeOffer.threshold) * 100)}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={openCart}
          className={`flex h-12 w-full items-center justify-center rounded-full bg-action text-sm font-black text-maroon-dark shadow-soft ${
            cartShaking ? "animate-cart-shake" : ""
          }`}
        >
          {cartCount > 0 ? "Review order" : "View cart"}
          <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-xs text-maroon-dark">
            {cartCount}
          </span>
        </button>
      </div>

      <Cart
        cart={cart}
        onAdd={addItem}
        onRemove={removeItem}
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <ImagePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
      <Confetti active={showConfetti} />
      {showOfferModal && (
        <div className="fixed inset-0 z-[102] flex items-center justify-center bg-maroon-dark/60 px-6">
          <div className="w-full max-w-xs rounded-2xl bg-white px-6 pb-6 pt-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl">🎁</span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">Offer unlocked</p>
            <p className="mt-2 text-2xl font-black text-maroon-dark">Free {activeOffer.freeItem}!</p>
            <p className="mt-1 text-sm text-stone-500">
              Worth {price(activeOffer.freeItemPrice)} — added to your cart on us.
            </p>
            <button
              type="button"
              onClick={() => setShowOfferModal(false)}
              className="mt-6 w-full rounded-full bg-action py-3 text-base font-black text-maroon-dark"
            >
              Woohoo! Thanks 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
