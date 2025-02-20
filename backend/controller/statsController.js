// controllers/adminController.js
import Blog from "../model/Blog.js";
import User from "../model/User.js";
import Comment from "../model/Comment.js";
import Like from "../model/Like.js";
import catchAsync from "../utils/cathAsync.js";
import AppError from "../utils/AppError.js";

const getAdminStats = catchAsync(async (req, res, next) => {
  // Count totals
  const blogs = await Blog.countDocuments();
  const users = await User.countDocuments();
  const comments = await Comment.countDocuments();
  const likes = await Like.countDocuments();

  if (!blogs && !users && !comments && !likes) {
    return next(new AppError("No statistics available", 404));
  }

  // Blog categories distribution
  const blogCategories = await Blog.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    { $unwind: "$categoryData" },
    { $project: { category: "$categoryData.categoryName", count: 1 } },
  ]);

  // Blogs published per month
  const blogsPerMonth = await Blog.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $project: { month: "$_id", count: 1, _id: 0 } },
  ]);

  // Users registered per month
  const usersPerMonth = await User.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $project: { month: "$_id", count: 1, _id: 0 } },
  ]);

  // Top liked blogs
  const topLikedBlogs = await Blog.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "blog",
        as: "likesData",
      },
    },
    { $project: { title: 1, likes: { $size: "$likesData" } } },
    { $sort: { likes: -1 } },
    { $limit: 5 },
  ]);

  // Top commented blogs
  const topCommentedBlogs = await Blog.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "blog",
        as: "commentsData",
      },
    },
    { $project: { title: 1, comments: { $size: "$commentsData" } } },
    { $sort: { comments: -1 } },
    { $limit: 5 },
  ]);

  // Top authors by number of blogs
  const topAuthors = await Blog.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "authorData",
      },
    },
    { $unwind: "$authorData" },
    { $project: { name: "$authorData.name", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  res.status(200).json({
    status: "success",
    stats: { blogs, users, comments, likes },
    blogCategories,
    blogsPerMonth,
    usersPerMonth,
    topLikedBlogs,
    topCommentedBlogs,
    topAuthors,
  });
});

export default getAdminStats;
