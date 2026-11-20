function requireUser(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Log in first" });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
}

module.exports = { requireUser, requireAdmin };
