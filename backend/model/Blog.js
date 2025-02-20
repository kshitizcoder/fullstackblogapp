import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category Is Required"],
    },
    title: {
      type: String,
      required: [true, "Title Is Required"],
      unique: true,
      minlength: [10, "Title must at least 10 characters"],
      maxlength: [200, "Title must less than equals to 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content Is Required"],
      unique: true,
    },
    thumbnailImage: String,
    coverImage: String,
    tags: [
      {
        type: String,
        required: [true, "Tags Are Required"],
      },
    ],
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

blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "blog",
  localField: "_id",
});
blogSchema.virtual("likes", {
  ref: "Like",
  foreignField: "blog",
  localField: "_id",
});

// blogSchema.pre("deleteOne", { document: true }, async function (next) {
//   const blogId = this._id;

//   await mongoose.model("Like").deleteMany({ blog: blogId });

//   const comments = await mongoose.model("Comment").find({ blog: blogId });

//   const commentIds = comments.map((comment) => comment._id);

//   await mongoose.model("Reply").deleteMany({ comment: { $in: commentIds } });
//   await mongoose.model("Comment").deleteMany({ blog: blogId });
//   next();
// });
blogSchema.pre("deleteOne", { document: true }, async function (next) {
  const blogId = this._id;

  await mongoose.model("Like").deleteMany({ blog: blogId });

  const comments = await mongoose.model("Comment").find({ blog: blogId });
  const commentIds = comments.map((comment) => comment._id);
  await mongoose.model("Reply").deleteMany({ comment: { $in: commentIds } });
  await mongoose.model("Comment").deleteMany({ blog: blogId });

  await mongoose
    .model("savedBlog")
    .updateMany({ blog: blogId }, { $pull: { blog: blogId } });

  await mongoose.model("savedBlog").deleteMany({ blog: { $size: 0 } });

  next();
});

export default mongoose.model("Blog", blogSchema);
