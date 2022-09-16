import argon2 from "argon2";
import { UpdateUser } from "../model/db.js";

const updateController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const { id } = req.params;
  const mainPassword = await argon2.hash(password);
  UpdateUser(
    {
      id: id,
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    },
    (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: `Error updating user: ${err}` });
      }
      return res
      .status(200)
      .json({ status: true, message: "User updated successfully" });
    }
  );
};

export default updateController;
