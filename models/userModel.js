const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: String,
    default: false,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     next();
//   }
//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.ha
// sh(user.password, saltRound);
//     user.password = hashPassword;
//   } catch (err) {
//     next(err);
//   }
// });

// defining the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
