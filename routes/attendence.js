const express = require("express");
const router = express.Router();

const attendance = require("../Controller/attendanceController");
// const user = require("../Controller/userController");
router.post("/adminlogin", attendance.login);
// router.get("/show", attendence.show);

module.exports = router;
