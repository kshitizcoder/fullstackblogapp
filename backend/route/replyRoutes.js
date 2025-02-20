import express from "express";
import {
  protect,
  resourceOwnership,
  roleBasedAccess,
} from "../controller/authController.js";
import {
  createReply,
  deleteReply,
  getAllReply,
} from "../controller/replyController.js";
import Reply from "../model/Reply.js";

const replyRouter = express.Router();

replyRouter
  .route("/")
  .post(protect, roleBasedAccess(["author", "user"]), createReply)
  .get(protect, getAllReply);

replyRouter
  .route("/:id")
  .delete(protect, resourceOwnership(Reply, "user"), deleteReply);
export default replyRouter;
