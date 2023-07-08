const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../controllers/registerController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now()+" "+ file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/",upload.single("profile"),registerController.registerNewUser);

module.exports = router;
