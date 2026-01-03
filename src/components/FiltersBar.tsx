import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCategories, selectFilters } from "../store/selectors";
import { setCategory, setSearch, setSortBy, type SortBy } from "../store/filtersSlice";
import { useDebouncedValue } from "./useDebouncedValue";

export default function FiltersBar() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const filters = useAppSelector(selectFilters);

  const [localSearch, setLocalSearch] = useState(filters.search);
  const debounced = useDebouncedValue(localSearch, 350);

  useEffect(() => {
    dispatch(setSearch(debounced));
  }, [debounced, dispatch]);

  return (
    <section className="filters" aria-label="Search and filters">
      <div className="field">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          value={localSearch}
          placeholder="Search by title…"
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort</label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortBy))}
        >
          <option value="none">None</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>
    </section>
  );
}
