const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController")
const loginControllerUser = require("../controllers/loginControllerUser")
const loginControllerModerator = require("../controllers/loginControllerModerator")
const loginControllerContentCreator = require("../controllers/loginControllerContent")



router.post("/User/", loginControllerUser.loginUser);
router.get("/User/", loginControllerUser.allusers);
router.post("/User/googleauth",loginControllerUser.googleauth)


router.post("/Moderator/", loginControllerModerator.loginUser);
router.get("/Moderator/", loginControllerModerator.allusers);
router.post("/Moderator/googleauth",loginControllerModerator.googleauth)


router.post("/ContentCreator/", loginControllerContentCreator.loginUser);
router.get("/ContentCreator/", loginControllerContentCreator.allusers);
router.post("/ContentCreator/googleauth",loginControllerContentCreator.googleauth)

module.exports = router;