const express = require("express");
const { exec, execFile } = require("child_process");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAdmin);

// Check that a supplier's server is reachable. POST /admin/ping { "host": "supplier.example.com" }
router.post("/ping", (req, res) => {
  exec("ping -c 1 " + req.body.host, (err, stdout) => {
    if (err) return res.status(502).json({ reachable: false });
    res.json({ reachable: true, output: stdout });
  });
});

// Look up DNS records for a supplier domain. POST /admin/dns { "domain": "supplier.example.com" }
router.post("/dns", (req, res) => {
  execFile("nslookup", [String(req.body.domain || "")], (err, stdout) => {
    if (err) return res.status(502).json({ error: "Lookup failed" });
    res.json({ output: stdout });
  });
});

module.exports = router;
