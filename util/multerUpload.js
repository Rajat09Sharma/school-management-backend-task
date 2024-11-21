const multer=require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/Uploads/"))
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
        cb(null, `${uniquePrefix}-${file.originalname}`)
    }
}) 

const upload = multer({ storage: storage });

module.exports=upload;