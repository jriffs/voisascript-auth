import { config } from "dotenv";
import { getOne } from "../model/db.js";
import jwt from "jsonwebtoken";
config();

const validateUserController = (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  const payload = jwt.verify(authorization[1], process.env.JWT_KEY);
  if (!payload.data.id) {
    res.sendStatus(401);
  } else {
    const { id, password, username } = payload.data;
    getOne(id, (err, result) => {
      if (result) {
        switch (req.headers["originator"]) {
          case "extension":
            getUserData("projects", username).then(data => {
              res.status(200).
                json({
                  isUser: true,
                  userData: data
                });
            });
            break;
          case "file-storage":
            res.status(200).
              json({
                isUser: true,
                userData: {
                  username: username,
                  userID: id
                }
              });
            break;
          default:

        }
      } else {
        res.status(400).json({ status: false, message: "User does not exist" });
      }
    })
  }
}

export default validateUserController;
