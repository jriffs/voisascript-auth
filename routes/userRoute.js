import express from "express";
import {
  signupController,
  updateController,
  getAllUserController,
  deleteUserController,
} from "../controller/controller.js";

const userRoute = express.Router();

userRoute.post("/register", signupController);
userRoute.put("/update/:id", updateController);
userRoute.get("/get/all", getAllUserController);
userRoute.delete("/delete/:id", deleteUserController);
userRoute.get("/validate", validateUserController)

export default userRoute;
