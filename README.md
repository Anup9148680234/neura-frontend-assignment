# Neura Dynamics – Frontend Assignment (Product Dashboard)

A product dashboard built with React + Redux Toolkit.
Includes Product Listing (search/filter/sort), Product Detail, and Favorites.
Includes unit + integration tests with Vitest + Testing Library.

## Tech Stack
- React (functional components + hooks)
- Redux Toolkit (products, filters, favorites)
- Vitest + Testing Library (unit + integration tests)

## API
Fake Store API endpoints used:
- GET https://fakestoreapi.com/products
- GET https://fakestoreapi.com/products/:id
- GET https://fakestoreapi.com/products/categories

Product rating shape:
- rating.rate (number)
- rating.count (number)

## Requirements Covered
- Responsive Product Listing Page (grid)
- Debounced search by title
- Filter by category
- Sort by price (asc/desc)
- Product Detail Page
- Favorites Page (add/remove, stored in Redux)
- Redux thunks + selectors
- Unit tests for slices
- Integration tests for PLP behavior

## Getting Started

### 1 Install
```bash
npm install
```

### 2 Run locally
```bash
npm run dev
```

### 3 Run tests
```bash
npm run test
```

### 4 Build
```bash
npm run build
npm run preview
```