import { useEffect, useMemo, useState } from "react";
import Cart from "./components/Cart.jsx";
import BpkihsGate, { hasValidBpkihsGatePass } from "./components/BpkihsGate.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ImagePreviewModal from "./components/ImagePreviewModal.jsx";
import MenuSection from "./components/MenuSection.jsx";
import StickySearchCategories from "./components/StickySearchCategories.jsx";
import { categoryNames, menuCategories } from "./data/menu.js";
import { filterCategories } from "./utils/filter.js";
import { changeQuantity, getCartCount } from "./utils/order.js";

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
  const [activeCategory, setActiveCategory] = useState(getCategoryFromUrl);
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartShaking, setCartShaking] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const filteredCategories = useMemo(
    () => filterCategories(menuCategories, { searchTerm, activeCategory }),
    [searchTerm, activeCategory]
  );
  const cartCount = getCartCount(cart);

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
      <Header />

      <StickySearchCategories
        categories={categoryNames}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
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

      <button
        type="button"
        onClick={openCart}
        className={`fixed bottom-4 left-3 right-3 z-40 flex h-12 items-center justify-center rounded-full bg-maroon text-sm font-black text-white shadow-soft lg:hidden ${
          cartShaking ? "animate-cart-shake" : ""
        }`}
      >
        {cartCount > 0 ? "Review order" : "View cart"}
        <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-xs text-maroon-dark">
          {cartCount}
        </span>
      </button>

      <Cart
        cart={cart}
        onAdd={addItem}
        onRemove={removeItem}
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <ImagePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
    </div>
  );
}
