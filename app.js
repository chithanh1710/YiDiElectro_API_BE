const express = require("express");
const app = express();
const cors = require("cors");

// Router
const homeRouter = require("./router/homeRouters");
const productRouter = require("./router/productRouters");
const carRouter = require("./router/carRouters");
const userRouter = require("./router/userRouters");
const emailRouter = require("./router/emailRouters");
const dashboardRouter = require("./router/dashboardRouters");
const tokenManager = require("./util/tokenManager");

// Middleware
app.use(cors());
app.use(express.json());

////////////////////////////////////////
const URL_API = "/api/v1";

// Middleware router
app.use("/", homeRouter);

app.use(function authenticateToken(req, res, next) {
  // Nếu token hợp lệ, tiếp tục xử lý route
  console.log(tokenManager.getToken());
  if (!tokenManager.isValidToken("0123456789")) {
    return res.redirect("https://yidi-electro.vercel.app/admin");
  }
  next();
});

app.use("/dashboard", dashboardRouter);
app.use("/products", productRouter);
app.use(`${URL_API}/cars`, carRouter);
app.use(`${URL_API}/users`, userRouter);
app.use("/send-email", emailRouter);

app.use("/logout", (req, res) => {
  tokenManager.clearToken();
  return res.send("Bạn đã đăng xuất");
});

module.exports = app;
