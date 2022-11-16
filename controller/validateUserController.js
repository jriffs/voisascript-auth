import { config } from "dotenv";
import { getOne } from "../model/db.js";
import jwt from "jsonwebtoken";
import getUserData from "../utils/getUserData.js";
config();

const validateUserController = async (req, res) => {
  try {
    const authorization = req.headers["authorization"].split(" ");
    const payload = jwt.verify(authorization[1], /* process.env.JWT_KEY */ 'secretkey');
    console.log(payload)
    if (!payload.userId) {
      res.status(401).send({error: 'Invalid bearer token'});
      return
    } else {
      const { userId, username } = payload;
      const {result, error} = await getOne(userId)
      if (error) {
        res.ststus(400).send(error)
        return
      }
      if (result.length === 0) {
        return res.status(400).json({
          isUser: false,
          userData: null
        })
      }
      switch (req.headers["originator"]) {
        case "extension":
          const data = await getUserData("projects", username)
          res.status(200).json({
            isUser: true,
            userData: data
          });
          break;
        case "file-storage":
          res.status(200).json({
            isUser: true,
            userData: {
              username: username,
              userID: userId
            }
          });
          break;
        default:

      }
    }
  } catch (error) {
    res.status(400).json({
      error: error
    })
    return
  }
  
}

export default validateUserController;
