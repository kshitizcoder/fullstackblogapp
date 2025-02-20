import express from "express";
import { protect, roleBasedAccess } from "../controller/authController.js";
import {
  getSavedBlogs,
  toggleSavedBlog,
} from "../controller/savedBlogController.js";

const savedBlogRouter = express.Router();

savedBlogRouter
  .route("/")
  .post(protect, roleBasedAccess(["user", "author"]), toggleSavedBlog)
  .get(protect, getSavedBlogs);

export default savedBlogRouter;
