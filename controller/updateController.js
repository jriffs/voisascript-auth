import argon2 from "argon2";
import { UpdateUser } from "../model/db.js";

const updateController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const { id } = req.params;
  if (!id || !fullname || !email || !username || password) {
    res.status(400).json({ status: false, message: "Send all required user information" })
  }
  const mainPassword = await argon2.hash(password);
  const { error, success } = await UpdateUser(
    {
      id: id,
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    }
  );
  if (error) {
    res.status(500).json({ status: false, message: error })
    return
  }

  res.status(200).json({ status: true, message: success })
};

export default updateController;
