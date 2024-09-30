const express = require("express")

const app = express()

app.get("/user", (req, res) => {
    res.send({ firstName: "Kosireddy", lastName: "Rakesh" });
})
app.post("/user", (req, res) => {
    res.send("data stored in database");
})
app.patch("/user", (req, res) => {
    res.send("data is modified!");
})
app.delete("/user", (req, res) => {
    res.send("User is deleted!");
})
app.put("/user", (req, res) => {
    res.send("updated data in database!");
})

app.listen(7777, () => {
    console.log("connnected to the server successfully....")
})