const express = require("express");
const User = require("../models/userSchema");
const Student = require("../models/studentschema");

// const show = (req, res, next) => {
//   Student.find()
//     .then((response) => {
//       res.json({ response });
//     })
//     .catch((error) => res.json({ message: "Error" }));
// };

const login = async (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  console.log(username,password,isAdmin)
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
        console.log(data)
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

module.exports = { login };
