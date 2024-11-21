const Class = require("../models/class");
const Student = require("../models/student");
const cloudinary = require("../util/cloudinary");

async function handleCreateStudent(req, res) {
    const { name, email,className} = req.body;
    // console.log(req.body);

    // console.log(req.file);
    
    if (!name || !email || !className) {
        return res.status(400).json({ status: false, errorMessage:  "All fields required." })
    }
    
    const oldEmail = await Student.findOne({ email: email });
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
            // console.log(result);
            profileImageUrl=result.url;
        }
        const result=await Class.findOne({name:className});
        const student = await Student.create({
            name,
            email,
            classId:result._id,
            profileImageUrl
        });
        if (!student) {
            throw new Error("Failed to create student.");
        }
        // console.log(student);
        res.status(200).json({ status: true, message: "Student created successfully.", student: student });
    } catch (error) {
        console.log("create-student-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleGetStudentById(req, res) {
    const { id } = req.params;

    try {
        const student = await Student.findById({ _id: id });
        if (!student) {
            throw new Error("Failed to fetch the student by given id.")
        }
        console.log(student);
        res.status(200).json({ status: true, message: "Student fetched successfully by given id.", student: student });
    } catch (error) {
        console.log("get-studentById-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }

}

async function handleGetAllStudent(req, res) {

    try {
        const students = await Student.find({})
        if (!students) {
            throw new Error("Failed to fetch the students.")
        }
        console.log(students);
        res.status(200).json({ status: true, message: "Sutdents fetched successfully.", students: students });
    } catch (error) {
        console.log("get-allstudent-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }

}

async function handleStudentEditById(req, res) {
    const { id } = req.params;

    const { name,className} = req.body;

    let profileImageUrl=null;
    try {
        if(req.file){
            const cloudinarryFilePath=req.file.path;
            const result= await cloudinary.uploader.upload(cloudinarryFilePath,{
                public_id:`${email}_${name}_profile`,
                width:500,
                height:500
            })
            // console.log(result);
            profileImageUrl=result.url;
        }
        const result=await Class.findOne({name:className});
        const student = await Student.findByIdAndUpdate({ _id: id }, {name,classId:result._id},profileImageUrl);
        if (!student) {
            throw new Error("Failed to edit the student.")
        }
        console.log(student);
        res.status(200).json({ status: true, message: "Updated successfully." });
    } catch (error) {
        console.log("edit-student-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleStudentDelete(req, res) {
    const { id } = req.params;

    try {
        const student = await Student.findOneAndDelete({ _id: id });
        if (!student) {
            throw new Error("Failed to delete the student.")
        }
        console.log(student);
        res.status(200).json({ status: true, message: "Deleted successfully." });

    } catch (error) {
        console.log("delete-student-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

module.exports = {
    handleGetAllStudent,
    handleCreateStudent,
    handleStudentEditById,
    handleStudentDelete,
    handleGetStudentById
}