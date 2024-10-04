const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth")


// send connection request api 
requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        //sending connection request
        const user = req.user;
        res.send(user.firstName + " sending connection request");
    }
    catch (err) {
        res.send("something went wrong")
    }
});

module.exports = requestRouter;