const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")

app.use(express.json());

// create a new user api
app.post("/singup", async (req, res) => {
    const userObj = new User(req.body)

    await userObj.save();
    res.send("create user successfully...")
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

