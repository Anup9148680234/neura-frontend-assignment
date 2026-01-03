import { NavLink, Route, Routes } from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Product Dashboard</h1>
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Products
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
            Favorites
          </NavLink>
        </nav>
      </header>

      {/* Routing */}
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}
