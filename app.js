const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "https://yi-di-electro-api.vercel.app/" })); // Use this to allow all origins

const dataCars = JSON.parse(fs.readFileSync("./data/dataCar.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/dataUser.json", "utf-8"));

app.get("/", (req, res) => {
  res.end("hello");
});

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataCars.length,
    data: dataCars,
  });
});

app.get("/api/v1/cars/:type", (req, res) => {
  const dataByType = dataCars.filter((item) =>
    item.img.includes(req.params.type)
  );
  res.status(200).json({
    status: "success",
    result: dataByType.length,
    data: dataByType,
  });
});

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataUsers.length,
    data: dataUsers,
  });
});

module.exports = app;
