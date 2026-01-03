import { useEffect } from "react";
import FiltersBar from "../components/FiltersBar";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCategories, fetchProducts } from "../store/productsSlice";
import { selectFilteredProducts } from "../store/selectors";

export default function ProductListingPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector((s) => s.products.status);
  const error = useAppSelector((s) => s.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <main>
      <FiltersBar />

      {status === "loading" && <p className="muted">Loading products…</p>}
      {status === "failed" && <p className="muted">Error: {error}</p>}

      <section className="grid" aria-label="Product list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
