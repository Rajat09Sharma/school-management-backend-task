const Class = require("../models/class");
const Teacher = require("../models/teacher");


async function handleGetAllClass(req,res) {
    try {
        const classes=await Class.find({});
        if (!classes) {
            throw new Error("Failed to fetch the classes.")
        }
        console.log(classes);
        res.status(200).json({ status: true, message: "classes fetched successfully.", classes: classes });
    } catch (error) {
        console.log("get-allclasses-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleCreateClass(req,res) {
    const {name,teacher,studentCount}=req.body;

    if (!name || !teacher || !studentCount) {
        return res.status(400).json({ status: false, errorMessage:  "All fields required." })
    }
    
    try {
        const result=await Teacher.findOne({name:teacher});
        const schoolClass = await Class.create({
            name,
            teacherId:result._id,
            studentCount,
        });
        if (!schoolClass) {
            throw new Error("Failed to create class.");
        }
        // console.log(student);
        res.status(200).json({ status: true, message: "Student created successfully.", class: schoolClass });
    } catch (error) {
        console.log("create-class-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}

async function handleEditClassById(req, res) {
    const { id } = req.params;
    const {name,teacher,studentCount}=req.body;
    
    try {
        const result=await Teacher.findOne({name:teacher});
        const teacherId=result._id;
        const schoolClass = await Class.findOneAndUpdate({ _id: id },{name:name,teacherId:teacherId,studentCount});
        if (!schoolClass) {
            throw new Error("Failed to update the schoolClass by given id.")
        }
        console.log(schoolClass);
        res.status(200).json({ status: true, message: "Updated successfully.", student: schoolClass });
    } catch (error) {
        console.log("edit-studentById-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }

}

async function handleDeleteClass(req,res) {
    const {id}=req.params;
    
    try {
        const schoolClass=await Class.findByIdAndUpdate({id:id});
        res.status(200).json({ status: true, message: "Deleted successfully.", student: schoolClass });
    } catch (error) {
        console.log("delete-studentById-error-", error.message);
        res.status(500).json({ status: false, errorMessage: "Server error , please try again later." });
    }
}



module.exports={
    handleGetAllClass,
    handleCreateClass,
    handleEditClassById,
    handleDeleteClass
}