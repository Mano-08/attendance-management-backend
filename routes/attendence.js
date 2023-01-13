const express = require("express");
const router = express.Router();
const attendance = require("../Controller/attendanceController");

router.post("/login", attendance.login);
router.post("/create-student", attendance.createStudent);
router.post("/update-student", attendance.updateStudent);
router.post("/remove-student", attendance.removeStudent);
router.get("/show-student", attendance.showS);

module.exports = router;
