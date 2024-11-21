const express = require("express");
const { handleGetAllClass, handleCreateClass, handleEditClassById, handleDeleteClass } = require("../controllers/class");
const { isAuth } = require("../middleware/auth");

const router = express.Router();


router.get("/", isAuth, handleGetAllClass);
router.post("/create", isAuth, handleCreateClass);
router.post("/edit/:id", isAuth, handleEditClassById);
router.post("/delete/:id", isAuth, handleDeleteClass);

module.exports = router;