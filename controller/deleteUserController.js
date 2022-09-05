const { DeleteUser } = require("../model/db");

const deleteUserController = (req, res) => {
  const { id } = req.params;
  DeleteUser({ id: id }, (err) => {
    if (err) {
      res.status(500).json({ status: false, message: "Error deleting user" });
    } else {
      res.status(200).json({ status: true, message: "User deleted" });
    }
  });
};

module.exports = deleteUserController;
