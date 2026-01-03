import { describe, expect, it } from "vitest";
import reducer, { addFavorite, removeFavorite, toggleFavorite } from "./favoritesSlice";

describe("favoritesSlice", () => {
  it("adds unique favorites", () => {
    const s1 = reducer(undefined, addFavorite(1));
    const s2 = reducer(s1, addFavorite(1));
    expect(s2.ids).toEqual([1]);
  });

  it("toggles favorites", () => {
    const s1 = reducer(undefined, toggleFavorite(2));
    expect(s1.ids).toEqual([2]);
    const s2 = reducer(s1, toggleFavorite(2));
    expect(s2.ids).toEqual([]);
  });

  it("removes favorites", () => {
    const s1 = reducer({ ids: [1, 2] }, removeFavorite(1));
    expect(s1.ids).toEqual([2]);
  });
});
