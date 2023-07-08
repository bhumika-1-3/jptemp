const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },


    refreshToken: String

});

module.exports = mongoose.model("Content_moderator", userSchema)
