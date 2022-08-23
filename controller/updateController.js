const argon2 = require("argon2");
const { UpdateUser } = require("../model/db");

const updateController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const { id } = req.params;
  const mainPassword = await argon2.hash(password);
  const result = await UpdateUser({
    id: id,
    Full_Name: fullname,
    Email: email,
    Username: username,
    Password: mainPassword,
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
        message: "User infomation updated successfully",
      });
      break;
    default:
      break;
  }
};

module.exports = updateController;
