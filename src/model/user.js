const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 15
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 4,
        maxLength: 20,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address.")
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please Enter a strong password(Abcd@1234).")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("gender data is not valid.")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo url.")
            }
        }
    },
    about: {
        type: String,
        default: "This is a default description about user",
        maxLength: 150
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
});

// generating JWT token
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await JWT.sign({ _id: user._id }, "DEVtinder@5124", { expiresIn: "1d" })
    return token;
}

//validating password with user entered password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);