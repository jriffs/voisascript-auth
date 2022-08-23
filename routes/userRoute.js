const userRoute = require("express").Router();
const {
  signupController,
  updateController,
  getAllUserController,
  deleteUserController,
} = require("../controller/controller");

userRoute.post("/register", signupController);
userRoute.put("/update/:id", updateController);
userRoute.get("/get/all", getAllUserController);
userRoute.delete("/delete/:id", deleteUserController);

module.exports = userRoute;
