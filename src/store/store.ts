import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import favoritesReducer from "./favoritesSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
