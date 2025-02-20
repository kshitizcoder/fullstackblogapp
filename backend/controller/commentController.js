import Comment from "../model/Comment.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/cathAsync.js";

export const createComment = catchAsync(async (req, res, next) => {
  const { comment, blog } = req.body;
  const newComment = await Comment.create({ comment, blog, user: req.user.id });

  res.status(201).json({
    status: "success",
    comment: newComment,
  });
});

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().populate({
    path: "replies",
    select: "reply user -comment",
  });

  res.status(200).json({
    status: "success",
    result: comments.length,
    comments,
  });
});
export const getAllCommentsByBlogId = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ blog: req.params.id });

  res.status(200).json({
    status: "success",
    comments,
  });
});
export const updateComment = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const upadtedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { comment },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!upadtedComment) {
    return next(new AppError("No Comment Found With That ID", 404));
  }

  res.status(200).json({
    status: "success",
    upadtedComment,
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new AppError("No Comment Found With That ID", 404));
  }
  await comment.deleteOne();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
