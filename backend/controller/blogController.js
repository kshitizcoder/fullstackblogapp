import Blog from "../model/Blog.js";
import catchAsync from "../utils/cathAsync.js";
import AppError from "../utils/AppError.js";
import Category from "../model/Category.js";
import User from "../model/User.js";

export const createBlog = catchAsync(async (req, res, next) => {
  const { title, content, tags, createdAt, category } = req.body;
  const tagArray = Array.isArray(tags) ? tags : JSON.parse(tags);
  const newBlog = await Blog.create({
    author: req.user.id,
    title,
    content,
    category,
    tags: tagArray,
    thumbnailImage: req.body.thumbnailImage,
    coverImage: req.body.coverImage,
    createdAt,
  });
  res.status(201).json({
    status: "success",
    blog: newBlog,
  });
});

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const { sortBy, category, search } = req.query;
  const categoryResult = await Category.findOne({
    categoryName: {
      $regex: new RegExp(category, "i"),
    },
  });

  let queryObj = {};

  if (search) {
    const searchWords = search.split(" ").map((word) => new RegExp(word, "i"));

    queryObj.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
      { content: { $regex: search, $options: "i" } },
      { $and: searchWords.map((word) => ({ title: { $regex: word } })) },
      { $and: searchWords.map((word) => ({ content: { $regex: word } })) },
    ];
  }
  if (category) {
    queryObj.category = categoryResult._id;
  }
  ``;
  let apiData = Blog.find(queryObj);

  let sortOrder = {};
  if (sortBy) {
    sortOrder = sortBy === "oldest" ? { createdAt: 1 } : { createdAt: -1 };
    apiData = apiData.sort(sortOrder);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  const blogs = await apiData
    .populate({
      path: "likes",
      select: "like -blog",
    })
    .populate({ path: "author", select: "name" });

  res.status(200).json({
    status: "success",
    result: blogs.length,
    blogs,
  });
});
export const getBlogByAuthor = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user.id });

  res.status(200).json({
    status: "success",
    result: blogs.length,
    blogs,
  });
});
export const getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "replies",
        populate: {
          path: "user",
          select: "name photo",
        },
        select: "reply user  createdAt -comment",
      },
    })
    .populate("likes")
    .populate("category")
    .populate({ path: "author", select: "name" })
    .sort();

  if (!blog) {
    return next(new AppError("No Blog Found With That ID", 404));
  }
  res.status(200).json({
    status: "success",
    blog,
  });
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const existingBlog = await Blog.findById(req.params.id);
  if (!existingBlog) {
    return next(new AppError("Blog not found", 404));
  }

  const { title, content, tags, category } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      author: existingBlog.author,
      title: title || existingBlog.title,
      content: content || existingBlog.content,
      category: category || existingBlog.category,
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : JSON.parse(tags)
        : existingBlog.tags,
      thumbnailImage: req.body.thumbnailImage || existingBlog.thumbnailImage,
      coverImage: req.body.coverImage || existingBlog.coverImage,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    blog: updatedBlog,
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new AppError("No Blog Found With That ID", 404));
  }
  await blog.deleteOne();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
