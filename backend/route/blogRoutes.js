import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getBlogByAuthor,
  updateBlog,
} from "../controller/blogController.js";
import {
  protect,
  resourceOwnership,
  roleBasedAccess,
} from "../controller/authController.js";
import Blog from "../model/Blog.js";
import {
  resizeBlogImages,
  uploadBlogImages,
} from "../controller/fileUpload.js";

const blogRouter = express.Router();

blogRouter
  .route("/")
  .post(
    protect,
    roleBasedAccess(["author", "admin"]),
    uploadBlogImages,
    resizeBlogImages,
    createBlog
  )

  .get(getAllBlogs);

blogRouter.get("/author/blogs", protect, getBlogByAuthor);
blogRouter
  .route("/:id")
  .get(getBlog)
  .patch(
    protect,
    roleBasedAccess(["admin", "author"]),
    resourceOwnership(Blog, "author"),
    uploadBlogImages,
    resizeBlogImages,
    updateBlog
  )
  .delete(
    protect,
    roleBasedAccess(["admin", "author"]),
    resourceOwnership(Blog, "author"),
    deleteBlog
  );

export default blogRouter;
