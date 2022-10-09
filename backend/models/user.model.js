const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 3,
            minSymbols: 1,
          }),
        message: "Your password too week",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },

    imageURL: {
      type: String,
      require: true,
      default:
        "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/344/external-user-user-tanah-basah-glyph-tanah-basah-7.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
});

userSchema.pre("save", function async(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashedPassword = bcrypt.hashSync(this.password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPassowrdMatch = bcrypt.compareSync(password, hash);
  return isPassowrdMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
