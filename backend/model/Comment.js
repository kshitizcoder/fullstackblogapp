import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment Can't be Empty"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment Must belong to a user"],
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: [true, "Comment Must belong to a blog"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});
commentSchema.pre("deleteOne", { document: true }, async function (next) {
  const commentId = this._id;

  await mongoose.model("Reply").deleteMany({ comment: commentId });

  next();
});

commentSchema.virtual("replies", {
  ref: "Reply",
  foreignField: "comment",
  localField: "_id",
});
export default mongoose.model("Comment", commentSchema);
