const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
require("dotenv").config();
mongoose.connect(`${process.env.ATLAS_KEY}`, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connected successfully");
  }
});

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
});
const User = mongoose.model("User", UserSchema, "users-collection");

const PORT = 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hi");
});
app.post("/api/logincred", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  console.log(username, password, isAdmin);
  let flag = false;
  const response = await User.findOne(
    {
      username: username,
      password: password,
      isAdmin: isAdmin,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data === null) {
          res.status(400).json({ message: "failed" });
        } else if (data !== null) {
          res.status(200).json({ message: "success" });
        }
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});
