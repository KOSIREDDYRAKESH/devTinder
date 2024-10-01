const express = require("express")

const app = express()

app.get("/user", (req, res, next) => {
    try {
        throw new Error("erhgkergh");
        res.send("data sent")

    }
    catch (err) {
        res.send("contact support team")
    }
})
app.get("/", (err, req, res, next) => {
    if (err) {
        res.send("Something went wrong")
    }
})
app.listen(7777, () => {
    console.log("connnected to the server successfully....")
})