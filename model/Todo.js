const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    work: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        required:true,
        enum: ['To Do', 'Doing', 'Done']
    },
    date:{
        type:Date,
        required:true,
        // default: new Date(Date.now()).toISOString(),
    },
    priority:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model("todo",todoSchema)
