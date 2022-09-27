import express from "express";
import {
  signupController,
  updateController,
  getAllUserController,
  deleteUserController,
  getUserController
} from "../controller/controller.js";

const userRoute = express.Router();

userRoute.post("/register", signupController);
userRoute.put("/update/:id", updateController);
userRoute.get("/get/all", getAllUserController);
userRoute.get("/get/:id", getUserController);
userRoute.delete("/delete/:id", deleteUserController);

export default userRoute;
