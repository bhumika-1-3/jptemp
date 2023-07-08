const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

    ewsid: {
        type: String,
    },
    schoolname: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },


    refreshToken: String

});

module.exports = mongoose.model("User", userSchema)
