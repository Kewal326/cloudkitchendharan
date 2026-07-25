import { useEffect, useRef } from "react";

export default function StickySearchCategories({
  categories,
  activeCategory,
  onCategoryChange,
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
    <div className="sticky top-16 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-5">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
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
                    ? "border-action bg-action text-maroon-dark"
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
