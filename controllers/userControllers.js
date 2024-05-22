const fs = require("fs");
const dataUsers = JSON.parse(fs.readFileSync("./data/dataUser.json", "utf-8"));

exports.getFullUser = (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataUsers.length,
    data: dataUsers,
  });
};
