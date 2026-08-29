import { useEffect, useMemo, useRef, useState } from "react";
import Cart from "./components/Cart.jsx";
import BannerCarousel from "./components/BannerCarousel.jsx";
import BpkihsGate, { hasValidBpkihsGatePass } from "./components/BpkihsGate.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ItemBottomSheet from "./components/ItemBottomSheet.jsx";
import VariantPickerSheet from "./components/VariantPickerSheet.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import MenuSection from "./components/MenuSection.jsx";
import MenuShelf, { shelfId } from "./components/MenuShelf.jsx";
import SearchBar from "./components/SearchBar.jsx";
import StickySearchCategories from "./components/StickySearchCategories.jsx";
import MilestoneToast from "./components/MilestoneToast.jsx";
import { FREE_ITEM_OFFER_ENABLED, discountTiers, freeItemOffer, getDiscount, getNextTier } from "./data/offers.js";
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
  const [variantItem, setVariantItem] = useState(null);

  const filteredCategories = useMemo(
    () => filterCategories(menuCategories, { searchTerm, activeCategory }),
    [searchTerm, activeCategory]
  );
  const isShelfView = activeCategory === "All";
  const shelfCategories = (isShelfView && !searchTerm.trim()) ? (() => {
    const VRAT = "Satvik / Vrat Menu";
    const vrat = filteredCategories.find((c) => c.name === VRAT);
    if (!vrat) return filteredCategories;
    const rest = filteredCategories.filter((c) => c.name !== VRAT);
    return [...rest.slice(0, 2), vrat, ...rest.slice(2)];
  })() : filteredCategories;
  const cartCount = getCartCount(cart);

  const subtotal = useMemo(
    () => Object.values(cart).filter((i) => !i.isFree).reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const discount = getDiscount(subtotal);
  const nextTier = getNextTier(subtotal);
  const freeItemUnlocked = FREE_ITEM_OFFER_ENABLED && subtotal >= freeItemOffer.minOrder;

  // Auto-inject / remove free items when subtotal crosses the threshold
  useEffect(() => {
    if (!FREE_ITEM_OFFER_ENABLED) return;
    setCart((current) => {
      const next = { ...current };
      if (subtotal >= freeItemOffer.minOrder) {
        freeItemOffer.items.forEach((fi) => {
          const freeId = `__free__${fi.id}`;
          if (!next[freeId]) {
            next[freeId] = { id: freeId, name: fi.name, price: 0, originalPrice: fi.price, quantity: 1, isFree: true };
          }
        });
      } else {
        freeItemOffer.items.forEach((fi) => {
          delete next[`__free__${fi.id}`];
        });
      }
      return next;
    });
  }, [subtotal]);

  const [celebrating, setCelebrating] = useState(false);
  const [celebrationDiscount, setCelebrationDiscount] = useState(0);
  const prevDiscountRef = useRef(discount);
  useEffect(() => {
    if (discount > prevDiscountRef.current) {
      setCelebrationDiscount(discount);
      setCelebrating(true);
      const t = setTimeout(() => setCelebrating(false), 3500);
      prevDiscountRef.current = discount;
      return () => clearTimeout(t);
    }
    prevDiscountRef.current = discount;
  }, [discount]);

  const [celebratingFreeItem, setCelebratingFreeItem] = useState(false);
  const prevFreeItemUnlockedRef = useRef(freeItemUnlocked);
  useEffect(() => {
    if (freeItemUnlocked && !prevFreeItemUnlockedRef.current) {
      setCelebratingFreeItem(true);
      const t = setTimeout(() => setCelebratingFreeItem(false), 3500);
      prevFreeItemUnlockedRef.current = true;
      return () => clearTimeout(t);
    }
    prevFreeItemUnlockedRef.current = freeItemUnlocked;
  }, [freeItemUnlocked]);

  function handleScrollToShelf(categoryName) {
    if (categoryName === "All") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(shelfId(categoryName));
    if (!el) return;
    const stickyEls = document.querySelectorAll("[data-sticky]");
    const stickyHeight = Array.from(stickyEls).reduce((h, s) => h + s.getBoundingClientRect().height, 0);
    const top = el.getBoundingClientRect().top + window.scrollY - stickyHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    try { localStorage.setItem("ck_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    function handlePopState() {
      setIsCartOpen(window.location.hash === "#cart");
      setPreviewItem(null);
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
    if (item.variants?.length) {
      setPreviewItem(null);
      setVariantItem(item);
      return;
    }
    setCart((current) => changeQuantity(current, item, 1));
    triggerCartShake();
  }

  function removeItem(item) {
    if (item.variants?.length) {
      setCart((current) => {
        const variantEntry = Object.values(current).find(
          (ci) => ci.id.startsWith(item.id + "-") && ci.quantity > 0
        );
        if (!variantEntry) return current;
        return changeQuantity(current, variantEntry, -1);
      });
      return;
    }
    setCart((current) => changeQuantity(current, item, -1));
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
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

  function openItemDetail(item) {
    setPreviewItem(item);
    window.history.pushState({ itemDetail: true }, "", `${window.location.pathname}${window.location.search}#item-detail`);
  }

  function closeItemDetail() {
    setPreviewItem(null);
    if (window.location.hash === "#item-detail") {
      window.history.back();
    }
  }

  if (!hasBpkihsGatePass) {
    return <BpkihsGate onUnlock={() => setHasBpkihsGatePass(true)} />;
  }

  return (
    <div className="min-h-screen bg-cream text-maroon-dark">
      {isShelfView ? (
        <>
          <div data-sticky className="sticky -top-[52px] z-30 bg-brand">
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
            categories={categoryNames.filter((c) => c !== "All")}
            activeCategory={activeCategory}
            onCategoryChange={handleScrollToShelf}
          />
          <main className="mx-auto grid max-w-7xl gap-4 px-3 pb-24 pt-0 sm:px-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pb-8">
            <div className="min-w-0">
              {shelfCategories.length ? (
                <div className="divide-y divide-maroon/5">
                  {shelfCategories.map((category) => (
                    <MenuShelf
                      key={category.name}
                      category={category}
                      cart={cart}
                      onAdd={addItem}
                      onRemove={removeItem}
                      onImageClick={openItemDetail}
                      onSeeAll={handleCategoryChange}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-maroon/10 bg-white p-6 text-center">
                  <p className="font-black text-maroon-dark">No items found</p>
                  <p className="mt-1 text-sm text-stone-700">Try a different search or choose All categories.</p>
                </div>
              )}
            </div>
            <Cart cart={cart} onAdd={addItem} onRemove={removeItem} desktop />
          </main>
          <Footer />
        </>
      ) : (
        <CategoryPage
          filteredCategories={filteredCategories}
          allCategoryNames={categoryNames}
          activeCategory={activeCategory}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onBack={() => handleCategoryChange("All")}
          cart={cart}
          onAdd={addItem}
          onRemove={removeItem}
          onImageClick={openItemDetail}
        />
      )}

      <div className="fixed bottom-4 left-3 right-3 z-50 flex flex-col gap-3 lg:hidden">
        {/* Free item offer strip */}
        {FREE_ITEM_OFFER_ENABLED && (
          <div className={`rounded-2xl px-4 py-3 shadow-soft transition-colors duration-500 ${freeItemUnlocked ? "bg-green-800" : "bg-maroon-dark"}`}>
            {freeItemUnlocked ? (
              <p className="text-center text-xs font-black text-white">
                🎁 Free {freeItemOffer.label} added to your order!
              </p>
            ) : (
              <>
                <p className="mb-2 text-xs text-white/80">
                  Add <span className="font-black text-gold">{price(freeItemOffer.minOrder - subtotal)}</span> more for{" "}
                  <span className="font-black text-gold">Free {freeItemOffer.label}!</span>
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700"
                    style={{ width: `${Math.min(100, (subtotal / freeItemOffer.minOrder) * 100)}%` }}
                  />
                </div>
              </>
            )}
          </div>
        )}
        {/* Cash discount tier strip (hidden when both tiers are off) */}
        {(discount > 0 || nextTier) && (
          <div className="rounded-2xl bg-maroon-dark px-4 py-3 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs text-white/80">
                  {!nextTier ? (
                    <span className="font-black text-gold">Max discount applied — Rs.{discount} off!</span>
                  ) : discount > 0 ? (
                    <><span className="font-black text-gold">Rs.{discount} off unlocked!</span><span> Add {price(nextTier.min - subtotal)} for Rs.{nextTier.discount} off</span></>
                  ) : (
                    <>Add <span className="font-black text-gold">{price(nextTier.min - subtotal)}</span> more to get <span className="font-black text-gold">Rs.{nextTier.discount} off!</span></>
                  )}
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700"
                    style={{ width: `${Math.min(100, (subtotal / discountTiers[discountTiers.length - 1].min) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {discountTiers.map((tier) => {
                  const unlocked = subtotal >= tier.min;
                  return (
                    <div
                      key={tier.min}
                      className={`flex h-11 w-11 flex-col items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        unlocked ? "border-gold bg-gold text-maroon-dark" : "border-white/30 bg-transparent text-white/50"
                      }`}
                    >
                      <span className={`text-[11px] font-black leading-none ${unlocked ? "text-maroon-dark" : "text-white/60"}`}>₹{tier.discount}</span>
                      <span className={`text-[9px] leading-none ${unlocked ? "text-maroon-dark/70" : "text-white/40"}`}>off</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {cartCount > 0 && (
          <button
            type="button"
            onClick={openCart}
            className={`flex h-12 w-full items-center justify-center rounded-full bg-action text-sm font-black text-maroon-dark shadow-soft ${
              cartShaking ? "animate-cart-shake" : ""
            }`}
          >
            Review order
            <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-xs text-maroon-dark">
              {cartCount}
            </span>
          </button>
        )}
      </div>

      {celebrating && (
        <MilestoneToast discount={celebrationDiscount} onDismiss={() => setCelebrating(false)} />
      )}
      {celebratingFreeItem && (
        <MilestoneToast freeLabel={freeItemOffer.label} onDismiss={() => setCelebratingFreeItem(false)} />
      )}

      <Cart
        cart={cart}
        onAdd={addItem}
        onRemove={removeItem}
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <VariantPickerSheet
        item={variantItem}
        onSelect={(v) => {
          setCart((current) => changeQuantity(current, v, 1));
          triggerCartShake();
          setVariantItem(null);
        }}
        onClose={() => setVariantItem(null)}
      />
      <ItemBottomSheet
        item={previewItem}
        cart={cart}
        onAdd={() => { if (previewItem) addItem(previewItem); }}
        onRemove={() => { if (previewItem) removeItem(previewItem); }}
        onClose={closeItemDetail}
      />
    </div>
  );
}
