import multer from "multer";
import sharp from "sharp";
import catchAsync from "../utils/cathAsync.js";
import AppError from "../utils/appError.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadBlogImages = upload.fields([
  { name: "thumbnailImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

export const resizeBlogImages = catchAsync(async (req, res, next) => {
  if (!req.files.thumbnailImage || !req.files.coverImage) return next();

  // 1) Cover image
  req.body.coverImage = `blog-${req.user.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.coverImage[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/cover/${req.body.coverImage}`)
    .catch((err) => {
      console.error("Error processing cover image:", err);
      return next(new AppError("Error processing cover image", 500));
    });

  req.body.thumbnailImage = `blog-${req.user.id}-${Date.now()}-thumbnail.jpeg`;
  await sharp(req.files.thumbnailImage[0].buffer)
    .resize(1080, 1080)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/thumbnail/${req.body.thumbnailImage}`)
    .catch((err) => {
      console.error("Error processing thumbnail image:", err);
      return next(new AppError("Error processing thumbnail image", 500));
    });

  next();
});

export const uploadUserPhoto = upload.single("photo");
export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  // console.log("Uploaded File:", req.file);
  if (!req.file) return next();
  req.body.photo = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.body.photo}`)
    .catch((err) => {
      // console.error("Error processing photo image:", err);
      return next(new AppError("Error processing photo image", 500));
    });

  next();
});
