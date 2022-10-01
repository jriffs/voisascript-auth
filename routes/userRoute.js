import express from "express";
import {
  signupController,
  updateController,
  getAllUserController,
  deleteUserController,
<<<<<<< HEAD
  getUserController
=======
  validateUserController,
>>>>>>> cb6e8326bd3f14dcfe4c8eab63e0e68a02ee999d
} from "../controller/controller.js";

const userRoute = express.Router();

userRoute.post("/register", signupController);
userRoute.put("/update/:id", updateController);
userRoute.get("/get/all", getAllUserController);
userRoute.get("/get/:id", getUserController);
userRoute.delete("/delete/:id", deleteUserController);
userRoute.get("/validate", validateUserController)

export default userRoute;
