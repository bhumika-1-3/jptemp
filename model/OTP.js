const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const otpSchema = new Schema({
    codeNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    expireIn: Number
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("otp", otpSchema,"otp");
