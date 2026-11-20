const express = require("express");
const db = require("../db");
const { requireUser } = require("../middleware/auth");

const router = express.Router();

// All refunds for the logged-in user. /refunds
router.get("/", requireUser, (req, res) => {
  db.all("SELECT * FROM refunds WHERE user_id = ?", [req.session.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

// Look up one refund. /refunds/101
router.get("/:id", requireUser, (req, res) => {
  db.get("SELECT * FROM refunds WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

module.exports = router;
