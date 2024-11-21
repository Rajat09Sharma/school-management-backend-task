const express=require("express");
const { handleGetAllTeachers, handleGetTeacherById, handleCreateTeacher, hnadleEditTeacherById } = require("../controllers/teacher");
const upload = require("../util/multerUpload");
const { isAuth } = require("../middleware/auth");

const router=express.Router();

router.get("/", isAuth,handleGetAllTeachers)
router.get("/:id", isAuth,handleGetTeacherById);

router.post("/create", isAuth,upload.single("profile"),handleCreateTeacher);
router.put("/edit/:id", isAuth,hnadleEditTeacherById);
router.delete("/delete/:id", isAuth,hnadleEditTeacherById);

module.exports=router; 