const express = require("express");
const db = require("../db");
const { verifyPassword } = require("../utils/passwords");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user || !verifyPassword(password || "", user.password_hash)) {
      return res.status(401).json({ error: "Wrong email or password" });
    }
    req.session.regenerate(() => {
      req.session.userId = user.id;
      req.session.isAdmin = user.is_admin === 1;
      res.json({ ok: true });
    });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

module.exports = router;
