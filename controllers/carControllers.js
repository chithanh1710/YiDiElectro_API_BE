const fs = require("fs");
const dataCars = JSON.parse(fs.readFileSync("./data/dataCar.json", "utf-8"));

exports.checkName = (req, res, next) => {
  const name = req.params.name;
  console.log(name);
  const isName = dataCars.find((item) => item.name === name);
  if (!isName) {
    return res.status(404).json({
      status: "fail",
      message: "Not found name",
    });
  }

  next();
};

exports.checkEnoughData = (req, res, next) => {
  const data = req.body;
  if (
    !data.brand ||
    !data.name ||
    !data.price ||
    !data.priceRange ||
    !data.img ||
    !data.year ||
    !data.energy ||
    !data.km ||
    !data.mode ||
    !data.productType
  ) {
    return res.status(404).json({
      status: "fail",
      message: `Missing ${!data.brand ? "brand, " : ""}${
        !data.name ? "name, " : ""
      }${!data.price ? "price, " : ""}${
        !data.priceRange ? "price range, " : ""
      }${!data.img ? "image, " : ""}${!data.energy ? "energy, " : ""}${
        !data.km ? "kilometer, " : ""
      }${!data.mode ? "mode, " : ""}${
        !data.productType ? "product type" : ""
      }.`,
    });
  }
  next();
};

exports.getFullCar = (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataCars.length,
    data: dataCars,
  });
};

exports.getCarByType = (req, res) => {
  const dataByType = dataCars.filter((item) =>
    item.img.includes(req.params.type)
  );
  res.status(200).json({
    status: "success",
    result: dataByType.length,
    data: dataByType,
  });
};

exports.createNewCar = (req, res) => {
  const newCar = Object.assign(req.body);
  dataCars.push(newCar);

  fs.writeFile("./data/dataCar.json", JSON.stringify(dataCars), (err) => {
    if (err) {
      console.error(err.message);
      return res.status(404).json({
        status: "fail",
        message: "Error 💥",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Create new car success",
      data: newCar,
    });
  });
};

exports.editCar = (req, res) => {
  const editByName = req.params.name;
  const editCar = req.body;
  const newData = dataCars.map((item) => {
    if (item.name === editByName) {
      return {
        brand: editCar.brand,
        name: editCar.name,
        price: editCar.price,
        priceRange: editCar.priceRange,
        img: editCar.img,
        year: editCar.year,
        energy: editCar.energy,
        km: editCar.km,
        mode: editCar.mode,
        productType: editCar.productType,
      };
    }
    return item;
  });

  fs.writeFile("./data/dataCar.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error(err.message);
      return res.status(404).json({
        status: "fail",
        message: "Error 💥",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Edit car success",
    });
  });
};

exports.deleteCar = (req, res) => {
  const deleteByName = req.params.name;
  const newData = dataCars.filter((item) => item.name !== deleteByName);
  fs.writeFile("./data/dataCar.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error(err.message);
      return res.status(404).json({
        status: "fail",
        message: "Error 💥",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Delete carr success",
    });
  });
};
