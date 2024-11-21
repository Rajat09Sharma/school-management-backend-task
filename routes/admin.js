const express=require("express");
const { handleAdminSignUp, handleAdminLogin } = require("../controllers/admin");

const router=express.Router();


router.post("/signup",handleAdminSignUp);
router.post("/login",handleAdminLogin);



module.exports=router;