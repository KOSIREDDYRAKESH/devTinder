const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./model/user")
const { validateSingupData } = require("./utils/validation")
const cookieParser = require("cookie-parser")
const { userAuth } = require("./middleware/auth")


app.use(express.json());
app.use(cookieParser());

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
        if (!user) {
            throw new Error("Invalid credentials")
        }
        else if (user) {
            const isPasswordValid = await user.validatePassword(password)
            console.log(isPasswordValid)
            if (isPasswordValid) {
                const token = await user.getJWT();
                res.cookie("token", token)
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
});

// profile api
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(404).send("Error: Invalid cookie,please login again");
    }
});

// send connection request api 
app.get("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        //sending connection request
        const user = req.user;
        res.send(user.firstName + " sending connection request");
    }
    catch (err) {
        res.send("something went wrong")
    }
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

