const fs = require("fs");
const dataCars = JSON.parse(fs.readFileSync("./data/dataCar.json", "utf-8"));

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
