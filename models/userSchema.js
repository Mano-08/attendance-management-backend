const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
});

UserSchema.method.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { _id: this._d },
      { expiresIn: "30s" },
      process.env.SECRET_KEY
    );

    this.tokens = this.token.concat({ token: token });
    await this.save();
    console.log("Hi", token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", UserSchema, "users-collection");

module.exports = User;
