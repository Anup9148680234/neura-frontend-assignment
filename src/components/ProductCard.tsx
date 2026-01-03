import { Link } from "react-router-dom";
import type { ApiProduct } from "../api/fakeStore";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavorite } from "../store/favoritesSlice";
import { selectFavoritesIds } from "../store/selectors";
import  RatingStars  from "./RatingStars";

export default function ProductCard({ product }: { product: ApiProduct }) {
  const dispatch = useAppDispatch();
  const favIds = useAppSelector(selectFavoritesIds);
  const isFav = favIds.includes(product.id);

  return (
    <article className="card" aria-label={`Product ${product.title}`}>
      <Link to={`/product/${product.id}`} className="cardLink">
        <img className="thumb" src={product.image} alt={product.title} loading="lazy" />
        <h3 className="title">{product.title}</h3>
      </Link>

      <RatingStars rate={product.rating?.rate || 0.0 } count={product.rating?.count || 0} />

      <div className="meta">
        <span className="price">${product.price.toFixed(2)}</span>
        <span className="pill">{product.category}</span>
      </div>

      <button
        className={isFav ? "btn danger" : "btn"}
        onClick={() => dispatch(toggleFavorite(product.id))}
        aria-pressed={isFav}
      >
        {isFav ? "Remove Favorite" : "Add Favorite"}
      </button>
    </article>
  );
}
