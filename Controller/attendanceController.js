const express = require("express");
const User = require("../models/userSchema");
const Student = require("../models/studentschema");
const Faculty = require("../models/facultyschema");
const { encode } = require("../utils/jwt");
const { findOne, updateOne } = require("../models/userSchema");
const { findOneAndUpdate } = require("../models/studentschema");
const { decode } = require("jsonwebtoken");

//User login
const login = async (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  // console.log(username, password, isAdmin);
  const result = await User.findOne(
    {
      username: username,
      password: password,
      isAdmin: isAdmin,
    },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        if (data === null) {
          res.status(400).json({ message: "failed" });
        } else if (data !== null) {
          res.status(200).json({
            message: "success",
            token: encode({ username: data.username, isAdmin: data.isAdmin }),
          });
        }
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
//user crud
//show user
const showU = (req, res, next) => {
  const { isAdmin } = req.body;
  User.find()
    .then((response) => {
      decode();
      res.status(200).json({
        response,
        token: encode({ username: data.username, isAdmin: data.isAdmin }),
      });
    })
    .catch((error) => {
      res.json({
        message: "USer find Error",
      });
    });
};
//add user
const createU = (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  const student = new Student({
    username: username,
    password: password,
    isAdmin: isAdmin,
  });
  User.save()
    .then(() => {
      res.status(200).json({ message: "student added success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "student adding failed" });
    });
};
//delete user
const removeU = async (req, res, next) => {
  let id = req.body.username;
  await User.findByIdAndDelete(id).catch(function (err) {
    console.log(err);
  });
};
//update user
const updateU = (req, res, next) => {
  let id = req.body.username;
  const { username, password, isAdmin } = req.body;
  let updateData = {
    username: username,
    password: password,
    isAdmin: isAdmin,
  };
  User.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      res.status(200).json({ message: "user update success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "user update failed" });
    });
};

//Student Operations
//Read data
const showS = async (req, res, next) => {
  // const student = new Student({
  //   name: "ddddbb",
  //   rollno: 113,
  //   year: 2,
  //   degree: "Aw",
  //   courses: [
  //     {
  //       course: "AA101",
  //       attendance: 22,
  //     },
  //     {
  //       course: "LCD01",
  //       attendance: 22,
  //     },
  //     {
  //       course: "CC101",
  //       attendance: 22,
  //     },
  //     {
  //       course: "PSSE101",
  //       attendance: 22,
  //     },
  //   ],
  // });
  // student
  //   .save()
  //   .then(() => {
  //     res.status(200).json({ message: "student added success" });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ message: "student adding failed" });
  //   });

  await Student.find()
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
const createStudent = async (req, res, next) => {
  const { name, rollno, year, degree, courses } = req.body;
  await Student.findOne({ rollno: rollno }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data === null) {
        const student = new Student({
          name: name,
          rollno: rollno,
          year: year,
          degree: degree,
          courses: courses,
        });
        student
          .save()
          .then(() => {
            res.status(200).json();
          })
          .catch((error) => {
            res.status(400).json({ message: "Failed to add student" });
          });
      } else {
        res.status(400).json({ message: "Roll No. already exists" });
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

//Delete Student
const removeStudent = async (req, res, next) => {
  let id = req.body.rollno;
  await Student.findOneAndDelete({ rollno: id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
//Update Student
const updateStudent = async (req, res, next) => {
  const { id, name, rollno, year, degree, courses } = req.body;
  const duplicate = parseInt(rollno);
  await Student.findOne({ rollno: duplicate }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data === null || data?.rollno === id) {
        let updateData = {
          name: name,
          rollno: parseInt(rollno),
          year: parseInt(year),
          degree: degree,
          courses: courses,
        };
        for (var i = 0; i < updateData.courses.length; i++) {
          updateData.courses[i].attendance = +updateData.courses[i].attendance;
        }
        await Student.replaceOne({ rollno: id }, updateData, (err) => {
          if (err) {
            console.log(err);
          }
        })
          .then(() => {
            res.status(200).json({ message: "success" });
          })
          .catch((error) => {
            res.status(400).json({ message: error });
          });
      } else {
        res.status(400).json({ message: "Roll number already exists" });
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

//faculty oprations
//show faculty
const showF = async (req, res, next) => {
  await Faculty.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.json({
        message: "faculty show Error" + error,
      });
    });
};
//create faculty
const createFaculty = (req, res, next) => {
  const { name, username, subjects } = req.body;
  const faculty = new Faculty({
    username: username,
    name: name,
    subjects: subjects,
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
  let id = req.body.username;
  await Faculty.deleteOne({ username: id }).catch(function (err) {
    console.log(err);
  });
};
//update faculty
const updateFaculty = async (req, res, next) => {
  const { id, username, name, subjects } = req.body;
  const duplicate = username;
  await Faculty.findOne({ username: duplicate }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data === null || data?.username === id) {
        let updateData = {
          username: username,
          name: name,
          subjects: subjects,
        };
        await Faculty.replaceOne({ username: id }, updateData, (err) => {
          if (err) {
            console.log(err);
          }
        })
          .then(() => {
            res.status(200).json({ message: "success" });
          })
          .catch((error) => {
            res.status(400).json({ message: error });
          });
      } else {
        res.status(400).json({ message: "Username already exists" });
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};
//course Add and Delete
//add courses
const createCourse = async (req, res, next) => {
  let { rollno, courses } = req.body;
  // console.log(req.body);
  courses.attendance = +courses.attendance;
  await Student.updateOne(
    { rollno: rollno },
    { $push: { courses: courses } },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .then(console.log("success"))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
//delete courses
const deleteCourse = async (req, res, next) => {
  const { rollno, index } = req.body;
  // console.log(rollno, index);
  const student = await Student.findOne({ rollno: rollno });
  const newcourses = student.courses.filter(function (ele, ind) {
    if (ind != index) return ele;
  });

  await Student.updateOne({ rollno: rollno }, { courses: newcourses });
  student.save().catch((err) => {
    res.json({ message: "deletecourse failed" });
  });
};

//delete subjects
const deleteSubject = async (req, res, next) => {
  const { username, index } = req.body;
  const faculty = await Faculty.findOne({ username: username });
  const newsubjects = faculty.subjects.filter(function (ele, ind) {
    if (ind != index) return ele;
  });
  await Faculty.updateOne(
    { username: username },
    { subjects: newsubjects }
  ).clone();
};
//add subjects
const createSubjects = async (req, res, next) => {
  let { username, subjects } = req.body;
  await Faculty.updateOne(
    { username: username },
    { $push: { subjects: subjects } },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .then(console.log("subject-added"))
    .catch((err) => {
      if (err) {
        console.log;
      }
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
  showF,
  showS,
  createU,
  showU,
  removeU,
  updateU,
  deleteCourse,
  createCourse,
  createSubjects,
  deleteSubject,
};
