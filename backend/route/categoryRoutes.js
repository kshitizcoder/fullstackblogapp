import express from "express";
import { protect, roleBasedAccess } from "../controller/authController.js";
import {
  createCategory,
  getAllCategories,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(protect, createCategory).get(getAllCategories);

export default categoryRouter;
