// Escape text so it can be placed safely inside HTML element content or a quoted attribute.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Category slugs look like "kitchen" or "home-office".
function looksLikeSlug(value) {
  return typeof value === "string" && /^[a-z]+(-[a-z]+)*$/.test(value);
}

module.exports = { escapeHtml, looksLikeSlug };
