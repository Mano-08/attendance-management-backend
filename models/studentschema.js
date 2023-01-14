const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  courses: [
    {
      course: { type: String, required: true },
      attendance: { type: Number, required: true },
    },
  ],
});

const student = mongoose.model("student", studentSchema, "student-collection");

module.exports = student;
