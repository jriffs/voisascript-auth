
const jwt = require("jsonwebtoken");
const RootUser = require("../model/db.js")

//function to verify if jwt token is present in request header

const verifyToken= async(req,res)=>{
    const bearerHeader = req.headers["authorization"];
    
    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split("")[1];

        //decode the token 
        const decoded = jwt.verify(bearerToken,"ADD_SECRET_HERE")

        const rootUser =await RootUser.getOne({id:decoded.id,'tokens.token': bearerToken});
        
        if(!rootUser){
            throw new Error("User not found")
        }

        req.token = bearerToken;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
    }
    
    else{
        res.status(403);
    }
};


export default verifyToken;
