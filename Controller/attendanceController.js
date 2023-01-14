const express = require("express");
const User = require("../models/userSchema");
const Student = require("../models/studentschema");
const Faculty = require("../models/facultyschema");

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
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        if (data === null) {
          res.status(400).json({ message: "failed" });
        } else if (data !== null) {
          let token = await login.generateAuthToken;
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
//user crud
//show user
const showU = (req, res, next) => {
  User.find()
    .then((response) => {
      res.status(200).json({ response });
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
const showS = (req, res, next) => {
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
  const { name, rollno, year, degree, courses } = req.body;
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
      res.status(200).json({ message: "student added success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "student adding failed" });
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
// const updateStudent = (req, res, next) => {
//   const id = req.body.rollno;
//   const { name, rollno, year, degree, courses } = req.body;
//   let updateData = {
//     name: name,
//     rollno: parseInt(rollno),
//     year: parseInt(year),
//     degree: degree,
//     courses: courses,
//   };
//   for (var i = 0; i < updateData.courses.length; i++) {
//     updateData.courses[i].attendance = +updateData.courses[i].attendance;
//   }
//   console.log(updateData);
//   Student.findOneAndUpdate({ rollno: id }, { $set: updateData })
//     .then(() => {
//       res.status(200).json({ message: "success" });
//     })
//     .catch((error) => {
//       res.status(400).json({ message: "failed" });
//     });
// };
const updateStudent = (req, res, next) => {
  const { id, name, rollno, year, degree, courses } = req.body;
  let flag = true;
  const duplicate = parseInt(rollno);
  Student.findOne({ rollno: duplicate }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data === null) {
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
        Student.replaceOne({ rollno: id }, updateData, (err) => {
          if (err) {
            console.log(err);
          }
        })
          .then(() => {
            res.status(200).json({ message: "success" });
          })
          .catch((error) => {
            res.status(400).json({ message: "failed" });
          });
      } else {
        res.status(400).json({ message: "Roll number already exists" });
      }
    }
  });
};

//faculty oprations
//show faculty
const showF = (req, res, next) => {
  Faculty.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.json({
        message: "faculty show Error",
      });
    });
};
//create faculty
const createFaculty = (req, res, next) => {
  const { name, username } = req.body;
  const faculty = new Faculty({
    username: username,
    name: name,
    subjects: req.boby.subjects,
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
  await Faculty.findByIdAndDelete(id).catch(function (err) {
    console.log(err);
  });
};
//update faculty
const updateFaculty = (req, res, next) => {
  let id = req.body.username;
  const { name, username } = req.body;
  let updateData = {
    username: username,
    name: name,
    subjects: req.body.subjects,
  };
  Faculty.findByIdAndUpdate(id, { $set: updateData })
    .then(() => {
      res.status(200).json({ message: "faculty update success" });
    })
    .catch((error) => {
      res.status(400).json({ message: "faculty update failed" });
    });
};
//course Add and Delete
//add courses
const createCourse = async (req, res, next) => {
  const { rollno, courses } = req.body;
  const student = await Student.findOne({ rollno: rollno });
  const oldcourses = student.courses;
  const newcourses = oldcourses.push(courses);
  await Student.updateOne(
    {
      rollno: rollno,
    },
    {
      courses: newcourses,
    }
  );
  Student.save().catch((err) => {
    res.json({ message: "addcourse failed" });
  });
};
//delete courses
const deleteCourse = async (req, res, next) => {
  const { rollno, index } = req.body;
  console.log(rollno, index);
  const student = await Student.findOne({ rollno: rollno });
  const newcourses = student.courses.filter(function (ele, ind) {
    if (ind != index) return ele;
  });

  await Student.updateOne({ rollno: rollno }, { courses: newcourses });
  student.save().catch((err) => {
    res.json({ message: "deletecourse failed" });
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
};
