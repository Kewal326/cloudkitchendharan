import { useEffect, useRef } from "react";
import { menuCategories } from "../data/menu.js";

const categoryImageMap = Object.fromEntries(
  menuCategories.map((cat) => [cat.name, cat.items[0]?.image])
);

const categoryImageOverrides = {
  "Popular": "/images/menu/paneer-butter-masala.jpg",
  "Street Snacks": "/images/menu/samosa-2-pcs.jpg",
};

const categoryShortNames = {
  "Burgers, Rolls & Sandwiches": "Burgers & Rolls",
  "South Indian & Chilla": "South Indian",
  "Satvik / Vrat Menu": "Vrat / Satvik",
};

export default function StickySearchCategories({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  const buttonRefs = useRef({});

  useEffect(() => {
    buttonRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  return (
    <div data-sticky className="sticky top-16 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur">
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-3 py-2.5 sm:px-5">
        {categories.map((category) => {
          const active = category === activeCategory;
          const image = categoryImageOverrides[category] ?? categoryImageMap[category];
          const label = categoryShortNames[category] ?? category;

          return (
            <button
              key={category}
              ref={(el) => { buttonRefs.current[category] = el; }}
              type="button"
              onClick={() => onCategoryChange(category)}
              className="flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-1.5"
            >
              <div
                className={`h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full transition-all ${
                  active
                    ? "ring-2 ring-maroon ring-offset-1"
                    : "ring-1 ring-maroon/15"
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={category}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/menu/placeholder.jpg";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-maroon">
                    <img
                      src="/images/brand/cloud-kitchen-logo.png"
                      alt="All categories"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <span
                className={`line-clamp-2 text-center text-[10px] font-black leading-tight ${
                  active ? "text-maroon" : "text-stone-800"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
