import Category from "../model/Category.js";
import catchAsync from "../utils/cathAsync.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const { categoryName } = req.body;
  const category = await Category.create({ categoryName });
  res.status(201).json({
    status: "success",
    category,
  });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    result: categories.length,
    categories,
  });
});
