module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: "tiny-shop-dev-secret-do-not-use",
  uploadsDir: require("path").join(__dirname, "..", "uploads"),
  invoicesDir: require("path").join(__dirname, "..", "invoices"),
};
