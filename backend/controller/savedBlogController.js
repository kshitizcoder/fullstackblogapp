import catchAsync from "../utils/cathAsync.js";
import AppError from "../utils/AppError.js";
import SavedBlogs from "../model/SavedBlogs.js";

export const toggleSavedBlog = catchAsync(async (req, res, next) => {
  const { blog } = req.body;
  const existingBlog = await SavedBlogs.findOne({ blog, user: req.user.id });

  if (existingBlog) {
    await SavedBlogs.findByIdAndDelete(existingBlog._id);
    return next(new AppError("Blog Is Unsaved", 200));
  }

  const newBlog = await SavedBlogs.create({ user: req.user.id, blog });

  res.status(201).json({
    status: "success",
    newBlog,
  });
});

export const getSavedBlogs = catchAsync(async (req, res, next) => {
  const savedBlogs = await SavedBlogs.find({ user: req.user.id }).populate(
    "blog"
  );

  res.status(200).json({
    status: "success",
    savedBlogs,
  });
});
