const argon2 = require("argon2");
const { createNewUser } = require("../model/db");

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  createNewUser(
    {
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    },
    (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: false, message: "Error registering user" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Registration Successful" });
      }
    }
  );
};

module.exports = signupController;
