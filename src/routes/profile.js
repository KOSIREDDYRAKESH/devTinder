const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth")


// profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(404).send("Error: Invalid cookie,please login again");
    }
});

module.exports = profileRouter;