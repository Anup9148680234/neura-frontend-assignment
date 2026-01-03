import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppSelector } from "../store/hooks";
import { selectFavoritesIds, selectProducts } from "../store/selectors";

export default function FavoritesPage() {
  const ids = useAppSelector(selectFavoritesIds);
  const products = useAppSelector(selectProducts);

  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <main>
      <h2>Favorites</h2>
      {ids.length === 0 ? (
        <p className="muted">
          No favorites yet. <Link to="/">Browse products</Link>
        </p>
      ) : (
        <section className="grid" aria-label="Favorite products">
          {favorites.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      )}
    </main>
  );
}
