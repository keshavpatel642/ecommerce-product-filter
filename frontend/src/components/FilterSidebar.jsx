function FilterSidebar({ filters, setFilters }) {
  const categories = [
    "Electronics",
    "Apparel",
    "Footwear"
  ];

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const alreadySelected = prev.categories.includes(category);

      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter((item) => item !== category)
          : [...prev.categories, category]
      };
    });
  };

  return (
    <aside className="sidebar">
      <h2>Filters</h2>

      {/* Category */}
      <div className="filter-section">
        <h3>Category</h3>

        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="filter-section">
        <h3>Price Range</h3>

        <div className="price-values">
          <span>₹{filters.minPrice}</span>
          <span>₹{filters.maxPrice}</span>
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minPrice: Math.min(
                Number(e.target.value),
                prev.maxPrice
              )
            }))
          }
        />

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: Math.max(
                Number(e.target.value),
                prev.minPrice
              )
            }))
          }
        />
      </div>

      {/* Rating */}
      <div className="filter-section">
        <h3>Minimum Rating</h3>

        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="rating"
              checked={filters.rating === star}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  rating: star
                }))
              }
            />
            {star} ⭐ & above
          </label>
        ))}

        <label>
          <input
            type="radio"
            name="rating"
            checked={filters.rating === 0}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                rating: 0
              }))
            }
          />
          All ratings
        </label>
      </div>
    </aside>
  );
}

export default FilterSidebar;
