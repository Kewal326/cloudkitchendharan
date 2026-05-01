import { useEffect, useRef } from "react";

export default function StickySearchCategories({
  categories,
  activeCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange
}) {
  const categoryButtonRefs = useRef({});

  useEffect(() => {
    categoryButtonRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-30 border-b border-maroon/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-5">
        <label className="sr-only" htmlFor="menu-search">
          Search menu
        </label>
        <input
          id="menu-search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search paneer, pizza, vrat..."
          className="h-11 w-full rounded-full border border-maroon/20 bg-white px-4 text-base text-maroon-dark outline-none transition placeholder:text-maroon/45 focus:border-gold focus:ring-4 focus:ring-gold/20"
        />

        <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-maroon/75 ring-1 ring-maroon/10">
          🧄 No onion/garlic available on request
        </p>

        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                ref={(button) => {
                  categoryButtonRefs.current[category] = button;
                }}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-bold transition ${
                  active
                    ? "border-maroon bg-maroon text-white"
                    : "border-maroon/15 bg-white text-maroon hover:border-gold"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
