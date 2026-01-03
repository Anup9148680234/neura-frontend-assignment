import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories, getProduct, getProducts, type ApiProduct } from "../api/fakeStore";

type ProductsState = {
  items: ApiProduct[];
  categories: string[];
  selected: ApiProduct | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  categories: [],
  selected: null,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProducts();
});

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  return await getCategories();
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id: number) => {
  return await getProduct(id);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      // categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // single
      .addCase(fetchProductById.pending, (state) => {
        state.selected = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected } = productsSlice.actions;
export default productsSlice.reducer;
