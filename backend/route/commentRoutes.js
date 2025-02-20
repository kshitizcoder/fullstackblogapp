import express from "express";
import {
  protect,
  resourceOwnership,
  roleBasedAccess,
} from "../controller/authController.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getAllCommentsByBlogId,
  updateComment,
} from "../controller/commentController.js";
import Comment from "../model/Comment.js";
const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(protect, createComment)
  .get(protect, roleBasedAccess(["admin"]), getAllComments);

commentRouter
  .route("/:id")
  .patch(protect, resourceOwnership(Comment, "user"), updateComment)
  .delete(protect, resourceOwnership(Comment, "user"), deleteComment);

commentRouter.get("/blog-comments/:id", getAllCommentsByBlogId);
export default commentRouter;
