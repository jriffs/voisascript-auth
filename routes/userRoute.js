const userRoute = require("express").Router();
const loginController = require("../controller/loginController");
const signupController = require("../controller/signupController");

userRoute.post("/login", loginController);
userRoute.post("/register", signupController);

module.exports = userRoute;
