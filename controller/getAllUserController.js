const { getAll } = require("../model/db");

const getAllUserController = async (req, res) => {
  const result = await getAll();
  if (result === 500) {
    res.status(500).json({ status: false, message: "Server error, try again" });
    return;
  }
  res.status(200).json({ status: true, result: result });
};

module.exports = getAllUserController;
