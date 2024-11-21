const Teacher = require("../models/teacher");

async function handleCreateTeacher(req,res) {
    const {name,email,subject}=req.body;

    
    if (!name || !email || !subject) {
        return res.status(400).json({ status: false, errorMessage: "All fields required." })
    }
    
    const oldEmail = await Teacher.findOne({ email: email });
    if (oldEmail) {
        return res.status(403).json({ status: false, errorMessage: "Email address already exits." })
    }
    
    let profileImageUrl=null;
    try {
        if(req.file){
            const cloudinarryFilePath=req.file.path;
            const result= await cloudinary.uploader.upload(cloudinarryFilePath,{
                public_id:`${email}_${name}_profile`,
                width:500,
                height:500
            })
            profileImageUrl=result.url;
        }
        const teacher=await Teacher.create({
            name,
            email,
            subject,
            profileImageUrl
        });
        if(!teacher){
            throw new Error("Failed to create teacher.");
        }
        console.log(teacher);
        res.status(200).json({ status: true,message:"Teacher created successfully." ,teacher: teacher });
    } catch (error) {
        console.log("create-teacher-error-",error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
     
}

async function handleGetAllTeachers(req,res) {
    try {
        const teachers=await Teacher.find({});
        if(!teachers){
            throw new Error("Failed to fetch teachers.");
        }
        console.log(teachers);
        res.status(200).json({ status: true,message:"Teachers fetched successfully." ,teachers: teachers });
    } catch (error) {
        console.log("getAll-teacher-error-",error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleGetTeacherById(req,res) {
    const {id}=req.params;

    try {
        const teacher=await Teacher.findById({_id:id});
        if(!teacher){
            throw new Error("Failed to fetch teacher by given id.");
        }
        console.log(teacher);
        res.status(200).json({ status: true,message:"Teacher fetched successfully by given id." ,teacher: teacher });
    } catch (error) {
        console.log("get-teacherById-error-",error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }

}

async function hnadleEditTeacherById(req,res) {
    const {id}=req.params;
    
    const {name,subject}=req.body;

    let profileImageUrl=null;
    try {
        if(req.file){
            const cloudinarryFilePath=req.file.path;
            const result= await cloudinary.uploader.upload(cloudinarryFilePath,{
                public_id:`${email}_${name}_profile`,
                width:500,
                height:500
            })
            profileImageUrl=result.url;
        }
        const teacher=await Teacher.findByIdAndUpdate({_id:id},{name,subject,profileImageUrl});
        if(!teacher){
            throw new Error("Failed to updated teacher by given id.");
        }
        console.log(teacher);
        res.status(200).json({ status: true,message:"Updated successfully." });
    } catch (error) {
        console.log("edit-teacherById-error-",error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleDeleteTeacher(req,res) {
    const {id}=req.params;

    try {
        const teacher=await Teacher.findByIdAndDelete({_id:id});
        if(!teacher){
            throw new Error("Failed to delete teacher by given id.");
        }
        console.log(teacher);
        res.status(200).json({ status: true,message:"Deleted successfully." });
    } catch (error) {
        console.log("delete-teacherById-error-",error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

module.exports={
    handleCreateTeacher,
    handleGetAllTeachers,
    handleGetTeacherById,
    hnadleEditTeacherById,
    handleDeleteTeacher
}