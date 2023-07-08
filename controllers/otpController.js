const User = require("../model/User");
const Otp = require("../model/OTP");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bscrypt = require("bcrypt");

const sendEmail = async (req, res) => {
    const { email } = req.body;
    if (!email)
        res.status(404).json("No email");
    let data = await User.findOne({ email: email });
    if (data) {
        let otpcode = Math.floor((Math.random() * 10000) + 1);
        let otpdata = new Otp({
            email: email,
            codeNumber: otpcode,
            // 5 min
            expireIn: new Date().getTime() + 300 * 1000,
        })
        let otpResponse = await otpdata.save();
        console.log(otpResponse);
        mailer(email, otpcode);
        res.status(200).json({ "message": "User authorized" });
    }
    else {
        res.status(200).json("Email not found");
    }
}

const mailer = async (email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "OTP for password change",
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Password change</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
            </div>
          </div>`
        })

        console.log("Email is sent to verify");
    }
    catch (e) {
        console.log("Email not sent");
        console.log(e);
    }

}




const changePw = async (req, res) => {
    const { otp, email, password } = req.body;
    if (!email || !otp || !password)
        res.status(400).json("incomplete creds");
    let data = await Otp.findOne({ email: email, codeNumber: otp });
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if (diff < 0) {
            res.status(400).json("expired");
        }
        else {
            const hashpwd = await bscrypt.hash(password, 10);
            let user = await User.findOne({ email: email })
            user.password = hashpwd;
            user.save();
            res.status(200).json("Password changed ");

        }
    }
    else {
        res.status(400).json("Invalid");
    }
}

module.exports = {
    sendEmail,
    changePw
}