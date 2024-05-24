const express = require("express");
const router = express.Router();
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf-8");

router.route("/").get((req, res) => {
  if (req.query.token == "0123456789") {
    res.redirect("/dashboard");
  } else {
    res.redirect("https://yidi-electro.vercel.app/admin");
  }
});

router.route("/dashboard").get((req, res) => {
  res.end(html);
});

module.exports = router;
