import argon2 from "argon2";
import { createNewUser } from "../model/db.js";

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
        return res
          .status(500)
          .json({ status: false, message: `Error registering user: ${err}` });
      }
      return res
          .status(200)
          .json({ status: true, message: "Registration Successful" });
    }
  );
};

export default signupController;
