import { useEffect, useRef } from "react";
import MenuSection from "./MenuSection.jsx";
import SearchBar from "./SearchBar.jsx";

const categoryShortNames = {
  "Burgers, Rolls & Sandwiches": "Burgers & Rolls",
  "South Indian & Chilla": "South Indian",
  "Satvik / Vrat Menu": "Vrat / Satvik",
};

export default function CategoryPage({
  filteredCategories,
  allCategoryNames,
  activeCategory,
  searchTerm,
  onSearchChange,
  onCategoryChange,
  onBack,
  cart,
  onAdd,
  onRemove,
  onImageClick,
}) {
  const chipRefs = useRef({});

  useEffect(() => {
    chipRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeCategory]);

  const title = searchTerm.trim()
    ? `Results for "${searchTerm}"`
    : activeCategory;

  return (
    <div className="min-h-screen animate-page-enter bg-cream">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Back row */}
        <div className="flex items-center gap-3 border-b border-maroon/10 px-3 py-3 sm:px-5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/20 text-maroon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="truncate text-base font-black text-maroon-dark">{title}</h1>
        </div>

        {/* Search */}
        <div className="bg-brand pb-2 pt-2">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>

        {/* Category chips */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-maroon/10 px-3 py-2.5 sm:px-5">
          {allCategoryNames.map((cat) => {
            const isActive = cat === activeCategory;
            const label = cat === "All" ? "All" : (categoryShortNames[cat] ?? cat);
            return (
              <button
                key={cat}
                ref={(el) => { chipRefs.current[cat] = el; }}
                type="button"
                onClick={() => cat === "All" ? onBack() : onCategoryChange(cat)}
                className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-maroon text-white"
                    : "border border-maroon/20 bg-white text-maroon"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="px-3 pb-32 pt-3 sm:px-5">
        {filteredCategories.length ? (
          <div className="space-y-5">
            {filteredCategories.map((category) => (
              <MenuSection
                key={category.name}
                category={category}
                cart={cart}
                onAdd={onAdd}
                onRemove={onRemove}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-maroon/10 bg-white p-6 text-center">
            <p className="font-black text-maroon-dark">No items found</p>
            <p className="mt-1 text-sm text-stone-700">
              Try a different search or choose another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
