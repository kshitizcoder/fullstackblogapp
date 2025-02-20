import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
      required: [true, "Reply Field is required"],
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: [true, "Comment is required "],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User Is Required"],
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("Reply", replySchema);
