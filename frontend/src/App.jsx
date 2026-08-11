import { useEffect, useState } from "react";
import axios from "axios";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";

const API_URL =
  "https://fuzzy-space-disco-wrp74r9qw9xwcj9g-5000.app.github.dev/api/products";

function App() {
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 5000,
    rating: 0,
    sort: ""
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const params = {};

      if (filters.categories.length > 0) {
        params.categories = filters.categories.join(",");
      }

      params.minPrice = filters.minPrice;
      params.maxPrice = filters.maxPrice;

      if (filters.rating > 0) {
        params.rating = filters.rating;
      }

      if (filters.sort) {
        params.sort = filters.sort;
      }

      const response = await axios.get(API_URL, { params });

      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 5000,
      rating: 0,
      sort: ""
    });
  };

  return (
    <div className="app">

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
      />

      <main className="content">

        <div className="grid-header">
          <div>
            <h1>E-Commerce Products</h1>
            <p>{products.length} products found</p>
          </div>

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value
              }))
            }
          >
            <option value="">Sort By</option>
            <option value="priceAsc">
              Price: Low to High
            </option>
            <option value="priceDesc">
              Price: High to Low
            </option>
            <option value="ratingDesc">
              Top Rated First
            </option>
          </select>
        </div>

        {products.length === 0 ? (

          <div className="empty-state">
            <h2>No items match your criteria.</h2>

            <button onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

        ) : (

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        )}

      </main>
    </div>
  );
}

export default App;