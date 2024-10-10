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

// review connectoin api
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        //check status 
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not valid!!!" });
        }

        // check connection in DB
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if (!connectionRequest) {
            return res.status(400).json({ message: "connection request not found!!!" });
        }

        //update status
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "connection " + status, data })
    }
    catch (err) {
        res.status(400).json({ message: "Erroe" + err.message });
    }
})

module.exports = requestRouter;