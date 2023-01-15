const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    reuired: true,
  },
  subjects: [
    {
      subject: { type: String, requires: true },
      courses: { type: String, required: true },
    },
  ],
});

const faculty = mongoose.model("faculty", facultySchema, "faculty-collection");

module.exports = faculty;
