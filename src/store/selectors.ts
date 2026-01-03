import type { RootState } from "./store";

export const selectProducts = (s: RootState) => s.products.items;
export const selectCategories = (s: RootState) => s.products.categories;
export const selectSelectedProduct = (s: RootState) => s.products.selected;

export const selectFavoritesIds = (s: RootState) => s.favorites.ids;

export const selectFilters = (s: RootState) => s.filters;

export const selectFilteredProducts = (s: RootState) => {
  const { search, category, sortBy } = s.filters;
  let out = s.products.items;

  const q = search.trim().toLowerCase();
  if (q) out = out.filter((p) => p.title.toLowerCase().includes(q));

  if (category !== "all") out = out.filter((p) => p.category === category);

  if (sortBy === "price_asc") out = [...out].sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") out = [...out].sort((a, b) => b.price - a.price);

  return out;
};
