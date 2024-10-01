const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")

app.use(express.json())
app.post("/singup", async (req, res) => {
    console.log(req.body)
    const userObj = new User(req.body)

    await userObj.save();
    res.send(userObj)
});

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

