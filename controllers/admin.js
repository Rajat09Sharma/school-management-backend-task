const Admin = require("../models/admin");
const jwt=require("jsonwebtoken");

const { generateHashPassword, compareHashPassword } = require("../util/hashPassword");

const secretKey="neinaSchoolMangementtaskbyRajATSHARMA@#$5%%0900)()()../"


async function handleAdminSignUp(req,res) {
    const {name,email,password}=req.body;

    try {
        const hashPassword=await generateHashPassword(password);
        if(!hashPassword){
            throw new Error;
        }
        const admin=await Admin.create({
            name,
            password:hashPassword,
            email
        })
        if(!admin){
            throw new Error("Failed to create admin.")
        }
        res.status(200).send("Signup successfully.");
    } catch (error) {
        console.log("admin-signup-error-",error.message);
        res.status(500).json({message:error.message});
    }
}

async function handleAdminLogin(req,res) {
    const {email,password}=req.body;
    try {
        const admin=await Admin.findOne({email:email});
        if(!admin){
            res.status(401).send("Invalid email address.")
        }
        const result=await compareHashPassword(password,admin.password);
        if(!result){
            res.status(401).send("Incorrect Password.")
        }
        const token=await jwt.sign({
            name:admin.name,
            id:admin._id,
            email:admin.email
        },secretKey);
        if(!token){
            throw new Error("Failed to authorized, please try again later.")
        }
        // console.log(token);
        res.status(200).json({messsage:"login successfully.",token:token});
    } catch (error) {
        console.log("admin-login-error-",error.message);
        res.status(500).json({message:error.message});
    }
}

module.exports={
    handleAdminSignUp,
    handleAdminLogin,
}