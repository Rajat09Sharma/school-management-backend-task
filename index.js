require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser");

const adminRouter=require("./routes/admin")
const studentRouter=require("./routes/student");
const teacherRouter=require("./routes/teacher");
const classRouter=require("./routes/class")


const app=express();
const PORT=process.env.PORT||3000;

mongoose.connect("mongodb://0.0.0.0:27017/schoolDB").then(e=>console.log("MongoDB connected successfully"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());



app.use("/",adminRouter)
app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);
app.use("/class",classRouter)

app.listen(PORT,()=>{
    console.log("Server started on port 3000.");
})