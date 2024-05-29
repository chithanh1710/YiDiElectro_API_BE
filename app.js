const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

// Router
const homeRouter = require("./router/homeRouters");
const productRouter = require("./router/productRouters");
const customersRouter = require("./router/customersRouters");
const carRouter = require("./router/carRouters");
const userRouter = require("./router/userRouters");
const emailRouter = require("./router/emailRouters");
const dashboardRouter = require("./router/dashboardRouters");
const tokenManager = require("./util/tokenManager");

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "yidielectro-key",
    resave: false,
    saveUninitialized: true,
  })
);

let currentSessionId = null;

function authenticateToken(req, res, next) {
  if (!tokenManager.isValidToken("0123456789")) {
    return res.send("Bạn cần có quyền truy cập");
  }
  next();
}

function checkOneUser(req, res, next) {
  if (currentSessionId && currentSessionId !== req.session.id) {
    return res.send("Chỉ một người có thể vào tại một thời điểm");
  }
  currentSessionId = req.session.id;
  next();
}

////////////////////////////////////////
const URL_API = "/api/v1";

// Middleware router
app.use("/", homeRouter);

app.use(`${URL_API}/cars`, carRouter);
app.use(`${URL_API}/users`, userRouter);
app.use("/send-email", emailRouter);

app.use("/logout", (req, res) => {
  tokenManager.clearToken();
  currentSessionId = null;
  return res.redirect("/");
});

app.use(authenticateToken);
app.use(checkOneUser);

app.use("/dashboard", dashboardRouter);
app.use("/products", productRouter);
app.use("/customers", customersRouter);

module.exports = app;
