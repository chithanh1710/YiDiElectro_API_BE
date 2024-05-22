const express = require("express");
const carControllers = require("../controllers/carControllers");

const router = express.Router();

router.route("/").get(carControllers.getFullCar);

router.route("/:type").get(carControllers.getCarByType);

module.exports = router;
