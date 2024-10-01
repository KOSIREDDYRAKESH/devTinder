const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")


app.post("/singup", async (req, res) => {
    const userObj = new User(
        {
            firstName: "kosireddy",
            lastName: "Rakesh",
            emailId: "test01@gmail.com",
            password: "test@123"
        })

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

