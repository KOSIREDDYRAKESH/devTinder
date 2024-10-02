const mongoose = require("mongoose");

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
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("gender data is not valid.")
            }
        }

    },
    phtotUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    about: {
        type: String,
        default: "This is a default description about user"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);