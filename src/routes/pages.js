const express = require("express");
const { escapeHtml } = require("../utils/html");

const router = express.Router();

const PARTNER_SITES = {
  blog: "https://blog.example.com/",
  help: "https://help.example.com/",
};

// Welcome banner. /welcome?name=Sam
router.get("/welcome", (req, res) => {
  const name = req.query.name || "friend";
  res.send("<h1>Welcome back, " + name + "!</h1>");
});

// Greeting card preview. /greeting?to=Sam
router.get("/greeting", (req, res) => {
  const to = escapeHtml(req.query.to || "friend");
  res.send("<div class=\"card\"><p>Dear " + to + ",</p><p>Thanks for shopping with us.</p></div>");
});

// After login, send the user back where they came from. /continue?next=/products
router.get("/continue", (req, res) => {
  res.redirect(req.query.next || "/");
});

// Links out to partner sites. /partner?site=blog
router.get("/partner", (req, res) => {
  const target = PARTNER_SITES[req.query.site];
  if (!target) return res.status(404).send("Unknown partner");
  res.redirect(target);
});

module.exports = router;
