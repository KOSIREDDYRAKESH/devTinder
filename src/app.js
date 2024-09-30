const express = require("express")

const app = express()



app.use("/home", (req, res) => {
    res.send("home");
})

app.use("/contact", (req, res) => {
    res.send("contact");
})

app.use("/connect", (req, res) => {
    res.send("connect");
})

app.listen(7777, () => {
    console.log("connnected to the server successfully....")
})