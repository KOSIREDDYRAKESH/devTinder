const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth")
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user")


// send connection request api 
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try {
        const user = req.user;
        const toUserId = req.params.toUserId;
        const fromUserId = user._id;
        const status = req.params.status;

        // checking status code
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "invalid status type :" + status
            })
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(400).json({
                message: "User not found!"
            })
        }

        // checking userId
        const existingConnectionRequest = await ConnectionRequest.findOne(
            {
                $or: [
                    {
                        fromUserId,
                        toUserId
                    },
                    {
                        fromUserId: toUserId,
                        toUserId: fromUserId
                    }
                ]
            }
        )

        if (existingConnectionRequest) {
            return res.status(400).json({
                message: "Connection Request already exists!"
            })
        }

        //creating new instance
        const connectRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectRequest.save();
        res.json(
            {
                message: status === "interested" ? req.user.firstName + " " + status + " in " + toUser.firstName : req.user.firstName + " " + status + " " + toUser.firstName,
                data
            }
        )
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
});

module.exports = requestRouter;