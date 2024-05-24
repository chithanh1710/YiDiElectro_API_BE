const express = require("express");
const router = express.Router();
const tokenManager = require("../util/tokenManager");

router.route("/").get((req, res) => {
  if (req.query.token == "0123456789") {
    tokenManager.setToken(req.query.token);
    return res.redirect("/dashboard");
  } else {
    return res.send("Bạn cần có quyền truy cập trang");
  }
});

module.exports = router;
