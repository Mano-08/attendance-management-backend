const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
  },
  attendance:{

  },
  year: {
    type: Number,
  },
  batch: {
    type: String,
  },
  degree: {
    type: String,
  },
  courses: [
    {
      course: String,
      attendance: Number,
    },
  ],
});

const student=mongoose.model('student',studentSchema,"student-collection")

module.exports = student;
