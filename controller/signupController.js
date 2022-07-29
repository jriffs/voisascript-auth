const argon2 = require("argon2");
const { createNewUser } = require("../model/db");

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  const result = await createNewUser({
    Full_Name: fullname,
    Email: email,
    Username: username,
    Password: password,
  });
};

module.exports = signupController;
