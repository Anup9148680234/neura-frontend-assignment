import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import productsReducer from "../store/productsSlice";
import favoritesReducer from "../store/favoritesSlice";
import filtersReducer from "../store/filtersSlice";
import ProductListingPage from "./ProductListingPage";

// IMPORTANT: mock the async thunks triggered in useEffect so no fetch runs
vi.mock("../store/productsSlice", async () => {
  const actual = await vi.importActual<typeof import("../store/productsSlice")>(
    "../store/productsSlice"
  );
  return {
    ...actual,
    fetchProducts: () => ({ type: "products/fetchProducts/mock" }),
    fetchCategories: () => ({ type: "products/fetchCategories/mock" }),
  };
});

function renderWithStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
      filters: filtersReducer,
    },
    preloadedState: {
      products: {
        items: [
          {
            id: 1,
            title: "Red Bag",
            price: 10,
            description: "x",
            category: "bags",
            image: "img",
          },
          {
            id: 2,
            title: "Blue Shirt",
            price: 20,
            description: "y",
            category: "clothes",
            image: "img",
          },
        ],
        categories: ["bags", "clothes"],
        selected: null,
        status: "succeeded" as const,
        error: null,
      },
      favorites: { ids: [] },
      filters: { search: "", category: "all", sortBy: "none" as const },
    },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductListingPage />
      </BrowserRouter>
    </Provider>
  );

  return store;
}

describe("ProductListingPage UI behavior", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("search filters products by title (debounced)", async () => {
    renderWithStore();
    const user = userEvent.setup();

    expect(screen.getByText(/Red Bag/i)).toBeInTheDocument();
    expect(screen.getByText(/Blue Shirt/i)).toBeInTheDocument();

    // must match your label text in FiltersBar: <label htmlFor="search">Search</label>
    const searchInput = screen.getByRole("textbox", { name: /^search$/i });

    await user.type(searchInput, "bag");

    // Wait for debounce + state update
    await waitFor(() => {
      expect(screen.queryByText(/Blue Shirt/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Red Bag/i)).toBeInTheDocument();
  });

  it("favorite button toggles state", async () => {
    renderWithStore();
    const user = userEvent.setup();

    const addButtons = screen.getAllByRole("button", { name: /add favorite/i });
    expect(addButtons.length).toBeGreaterThan(0);

    // Click the first product’s favorite button
    await user.click(addButtons[0]);

    // That same button should now become "Remove Favorite"
    expect(
      screen.getAllByRole("button", { name: /remove favorite/i }).length
    ).toBeGreaterThan(0);
  });
});
