import argon2 from "argon2";
import { createNewUser } from "../model/db.js";
import  jwt  from "jsonwebtoken";
//var used in the jwt expiresIn option, thw first integer represents number of days
const maxAge = 1 * 24* 60* 60
const createToken =(userID)=>{
  return jwt.sign({userID},  process.env.JWT_KEY, {
    expiresIn:maxAge
  })
}

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  createNewUser(
    {
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    },
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: `Error registering user: ${err}` });
      }
      else{
        const token = createToken(userID)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
        
        return res
          .status(200)
          .json({ status: true, message: "Registration Successful" });

      }
      
    }
  );
  
};

export default signupController;
