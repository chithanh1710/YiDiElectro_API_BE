const express = require("express");
const app = express();
const cors = require("cors");

// Router
const homeRouter = require("./router/homeRouters");
const productRouter = require("./router/productRouters");
const carRouter = require("./router/carRouters");
const userRouter = require("./router/userRouters");
const emailRouter = require("./router/emailRouters");

// Middleware
app.use(cors());

////////////////////////////////////////
const URL_API = "/api/v1";

// Middleware router
app.use("/", homeRouter);
app.use("/product", productRouter);
app.use(`${URL_API}/cars`, carRouter);
app.use(`${URL_API}/users`, userRouter);
app.use("/send-email", emailRouter);

module.exports = app;
