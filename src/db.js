const sqlite3 = require("sqlite3").verbose();
const { hashPassword } = require("./utils/passwords");

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL)");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT, is_admin INTEGER)");
  db.run("CREATE TABLE refunds (id INTEGER PRIMARY KEY, user_id INTEGER, order_id INTEGER, amount REAL, status TEXT)");
  db.run("CREATE TABLE coupons (code TEXT PRIMARY KEY, percent_off INTEGER)");

  const products = [
    ["Blue mug", "kitchen", 9.5],
    ["Tea towel", "kitchen", 4.0],
    ["Notebook", "stationery", 3.25],
    ["Fountain pen", "stationery", 24.0],
    ["Tote bag", "accessories", 12.0],
  ];
  for (const p of products) {
    db.run("INSERT INTO products (name, category, price) VALUES (?, ?, ?)", p);
  }

  // Demo accounts. Passwords are only for local testing.
  db.run("INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, ?)",
    [1, "alice@example.test", hashPassword("alice-demo"), 0]);
  db.run("INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, ?)",
    [2, "bob@example.test", hashPassword("bob-demo"), 0]);
  db.run("INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, ?)",
    [3, "admin@example.test", hashPassword("admin-demo"), 1]);

  db.run("INSERT INTO refunds (id, user_id, order_id, amount, status) VALUES (101, 1, 5001, 9.50, 'approved')");
  db.run("INSERT INTO refunds (id, user_id, order_id, amount, status) VALUES (102, 2, 5002, 24.00, 'pending')");

  db.run("INSERT INTO coupons (code, percent_off) VALUES ('WELCOME10', 10)");
});

module.exports = db;
