const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 32).toString("hex");
  return salt + ":" + hash;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored).split(":");
  const candidate = crypto.scryptSync(password, salt, 32);
  const expected = Buffer.from(hash, "hex");
  return expected.length === candidate.length && crypto.timingSafeEqual(candidate, expected);
}

module.exports = { hashPassword, verifyPassword };
