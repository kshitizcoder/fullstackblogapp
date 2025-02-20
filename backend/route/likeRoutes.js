import express from "express";
import { protect, roleBasedAccess } from "../controller/authController.js";
import { toggleLike, getAllLikes } from "../controller/likeController.js";

const likeRouter = express.Router();

likeRouter
  .route("/")
  .post(protect, roleBasedAccess(["user", "author"]), toggleLike)
  .get(protect, roleBasedAccess(["admin"]), getAllLikes);
export default likeRouter;
