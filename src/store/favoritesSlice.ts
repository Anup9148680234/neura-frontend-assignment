import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  ids: number[];
};

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.ids = state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id];
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
