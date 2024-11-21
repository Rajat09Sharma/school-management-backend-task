const express = require("express");

const { handleGetAllStudent, handleCreateStudent, handleStudentEditById, handleStudentDelete, handleGetStudentById } = require("../controllers/student");
const upload = require("../util/multerUpload");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuth, handleGetAllStudent)
router.get("/:id", isAuth, handleGetStudentById);

router.post("/create", upload.single("profile"), handleCreateStudent);
router.put("/edit/:id", isAuth, handleStudentEditById);
router.delete("/delete/:id", isAuth, handleStudentDelete);

module.exports = router; 