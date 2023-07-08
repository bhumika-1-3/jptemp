const User = require("../model/User");
const bscrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library")

const client = new OAuth2Client("537010121754-h774kl4n7hd7ncg3ili9svdffrch9hmb.apps.googleusercontent.com");

const loginUser = async (req, res) => {
    const {  password, email } = req.body;
    if (!password  || !email) return res.status(400).json({ "Message": "Invalid cred" });

    const foundUser = await User.findOne({ email: email })
    if (!foundUser) return res.status(401).json({ "Message": "user not found" });

    // evaluate password
    const match = await bscrypt.compare(password, foundUser.password);
    if (match) {

        // create JWT TOKEN
        const accessToken = jwt.sign(
            {
                "email": foundUser.email,
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "5m"
            }
        );
        const refreshToken = jwt.sign(
            {
                "email": foundUser.email,
            },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: "1d"
            }
        );

        // saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        let role = 0;

       
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' });//inproduction add secure :true
        res.status(200).json({ "message": "User authorized", "Access Token": accessToken})
    }
    else {
        res.status(401).json({ "message": "Incorrect password" });
    }
}

const allusers = (req, res) => {
    res.status(200).json(User);
}

const googleauth = (req, res) => {
    const { tokenId } = req.body;
    console.log(tokenId);
    client.verifyIdToken({ idToken: tokenId, audience: "537010121754-h774kl4n7hd7ncg3ili9svdffrch9hmb.apps.googleusercontent.com" })
        .then((r) => {
            const { name, email } = r.payload;
            console.log(r.payload);

            // create/ find user
            User.findOne({ email: email }).exec(async (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something wrong"
                    });
                }
                else {
                    if (user) {
                        console.log(user);
                        const accessToken = jwt.sign(
                            {
                                "username": user.username,
                            },
                            process.env.ACCESS_TOKEN,
                            {
                                expiresIn: "5m"
                            }
                        );
                        const refreshToken = jwt.sign(
                            {
                                "username": user.username,
                            },
                            process.env.REFRESH_TOKEN,
                            {
                                expiresIn: "1d"
                            }
                        );

                        // saving refresh token with current user
                        user.refreshToken = refreshToken;
                        const result = await user.save();
                        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' });//inproduction add secure :true
                        res.status(200).json({ "message": "User authorized", "Access Token": accessToken })
                    }
                    else {
                        let password = Math.random().toString(36).slice(2) +
                            Math.random().toString(36)
                                .toUpperCase().slice(2);
                        console.log(password);
                        try {
                            const hashpwd = await bscrypt.hash(password, 10);
                            console.log(hashpwd);
                            // create and store new user
                            const result = await User.create({
                                "username": name,
                                "password": hashpwd,
                                "email": email
                            });


                            console.log(result);

                            res.status(201).json({ "message": "Successfully added" });
                        } catch (e) {
                            res.status(500).json({ "message": e.message });
                        }
                    }
                }
            })
        })
    console.log();
}

module.exports = {
    loginUser,
    allusers,
    googleauth
}