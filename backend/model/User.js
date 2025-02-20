import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valide email"],
    },
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Password Is Required"],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "passwordConfirm Is Required"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password are not same",
      },
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordRestExpires: Date,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);

  return result;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changeTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("User", userSchema);
