const { Schema, model } = require("mongoose");

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherId: {
        type:Schema.Types.ObjectId,
        ref:"teacher",
        required: true
    },
    studentCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Class = model("class", classSchema);

module.exports = Class;