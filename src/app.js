const express = require("express");
const session = require("express-session");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/pages"));
app.use("/products", require("./routes/products"));
app.use("/files", require("./routes/files"));
app.use("/refunds", require("./routes/refunds"));
app.use("/admin", require("./routes/admin"));

app.listen(config.port, () => {
  console.log("tiny-shop listening on http://localhost:" + config.port);
});
