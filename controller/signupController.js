import argon2 from "argon2";
import { createNewUser, getAll, getOne } from "../model/db.js";

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  const result = await createNewUser({
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
  });

  if (result?.error) {
    return res
        .status(500)
        .json({ status: false, message: `Error registering user: ${result.error}` });
  }
  return res
    .status(200)
    .json({ status: true, message: "Registration Successful" });
};

export default signupController;
