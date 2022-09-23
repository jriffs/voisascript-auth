import {config} from "dotenv";
import {getOne} from "../model/db.js";
import jwt from "jsonwebtoken";
config();

const validateUserController = (req, res) =>{
  const authorization = req.headers["authorization"].split(" ");
  jwt.verify(authorization[1], process.env.JWT_KEY, (err, decoded) => {
    getOne(decoded.userID, (err, result) =>{
      if(result){
        if(req.headers["originator"] === "extension"){
          res.status(200).json({status: true, result: result});
        }else{
          if(req.headers["originator"] === "file-storage"){
            res.status(200).json({status: true, result: result});
          }
        }
      }else{
        res.status(400).json({status: false, message: "User does not exist"})
      }
    })
  })
}

export default validateUserController;
