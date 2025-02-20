import Like from "../model/Like.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/cathAsync.js";

export const toggleLike = catchAsync(async (req, res, next) => {
  const { blog } = req.body;
  const existingLike = await Like.findOne({ blog, user: req.user.id });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return next(new AppError("Like removed", 200));
  }

  const newLike = await Like.create({ blog, user: req.user.id, like: true });

  res.status(201).json({
    status: "success",
    newLike,
  });
});

export const getAllLikes = catchAsync(async (req, res, next) => {
  const likes = await Like.find();

  res.status(200).json({
    status: "success",
    result: likes.length,
    likes,
  });
});
