const User = require("../model/Content_Moderator")
// to encrypt passwords
const bscrypt = require("bcrypt");


const registerNewUser = async (req, res) => {
    const profile = (req.file) ? req.file.filename : null;
    const { username, password, email } = req.body;
    if (!username || !password || !email) return res.status(400).json({ "Message": "Invalid cred" });

    // check for duplicate usernames
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate) return res.status(409).json({ "message": "User already exist" });
    try {

        // hash password
        const hashpwd = await bscrypt.hash(password, 10);

        // create and store new user
        const result = await User.create({
            "password": hashpwd,
            "email": email,
            "username": username,
            "role": "ContentCreator",
        });

        // ------------------other ---------------
        // const newUser = new User();
        // registerNewUser.username = ... 
        // const result = await newUser.save()

        console.log(result);

        res.status(201).json({ "message": "Successfully added" });
    } catch (e) {
        res.status(500).json({ "message": e.message });
    }
}


module.exports = {
    registerNewUser,
}