const { DeleteUser } = require("../model/db");

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const result = await DeleteUser({
    id: id,
  });
  switch (result) {
    case 404:
      res.status(result).json({
        status: false,
        message: "No user found with this id",
      });
      break;
    case 500:
      res
        .status(result)
        .json({ status: false, message: "Server error, try again" });
      break;
    case 200:
      res.status(result).json({
        status: true,
        message: "User deleted successfully",
      });
      break;
    default:
      break;
  }
};

module.exports = deleteUserController;
