const express = require("express");
const products = require("../data/products");

const router = express.Router();

router.get("/", (req, res) => {
  const {
    categories,
    minPrice,
    maxPrice,
    rating,
    sort
  } = req.query;

  let result = [...products];

  // Category filter
  if (categories) {
    const selectedCategories = categories
      .split(",")
      .map(category => category.trim());

    result = result.filter(product =>
      selectedCategories.includes(product.category)
    );
  }

  // Minimum price
  if (minPrice !== undefined) {
    result = result.filter(
      product => product.price >= Number(minPrice)
    );
  }

  // Maximum price
  if (maxPrice !== undefined) {
    result = result.filter(
      product => product.price <= Number(maxPrice)
    );
  }

  // Minimum rating
  if (rating !== undefined) {
    result = result.filter(
      product => product.rating >= Number(rating)
    );
  }

  // Sorting happens AFTER filtering
  if (sort === "priceAsc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sort === "ratingDesc") {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({
    success: true,
    count: result.length,
    products: result
  });
});

module.exports = router;