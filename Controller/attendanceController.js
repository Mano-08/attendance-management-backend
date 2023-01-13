const express = require("express");
const User = require("../models/userSchema");
const Student = require("../models/studentschema");
const Faculty = require("../models/facultyschema");
const { findByIdAndDelete } = require("../models/userSchema");

//User login
const login = async (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  console.log(username, password, isAdmin);
  const result = await User.findOne(
    {
      username: username,
      password: password,
      isAdmin: isAdmin,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
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
};

//Student Operations
//Read data
const showS = (req, res, next) => {
  Student.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};

//Create Student
const createStudent = (req, res, next) => {
  const { name, year, degree, courses } = req.body;
  const student = new Student({
    name: name,
    year: year,
    degree: degree,
    courses: courses,
  });
  student
    .save()
    .then(() => {
      res.status(200).json({ message: "student added success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "student adding failed" });
    });
};

//Delete Student
const removeStudent = async (req, res, next) => {
  let id = req.body.rollno;
  await Student.findByIdAndDelete(id).catch(function (err) {
    console.log(err);
  });
};
//Update Student
const updateStudent = (req, res, next) => {
  let id = req.body.rollno;
  const { name, year, degree, courses } = req.body;
  let updateData = {
    name: name,
    year: year,
    degree: degree,
    courses: courses,
  };
  Student.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      res.status(200).json({ message: "student update success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "student update failed" });
    });
};
//faculty oprations
//create faculty
const createFaculty = (req, res, next) => {
  const { name, year, degree, courses } = req.body;
  const faculty = new Faculty({
    name: name,
    year: year,
    degree: degree,
    courses: courses,
  });
  faculty
    .save()
    .then(() => {
      res.status(200).json({ message: "faculty added success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "faculty adding failed" });
    });
};
//delete faculty
const removeFaculty = async (req, res, next) => {
  let id = req.body.rollno;
  await Faculty.findByIdAndDelete(id).catch(function (err) {
    console.log(err);
  });
};
//update faculty
const updateFaculty = (req, res, next) => {
  let id = req.body.rollno;
  const { name, year, degree, courses } = req.body;
  let updateData = {
    name: name,
    year: year,
    degree: degree,
    courses: courses,
  };
  Faculty.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      res.status(200).json({ message: "faculty update success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "faculty update failed" });
    });
};
module.exports = {
  login,
  createStudent,
  removeStudent,
  updateStudent,
  createFaculty,
  removeFaculty,
  updateFaculty,
  showS,
};
