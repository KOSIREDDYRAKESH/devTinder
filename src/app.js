const express = require("express")

const app = express()
//app.use("/route",[rh1,rh2],rh3,rh4,rh5)
app.get("/user", (req, res, next) => {
    console.log("1st Router");
    next()
    //res.send("1st Router!")
}, (req, res, next) => {
    console.log("2nd Router");
    //res.send("2nd Router!")
    next()
}, (req, res, next) => {
    console.log("3rd Router");
    //res.send("3rd Router!")
    next()
}, (req, res, next) => {
    console.log("4th Router");
    //res.send("4th Router!")
    next()
}, (req, res, next) => {
    console.log("5th Router");
    res.send("5th Router!")
})
app.listen(7777, () => {
    console.log("connnected to the server successfully....")
})