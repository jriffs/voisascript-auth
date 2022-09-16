import { getAll } from "../model/db.js";

const getAllUserController = (req, res) => {
  getAll((err, result) => {
    if (err) {
      res.status(500).json({ status: false, message: `Error getting Users: ${err}` });
    } else {
      res.status(200).json({ status: true, result: result });
    }
  });
};

export default getAllUserController;
