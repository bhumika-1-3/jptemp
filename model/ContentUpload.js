const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    grade: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    previouslink: {
        type: String, 
        required: false
    },
    nextlink: {
        type: String, 
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const userSchema = new Schema({

    link: {
        type: String,
        required: true,
    },
    isapproved: {
        type: Boolean,
        required: true,
    },
    creatorid: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    tags: {
        type: tagsSchema,
        required: true,
    },


    refreshToken: String

});

module.exports = mongoose.model("Content_moderator", userSchema)
