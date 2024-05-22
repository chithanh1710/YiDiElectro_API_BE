const express = require("express");
const router = express.Router();
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf-8");

router.route("/").get((req, res) => {
  res.redirect("/dashboard");
});

router.route("/dashboard").get((req, res) => {
  res.end(html);
});

module.exports = router;
