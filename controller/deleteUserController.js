import { DeleteUser } from "../model/db.js";

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ status: false, message: "Send user ID through request params" })
    return
  }

  const { error, success } = await DeleteUser({ id: id })
  if (error) {
    res.status(500).json({ status: false, message: error })
    return
  }

  res.status(200).json({ status: true, message: success })
};

export default deleteUserController;
