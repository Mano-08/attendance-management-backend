const express = require("express");
const router = express.Router();
const attendance = require("../Controller/attendanceController");

router.post("/login", attendance.login);
router.post("/create-student", attendance.createStudent);
router.post("/create-faculty", attendance.createFaculty);
router.post("/create-user", attendance.createU);
router.post("/update-student", attendance.updateStudent);
router.post("/update-faculty", attendance.updateFaculty);
router.post("/update-user", attendance.updateU);
router.post("/remove-student", attendance.removeStudent);
router.post("/remove-faculty", attendance.removeFaculty);
router.post("/remove-user", attendance.removeU);
router.get("/show-student", attendance.showS);
router.get("/show-faculty", attendance.showF);
router.get("/show-user", attendance.showU);
router.post("/create-courses", attendance.createCourse);
router.post("/delete-courses", attendance.deleteCourse);
router.post("/create-subjects", attendance.createSubjects);
router.post("/delete-subjects", attendance.deleteSubject);

module.exports = router;
