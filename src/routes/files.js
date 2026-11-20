const express = require("express");
const path = require("path");
const config = require("../config");
const { requireUser } = require("../middleware/auth");

const router = express.Router();

// Download a product image. /files/images?name=mug.png
router.get("/images", (req, res) => {
  const filePath = path.join(config.uploadsDir, req.query.name || "");
  res.sendFile(filePath);
});

// Download an invoice PDF. /files/invoices/5001
router.get("/invoices/:orderId", requireUser, (req, res) => {
  const orderId = req.params.orderId;
  if (!/^\d+$/.test(orderId)) {
    return res.status(400).json({ error: "Bad order id" });
  }
  res.sendFile(path.join(config.invoicesDir, req.session.userId + "-" + orderId + ".pdf"));
});

module.exports = router;
