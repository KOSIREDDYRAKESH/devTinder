const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")
const { validateSingupData } = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

// create a new user/sinup api
app.post("/singup", async (req, res) => {
    try {
        // validate singup data
        validateSingupData(req)

        const { password, firstName, lastName, emailId } = req.body;
        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        const userObj = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })

        await userObj.save();
        res.send("create user successfully...")
    }
    catch (err) {
        res.send(err.message)
    }
});

//login api
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        console.log(user)
        if (!user) {
            throw new Error("Invalid credentials")
        }
        else if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                res.send("Login successfull...")
            }
            else {
                res.send("Incorrect password ")
            }
        }
    }
    catch (err) {
        res.status(404).send("Error: " + err.message);
    }
})

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

//delete user api
app.delete("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully...")
    }
    catch (err) {
        res.send("user not found")
    }
})

//update user data api
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        if (!userId)
            res.send("userId not valid")

        const allowedUpdates = ["userId", "skills", "photoUrl", "password", "gender", "age", "about"];
        const isUpdateAllowed = Object.keys(data).every(k => allowedUpdates.includes(k))
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

