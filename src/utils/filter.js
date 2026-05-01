function normalizeSearchValue(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function searchVariants(value) {
  const normalized = normalizeSearchValue(value);
  const words = normalized.split(/\s+/).filter(Boolean);
  const singularWords = words.map((word) => {
    if (word.endsWith("ies") && word.length > 3) {
      return `${word.slice(0, -3)}y`;
    }

    if (word.endsWith("s") && word.length > 1) {
      return word.slice(0, -1);
    }

    return word;
  });

  return [normalized, singularWords.join(" ")].filter(Boolean);
}

function valuesMatchSearch(haystack, query) {
  const haystackVariants = searchVariants(haystack);
  const queryVariants = searchVariants(query);

  return queryVariants.some((queryVariant) =>
    haystackVariants.some((haystackVariant) => haystackVariant.includes(queryVariant))
  );
}

export function filterCategories(categories, { searchTerm = "", activeCategory = "All" }) {
  const query = searchTerm.trim();
  const shouldSearchAllCategories = query.length > 0;

  return categories
    .filter(
      (category) =>
        shouldSearchAllCategories ||
        activeCategory === "All" ||
        category.name === activeCategory
    )
    .map((category) => {
      const categoryMatches = query && valuesMatchSearch(category.name, query);
      const items = categoryMatches
        ? category.items
        : query
        ? category.items.filter((item) => {
            const haystack = [item.name, item.description, ...(item.tags || [])]
              .join(" ");
            return valuesMatchSearch(haystack, query);
          })
        : category.items;

      return { ...category, items };
    })
    .filter((category) => category.items.length > 0);
}
