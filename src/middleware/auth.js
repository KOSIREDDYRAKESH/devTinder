const JWT = require("jsonwebtoken")
const User = require("../model/user")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token expired.")
        }
        const decodeData = await JWT.verify(token, "DEVtinder@5124");
        const { _id } = decodeData
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("user not found")
        }
        req.user = user;
        next()
    }
    catch (err) {
        res.status(404).send("Error: " + err.message)
    }
}

module.exports = { userAuth }