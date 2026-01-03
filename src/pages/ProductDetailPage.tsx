import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductById } from "../store/productsSlice";
import { selectFavoritesIds, selectSelectedProduct } from "../store/selectors";
import { toggleFavorite } from "../store/favoritesSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useAppSelector(selectSelectedProduct);
  const favIds = useAppSelector(selectFavoritesIds);
  const dispatch = useAppDispatch();

  const productId = Number(id);

  useEffect(() => {
    if (!Number.isFinite(productId)) return;
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (!Number.isFinite(productId)) {
    return (
      <main className="card">
        <p>Invalid product id.</p>
        <Link to="/">Back</Link>
      </main>
    );
  }

  if (!product) return <p className="muted">Loading product…</p>;

  const isFav = favIds.includes(product.id);

  return (
    <main className="detail">
      <Link to="/" className="muted">← Back to products</Link>

      <div className="detailBody">
        <img className="detailImg" src={product.image} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="muted">{product.category}</p>
          <p>{product.description}</p>

          <button
            className={isFav ? "btn danger" : "btn"}
            onClick={() => dispatch(toggleFavorite(product.id))}
            aria-pressed={isFav}
          >
            {isFav ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
      </div>
    </main>
  );
}
