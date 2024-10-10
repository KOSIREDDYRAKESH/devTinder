const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectRequest = require("../model/connectionRequest");
const User = require("../model/user");
const userRouter = express.Router();

const USER_SAFE_DATA_STRING = "firstName lastName gender age skills about photoUrl"

//get all the users connections which are pending
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const recievedRequest = await ConnectRequest.find(
            {
                toUserId: loggedInUser._id,
                status: "interested"
            }
        ).populate("fromUserId", "firstName lastName skills age gender about");
        //).populate("fromUserId", ["firstName", "lastName"]);
        if (!recievedRequest) {
            res.status(400).json({ message: "ERROR: " + err.message })
        }
        res.json({ message: "get connections succesfull!!!", data: recievedRequest })
    }
    catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message })
    }
})

// get all connections of user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    const loggedInUser = req.user;
    try {
        const connectionRequest = await ConnectRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", USER_SAFE_DATA_STRING)
            .populate("toUserId", USER_SAFE_DATA_STRING);

        if (connectionRequest.length === 0) {
            return res.json({ message: "connections not found!!!" })
        }
        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id === loggedInUser._id) {
                return row.toUserId;
            }
            return row.fromUserId;
        }
        );
        res.json({ message: "connections found successfully", data })
    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message })
    }
})

// get user feed from DB
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        //User should get all cards from DB
        //0.1 his own card
        //0.2 his connections
        //0.3 ignored cards
        //0.4 interested cards

        const loggedInUser = req.user;

        const connectionRequests = await ConnectRequest.find(
            {
                $or: [
                    { fromUserId: loggedInUser._id },
                    { toUserId: loggedInUser._id }
                ]
            }
        ).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find(
            {
                $and :[
                    {_id: {$nin : Array.from(hideUserFromFeed)}},
                    {_id:{$ne:loggedInUser._id}}
                ]
            }
        ).select(USER_SAFE_DATA_STRING);
        
        res.send(users);
    }
    catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message })
    }
})

module.exports = userRouter;