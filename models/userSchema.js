const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
});
const User = mongoose.model("User", UserSchema, "users-collection");

module.exports = User;
