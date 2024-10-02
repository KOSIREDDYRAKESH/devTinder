const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")

app.use(express.json());

// create a new user api
app.post("/singup", async (req, res) => {
    const userObj = new User(req.body)
    try {
        await userObj.save();
        res.send("create user successfully...")
    }
    catch (err) {
        res.send(err.errmsg)
    }


});

// Feed api to fetch all user in db
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (err) {
        res.send("something went wrong")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully...")
    }
    catch (err) {
        res.send("user not found")
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        if (!userId)
            res.send("userId not valid")
        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        res.send("user data updated successfully...")
    }
    catch (err) {
        res.send(err)
    }
})

connectDB()
    .then(() => {
        console.log("Database connected....")
        app.listen(7777, () => {
            console.log("connnected to the server successfully....")
        })
    })
    .catch((err) => {
        console.log("Unable to connect database....")
    })

