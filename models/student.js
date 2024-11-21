const {Schema,model}=require("mongoose");

const studentSchema=new Schema({
    name:{
        type:String, 
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:"class",
        required:true,
    }, 
    profileImageUrl:{
        type:String,
    },
},{timestamps:true});

const Student=model("student",studentSchema);
module.exports=Student;