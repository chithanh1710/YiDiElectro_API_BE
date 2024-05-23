const express = require("express");
const carControllers = require("../controllers/carControllers");
const router = express.Router();

router
  .route("/")
  .get(carControllers.getFullCar)
  .post(carControllers.checkEnoughData, carControllers.createNewCar);

router.route("/:type").get(carControllers.getCarByType);

router
  .route("/:name")
  .delete(carControllers.checkName, carControllers.deleteCar)
  .put(
    carControllers.checkName,
    carControllers.checkEnoughData,
    carControllers.editCar
  );

module.exports = router;
