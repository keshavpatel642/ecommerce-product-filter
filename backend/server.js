const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(
  cors({
    origin: "https://fuzzy-space-disco-wrp74r9qw9xwcj9g-5173.app.github.dev"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Product API is running"
  });
});

app.use("/api/products", productRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});