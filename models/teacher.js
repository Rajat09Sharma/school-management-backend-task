const {Schema,model}=require("mongoose");

const teacherSchema=new Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        unique:true,
        required:true
    },
    subject:{
        type:String, 
        required:true
    },
    profileImageUrl:{
        type:String, 
    }
},{timestamps:true}); 

const Teacher=model("teacher",teacherSchema);

module.exports=Teacher;