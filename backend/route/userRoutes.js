import express from "express";
import {
  forgetPassword,
  login,
  logout,
  protect,
  resetPassword,
  signup,
  updatePassword,
} from "../controller/authController.js";
import {
  getAllUsers,
  getUserProfile,
  updateProfile,
} from "../controller/userController.js";
import { resizeUserPhoto, uploadUserPhoto } from "../controller/fileUpload.js";

const userRouter = express.Router();

userRouter.post("/sign-up", signup);
userRouter.post("/login", login);
userRouter.post("/forgot-password", forgetPassword);
userRouter.patch("/reset-password/:token", resetPassword);
userRouter.patch("/update-password", protect, updatePassword);

userRouter.post("/logout", logout);

userRouter.route("/").get(getAllUsers);
userRouter.get("/profile", protect, getUserProfile);
userRouter
  .route("/")
  .patch(protect, uploadUserPhoto, resizeUserPhoto, updateProfile);
export default userRouter;
