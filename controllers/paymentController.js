const Razorpay = require("razorpay")
require("dotenv").config();
const Formidable = require("formidable")
var uniqid = require('uniqid');
const path = require("path")
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
});

const createorder = async (req, res) => {
    console.log(uniqid());
    if (!req.body.amount) return res.status(500);
    var options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: uniqid()
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        console.log(order);
        res.json({ success: true, order })
    });
}

const paymentCallback = async (req, res) => {

    const form = Formidable()
    form.parse(req, (err, fields, files) => {
        console.log(fields);
    })
}

const paymentverify = async (req, res) => { 
    console.log(req.body);
    res.status(200).json({
        success:true
    })
}

const getLogo = async (req, res) => {
    res.sendFile(path.join(__dirname, "../crab.png"))
}

module.exports = {
    createorder,
    paymentCallback,
    getLogo,
    paymentverify
}