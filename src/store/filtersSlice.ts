import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortBy = "none" | "price_asc" | "price_desc";

type FiltersState = {
  search: string;
  category: string; // "all" or actual category
  sortBy: SortBy;
};

const initialState: FiltersState = {
  search: "",
  category: "all",
  sortBy: "none",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setCategory, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
