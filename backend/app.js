import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import blogRouter from "./route/blogRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controller/errorController.js";
import userRouter from "./route/userRoutes.js";
import commentRouter from "./route/commentRoutes.js";
import likeRouter from "./route/likeRoutes.js";
import replyRouter from "./route/replyRoutes.js";
import categoryRouter from "./route/categoryRoutes.js";
import savedBlogRouter from "./route/savedBlogRoutes.js";
import blogStatsrouter from "./route/blogStatsRoutes.js";

dotenv.config();
const app = express();
const DB_URl = process.env.MONGODB_URL;

app.use(
  cors({
    origin: "https://fullstackblogappclient.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.static("public"));
mongoose
  .connect(DB_URl)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/replies", replyRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/saved-blogs", savedBlogRouter);
app.use("/api/v1/admin-stats", blogStatsrouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server Running At ${PORT}`);
});
// EMAIL_USERNAME=6ab4a7e35e6293
// EMAIL_PASSWORD=5b1de6195d46ae
// EMAIL_HOST=sandbox.smtp.mailtrap.io
// EMAIL_PORT=2525
