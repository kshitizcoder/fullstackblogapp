import mongoose from "mongoose";

const savedBlogSchema = new mongoose.Schema({
  blog: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: [true, "Blog id Field is required"],
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User Is Required"],
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("savedBlog", savedBlogSchema);
