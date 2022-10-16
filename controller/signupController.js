import argon2 from "argon2";
import { createNewUser,getOne } from "../model/db.js";
import  jwt  from "jsonwebtoken";
//var used in the jwt expiresIn option, thw first integer represents number of days
const maxAge = 1 * 24* 60* 60

//generate JWT token 
const createToken =(userID)=>{
  return jwt.sign({userID},  process.env.JWT_KEY, {
    expiresIn:maxAge
  })
}

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  const newUser =createNewUser(
    {
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    },
    (err,result) => {
      if (result) {
        return res
          .status(201)
          .send({ status: true, message: `Registering user successful!`, accessToken: createToken(newUser.id) });
      }
    
        return res
          .status(500)
          .json({ status: false, message: "Registration Failed" ,});
    }
  );  
  
};



export default signupController;
