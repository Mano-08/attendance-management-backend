const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRouter = require("./routes/attendence");
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

const PORT = 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api", attendanceRouter);
