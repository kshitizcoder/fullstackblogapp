import Reply from "../model/Reply.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/cathAsync.js";

export const createReply = catchAsync(async (req, res, next) => {
  const { reply, comment } = req.body;
  const newReply = await Reply.create({
    reply,
    comment,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    newReply,
  });
});

export const getAllReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.find();

  res.status(200).json({
    status: "success",
    result: reply.length,
    reply,
  });
});

export const deleteReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndDelete(req.params.id);
  if (!reply) {
    return next(new AppError("No Reply Found With That ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
