const express = require("express")

const app = express()
const { adminAuth, userAuth } = require("./middleware/auth");
app.use("/admin", adminAuth)
app.get("/admin", (req, res) => {
    res.send("welcome admin...")
})

app.get("/admin/getAllData", (req, res) => {
    res.send("Data sent !! to admin...")
})

app.get("/admin/deleteUser", (req, res) => {
    res.send("User deleted")
})

app.get("/user", userAuth, (req, res) => {
    res.send("valid user")
})

app.listen(7777, () => {
    console.log("connnected to the server successfully....")
})