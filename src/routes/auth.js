const express = require("express");
const authRouter = express.Router();
const { validateSingupData } = require("../utils/validation")
const User = require("../model/user")
const bcrypt = require("bcrypt")

// create a new user/sinup api
authRouter.post("/singup", async (req, res) => {
    try {
        // validate singup data
        validateSingupData(req)

        const { password, firstName, lastName, emailId, gender } = req.body;
        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        const userObj = new User({
            firstName,
            lastName,
            emailId,
            gender,
            password: passwordHash
        })

        await userObj.save();
        res.send("create user successfully...")
    }
    catch (err) {
        res.send(err.message)
    }
});

//login api
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }
        else if (user) {
            const isPasswordValid = await user.validatePassword(password)
            if (isPasswordValid) {
                const token = await user.getJWT();
                res.cookie("token", token)
                res.send("Login successfull...")
            }
            else {
                res.send("Incorrect password ")
            }
        }
    }
    catch (err) {
        res.status(404).send("Error: " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logged out successfully....!")
})

module.exports = authRouter;