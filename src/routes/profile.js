const express = require("express");
const validator = require("validator")
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth")
const { validateDataProfiteEdit } = require("../utils/validation")
const bcrypt = require("bcrypt")

// profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(404).send("Error: Invalid cookie,please login again");
    }
});

// profile edit api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateDataProfiteEdit(req)) {
            throw new Error("Cannot edit a field")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]))
        await loggedInUser.save()
        res.json({ message: `${loggedInUser.firstName} profile updated successfull.`, data: loggedInUser });
    }
    catch (err) {
        res.status(404).send("Error " + err.message);
    }
});

//profile edit password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        //validate old password 
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isOldPassword = await user.validatePassword(oldPassword)
        if (!isOldPassword) {
            throw new Error("Invalid old password")
        }
        const isStrongNewPassword = validator.isStrongPassword(newPassword)
        if (!isStrongNewPassword) {
            throw new Error("Enter a strong new password")
        }
        const newHashPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashPassword;
        await user.save()
        res.send(user.firstName + " your password changes successfully...")

    }
    catch (err) {
        res.status(404).send("Error " + err.message);
    }
})

module.exports = profileRouter;