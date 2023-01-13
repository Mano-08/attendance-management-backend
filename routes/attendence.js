const express = require("express");
const router = express.Router();
const attendance = require("../Controller/attendanceController");
const jwt = require("jsonwebtoken");

// const user = require("../Controller/userController");
router.post("/api/login", attendance.login);
// router.get("/show", attendence.show);

module.exports = router;
