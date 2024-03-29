import argon2 from "argon2";
import { createNewUser,getAll,getOne } from "../model/db.js";
import  jwt  from "jsonwebtoken";
//var used in the jwt expiresIn option, thw first integer represents number of days
// const maxAge = 1 * 24* 60* 60

//generate JWT token
const createToken = (userId, username)=>{
  const data = { userId, username }
  return jwt.sign(data,  /* process.env.JWT_KEY */ 'secretkey')
}

const signupController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const mainPassword = await argon2.hash(password);
  const {success,error, id} = await createNewUser({
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
  });
  

  if (error) {
    return res
      .status(500)
      .json({ status: false, message: error });
  }
  return res
    .status(201)
    .send({ status: true, message: success , accessToken: createToken(id, username) });
};



export default signupController;
