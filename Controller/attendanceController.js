const express = require("express");
const User = require("../models/userSchema");

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
          console.log(token);
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
