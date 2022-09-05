const { getAll } = require("../model/db");

const getAllUserController = (req, res) => {
  getAll((err, result) => {
    if (err) {
      res.status(500).json({ status: false, message: "Error getting Users" });
    } else {
      res.status(200).json({ status: true, result: result });
    }
  });
};

module.exports = getAllUserController;
