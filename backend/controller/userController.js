import User from "../model/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/cathAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "success",
    users,
  });
});

export const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    user,
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
    ``;
  }

  // const updateFields = {};
  // if (name) updateFields.name = name;
  // if (photo) updateFields.photo = photo;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      photo: req.body.photo,
    },
    { new: true }
  );
  if (!updatedUser) {
    return next(new AppError("No User Found With That ID", 404));
  }
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});
