import { getAll } from "../model/db.js";

const getAllUserController = async (req, res) => {
  const { result, error } = await getAll()

  if (error) {
    res.status(500).json({ status: false, message: error })
    return
  }

  res.status(200).json({ status: true, message: result })
};

export default getAllUserController;
