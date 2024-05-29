const express = require("express");
const fs = require("fs");
const router = express.Router();

const html = fs.readFileSync("index2.html", "utf-8");

router.route("/").get((req, res) => {
  res.end(html);
});

module.exports = router;
