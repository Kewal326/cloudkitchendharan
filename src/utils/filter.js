export function filterCategories(categories, { searchTerm = "", activeCategory = "All" }) {
  const query = searchTerm.trim().toLowerCase();
  const shouldSearchAllCategories = query.length > 0;

  return categories
    .filter(
      (category) =>
        shouldSearchAllCategories ||
        activeCategory === "All" ||
        category.name === activeCategory
    )
    .map((category) => {
      const items = query
        ? category.items.filter((item) => {
            const haystack = [item.name, item.description, ...(item.tags || [])]
              .join(" ")
              .toLowerCase();
            return haystack.includes(query);
          })
        : category.items;

      return { ...category, items };
    })
    .filter((category) => category.items.length > 0);
}
