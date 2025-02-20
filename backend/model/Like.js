import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  like: {
    type: Boolean,
    required: [true, "Like iS Required "],
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
    required: [true, "Blog Is Required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User Is Required"],
  },
});

export default mongoose.model("Like", likeSchema);
