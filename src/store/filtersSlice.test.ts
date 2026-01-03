import { describe, expect, it } from "vitest";
import reducer, { setCategory, setSearch, setSortBy } from "./filtersSlice";

describe("filtersSlice", () => {
  it("sets search", () => {
    const s = reducer(undefined, setSearch("bag"));
    expect(s.search).toBe("bag");
  });

  it("sets category", () => {
    const s = reducer(undefined, setCategory("electronics"));
    expect(s.category).toBe("electronics");
  });

  it("sets sort", () => {
    const s = reducer(undefined, setSortBy("price_desc"));
    expect(s.sortBy).toBe("price_desc");
  });
});
