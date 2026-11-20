const express = require("express");
const db = require("../db");
const { looksLikeSlug } = require("../utils/html");

const router = express.Router();

const SORT_ORDERS = {
  name: "name ASC",
  cheapest: "price ASC",
  priciest: "price DESC",
  newest: "id DESC",
};

// List all products. ?sort=name|cheapest|priciest|newest
router.get("/", (req, res) => {
  const order = SORT_ORDERS[req.query.sort] || SORT_ORDERS.name;
  db.all("SELECT * FROM products ORDER BY " + order, (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

// Search products by name. ?q=mug
router.get("/search", (req, res) => {
  const q = req.query.q || "";
  db.all("SELECT * FROM products WHERE name LIKE '%" + q + "%'", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

// Products in a category. /products/category/kitchen
router.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;
  if (!looksLikeSlug(slug)) {
    return res.status(400).json({ error: "Bad category" });
  }
  db.all("SELECT * FROM products WHERE category = '" + slug + "'", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

// Single product. /products/3
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

module.exports = router;
