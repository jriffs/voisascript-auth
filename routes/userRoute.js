import express from "express";
import {
  signupController,
  updateController,
  getAllUserController,
  deleteUserController,
  validateUserController,
  getOneController,
} from "../controller/controller.js";

const userRoute = express.Router();

userRoute.post("/register", signupController);
userRoute.put("/update/:id", updateController);
userRoute.get("/get/all", getAllUserController);
userRoute.get("/get/:id", getOneController)
userRoute.delete("/delete/:id", deleteUserController);
userRoute.get("/validate", validateUserController)

export default userRoute;
