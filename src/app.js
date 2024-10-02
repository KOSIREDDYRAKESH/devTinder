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
        res.send(err.message)
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

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        if (!userId)
            res.send("userId not valid")

        const allowedUpdates = ["userId", "skills", "photoUrl", "password", "gender", "age", "about"];
        const isUpdateAllowed = Object.keys(data).every(k => allowedUpdates.includes(k))
        console.log(isUpdateAllowed)
        if (data.skills) {
            if (data.skills.length > 10) {
                throw new Error("skill cannot be more than 10")
            }
        }
        if (!isUpdateAllowed) {
            throw new Error("cannot update the feild.")
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        res.send("user data updated successfully...")
    }
    catch (err) {
        res.send(err.message)
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

