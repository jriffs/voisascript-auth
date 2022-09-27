import {config} from "dotenv";
import {getOne} from "../model/db.js";
import jwt from "jsonwebtoken";
config();

const validateUserController = (req, res) =>{
  const authorization = req.headers["authorization"].split(" ");
  jwt.verify(authorization[1], process.env.JWT_KEY, (err, decoded) => {
    if(decoded){
      getOne(decoded.userID, (err, result) =>{
        if (result) {
          switch (req.headers["originator"]) {
            case "extension":
              getUserData("projects", decoded.username).then(data =>{
                res.status(200).
                json({
                  isUser: true,
                  userData: data
                })
              })
              break;
            case "file-storage":
              res.status(200).
              json({
                isUser: true,
                userData: {
                  username: decoded.username,
                  userID: decoded.ID
                }
              });
              break;
            default:

          }
        }else{
          res.status(400).json({status: false, message: "User does not exist"});
        }
      })
    }else{
      res.json({
        error: err
      })
    }

  })
}

export default validateUserController;
